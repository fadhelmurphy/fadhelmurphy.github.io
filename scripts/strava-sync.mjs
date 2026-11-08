#!/usr/bin/env node
/**
 * Strava → src/data/strava.json. Runs before every build and on the GitHub Actions schedule.
 *
 * Needs STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN
 * (token scopes: activity:read_all,profile:read_all).
 * Without them, or if Strava fails, the last committed strava.json is kept so the build never breaks.
 *
 * Only summary numbers and the heart-rate stream are written. No GPS points, so the
 * published page never reveals where runs start.
 */
import { writeFile, appendFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const OUT = resolve('src/data/strava.json')
const { STRAVA_CLIENT_ID: id, STRAVA_CLIENT_SECRET: secret, STRAVA_REFRESH_TOKEN: refresh } = process.env
const API = 'https://www.strava.com/api/v3'

// gear shown on the About page, in this order; km comes from Strava when the id is a Strava shoe
const GEAR = [
  { k: 'Watch', t: 'Garmin Forerunner 165', m: 'Every run' },
  { k: 'Daily miles', t: 'ASICS Superblast 3', id: 'g31691702' },
  { k: 'Tempo', t: 'adidas Adizero Boston 13', id: 'g24848718' },
  { k: 'Trail', t: 'ASICS Novablast 5 TR', id: 'g28116943' },
  { k: 'Road bike', t: 'Camp SR3D', m: 'Ride days' }
]

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const RUNS = new Set(['Run', 'TrailRun', 'VirtualRun'])
const hms = (s) => [Math.floor(s / 3600), Math.floor((s % 3600) / 60), Math.round(s % 60)].map((n, i) => (i ? String(n).padStart(2, '0') : String(n))).join(':')
const pace = (sec, m) => { const p = Math.round(sec / (m / 1000)); return `${Math.floor(p / 60)}:${String(p % 60).padStart(2, '0')}` }
const km = (m) => (m / 1000).toFixed(2)
const day = (iso) => { const [y, mo, d] = iso.slice(0, 10).split('-').map(Number); return { d, mo: mo - 1, y } }

async function token () {
  const r = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ client_id: id, client_secret: secret, grant_type: 'refresh_token', refresh_token: refresh })
  })
  if (!r.ok) throw new Error(`token ${r.status}: ${await r.text()}`)
  const j = await r.json()
  // Strava may rotate the refresh token; hand the new one to the workflow so it can update the secret
  if (j.refresh_token && j.refresh_token !== refresh && process.env.GITHUB_OUTPUT) {
    console.log(`::add-mask::${j.refresh_token}`)
    await appendFile(process.env.GITHUB_OUTPUT, `rotated=${j.refresh_token}\n`)
    console.log('strava: refresh token rotated')
  }
  return j.access_token
}

async function main () {
  if (!id || !secret || !refresh) { console.log('strava: no credentials, keeping committed strava.json'); return }
  const at = await token()
  const get = async (path) => {
    const r = await fetch(API + path, { headers: { authorization: `Bearer ${at}` } })
    if (!r.ok) throw new Error(`${path} ${r.status}`)
    return r.json()
  }

  const since = Math.floor(Date.now() / 1000) - 30 * 86400
  const acts = await get(`/athlete/activities?per_page=100&after=${since}`)
  const runs = acts.filter((a) => RUNS.has(a.sport_type || a.type)).sort((a, b) => b.start_date.localeCompare(a.start_date))
  if (!runs.length) throw new Error('no runs in the last 30 days')

  // the longest run of the last 30 days is the page's headline run
  const best = runs.reduce((a, b) => (b.distance > a.distance ? b : a))
  const detail = await get(`/activities/${best.id}`)
  // heart rate, speed and distance across the run, thinned to ~120 evenly spaced samples
  const st = await get(`/activities/${best.id}/streams?keys=heartrate,velocity_smooth,distance&key_by_type=true`).catch(() => ({}))
  const n = st.distance?.data?.length || 0
  const pick = (arr, f) => Array.from({ length: Math.min(120, n) }, (_, i) => f(arr[Math.floor((i * n) / Math.min(120, n))])).slice(1)
  const stream = n && st.heartrate && st.velocity_smooth
    ? { km: pick(st.distance.data, (m) => Math.round(m / 10) / 100), hr: pick(st.heartrate.data, (x) => x), v: pick(st.velocity_smooth.data, (x) => Math.round(x * 100) / 100) }
    : { km: [], hr: [], v: [] }
  // Garmin-style moving time: count the seconds where speed is above 0.5 m/s (full-resolution streams).
  // Strava's own moving_time equals elapsed for Garmin uploads, so it can't be used.
  let movingSecs = best.moving_time
  try {
    const full = await get(`/activities/${best.id}/streams?keys=time,velocity_smooth&key_by_type=true`)
    const T = full.time?.data || [], V = full.velocity_smooth?.data || []
    let m = 0
    for (let i = 1; i < T.length; i++) if ((V[i] ?? 0) > 0.5) m += T[i] - T[i - 1]
    if (m > 0) movingSecs = m
  } catch {}
  const bd = day(best.start_date_local)

  const gear = await Promise.all(GEAR.map(async (g) => {
    if (!g.id) return { k: g.k, t: g.t, m: g.m }
    try { const s = await get(`/gear/${g.id}`); return { k: g.k, t: g.t, m: `${Math.round(s.distance / 1000)} km` } } catch { return { k: g.k, t: g.t, m: '' } }
  }))

  const data = {
    syncedAt: new Date().toISOString(),
    longRun: {
      date: `${bd.d} ${MONTHS[bd.mo]} ${bd.y}`,
      km: km(best.distance),
      pace: pace(best.elapsed_time, best.distance),
      time: hms(best.elapsed_time),
      secs: best.elapsed_time,
      moving: hms(movingSecs),
      movingSecs,
      movingPace: pace(movingSecs, best.distance),
      avgHr: Math.round(detail.average_heartrate || 0),
      cal: Math.round(detail.calories || 0).toLocaleString('en-US'),
      elev: Math.round(best.total_elevation_gain || 0),
      effort: best.suffer_score ?? null,
      prs: best.pr_count ?? 0
    },
    recent: runs.slice(0, 6).map((a) => {
      const d = day(a.start_date_local)
      return { date: `${d.d} ${MONTHS[d.mo].slice(0, 3)}`, km: km(a.distance), time: hms(a.moving_time), pace: pace(a.moving_time, a.distance) }
    }),
    month: { km: (runs.reduce((s, a) => s + a.distance, 0) / 1000).toFixed(1), runs: runs.length },
    gear,
    stream
  }
  await writeFile(OUT, JSON.stringify(data, null, 2) + '\n')
  console.log(`strava: ${runs.length} runs in 30 days, headline ${data.longRun.km} km on ${data.longRun.date}`)
}

main().catch((e) => { console.warn(`strava: sync failed (${e.message}), keeping committed strava.json`) })
