#!/usr/bin/env node
/**
 * LinkedIn → site data sync. Runs before every build (and daily via GitHub Actions cron).
 *
 * Source priority:
 *   1. Apify (automatic, live):  APIFY_TOKEN (+ optional APIFY_ACTOR, LINKEDIN_URL)
 *      Default actor: linkedintel/linkedin-profile-scraper-no-cookies (no LinkedIn login needed)
 *   2. LinkedIn data export CSV: src/data/linkedin/Positions.csv + Education.csv
 *   3. Keep the last committed src/data/*.json (never break the build)
 *
 * Output: src/data/experience.json, src/data/education.json, src/data/sync-meta.json
 */
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

const DIR = resolve('src/data/linkedin')
const OUT = resolve('src/data')
const LINKEDIN_URL = process.env.LINKEDIN_URL || 'https://www.linkedin.com/in/fadhelijlalfalah/'
const ACTOR = (process.env.APIFY_ACTOR || 'linkedintel/linkedin-profile-scraper-no-cookies').replace('/', '~')

// ───────────────────────── helpers
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
/** Accepts "Nov 2025", "11/2025", "2025-11", "2025-11-01", {year, month}, {year}. Returns "Nov 2025" | "2025" | null */
function fmtDate (d) {
  if (!d) return null
  if (typeof d === 'object') {
    const y = d.year ?? d.y; const m = d.month ?? d.m
    if (!y) return d.text ?? null
    return m ? `${MONTHS[(+m - 1) % 12]} ${y}` : String(y)
  }
  const s = String(d).trim()
  if (!s || /present|now|sekarang/i.test(s)) return null
  let m
  if ((m = s.match(/^(\d{4})-(\d{1,2})/))) return `${MONTHS[+m[2] - 1]} ${m[1]}`
  if ((m = s.match(/^(\d{1,2})\/(\d{4})$/))) return `${MONTHS[+m[1] - 1]} ${m[2]}`
  if ((m = s.match(/([A-Za-z]{3})\w*\.?\s+(\d{4})/))) return `${m[1][0].toUpperCase()}${m[1].slice(1, 3).toLowerCase()} ${m[2]}`
  if ((m = s.match(/^\d{4}$/))) return s
  return s
}
function toKey (d) {
  if (!d) return Infinity
  const m = d.match(/([A-Za-z]{3})\s+(\d{4})/)
  if (m) return +m[2] * 12 + MONTHS.indexOf(m[1])
  const y = d.match(/\d{4}/)
  return y ? +y[0] * 12 : 0
}
function duration (start, end) {
  if (!start) return ''
  const now = new Date()
  const e = end ? toKey(end) : now.getFullYear() * 12 + now.getMonth()
  const months = Math.max(1, e - toKey(start) + 1)
  const y = Math.floor(months / 12); const mo = months % 12
  return [y && `${y} yr${y > 1 ? 's' : ''}`, mo && `${mo} mo${mo > 1 ? 's' : ''}`].filter(Boolean).join(' ')
}
const TYPES = /(Full-time|Part-time|Freelance|Internship|Contract|Self-employed|Seasonal|Apprenticeship)/i
function splitTitle (t = '') {
  const m = t.match(new RegExp(`^(.*?)\\s+[-–·]\\s+${TYPES.source}$`, 'i'))
  return m ? { title: m[1], type: m[2] } : { title: t, type: '' }
}
const bullets = (d = '') => String(d).split(/\n|<br\s*\/?>|•/).map(s => s.replace(/^[-*\s]+/, '').trim()).filter(Boolean)
const pick = (o, ...keys) => { for (const k of keys) { const v = k.split('.').reduce((a, p) => a?.[p], o); if (v != null && v !== '') return v } }

function finalize (positions) {
  positions = positions
    .filter(p => p.company && p.title)
    .map(p => ({ ...p, duration: duration(p.start, p.end) }))
    .sort((a, b) => toKey(b.end) - toKey(a.end) || toKey(b.start) - toKey(a.start))
  const grouped = []
  for (const p of positions) {
    const g = grouped.find(x => x.company === p.company)
    if (g) { g.roles.push(p); g.current ||= !p.end } else grouped.push({ company: p.company, current: !p.end, roles: [p] })
  }
  return grouped
}

// ───────────────────────── source 1: Apify
/** Tolerant normaliser: different actors name fields differently. */
function normaliseApify (items) {
  const profile = items.find(i => pick(i, 'experience', 'experiences', 'positions', 'position')) ?? items[0] ?? {}
  let exps = pick(profile, 'experience', 'experiences', 'positions', 'position') ?? []
  // some actors emit separate records per experience
  if (!exps.length) exps = items.filter(i => /experience/i.test(i.recordType ?? i.type ?? ''))
  const positions = []
  for (const e of exps) {
    const company = pick(e, 'companyName', 'company.name', 'company', 'organisation', 'subtitle')
    // grouped format: one company with several roles
    const subs = pick(e, 'positions', 'roles', 'subComponents')
    const roles = Array.isArray(subs) && subs.length ? subs : [e]
    for (const r of roles) {
      const rawTitle = pick(r, 'title', 'position', 'role') ?? ''
      const { title, type } = splitTitle(rawTitle)
      positions.push({
        company: typeof company === 'string' ? company.split(' · ')[0] : String(company ?? ''),
        title,
        type: pick(r, 'employmentType', 'employment_type') ?? type,
        location: pick(r, 'location', 'locationName') ?? '',
        start: fmtDate(pick(r, 'startDate', 'start', 'starts_at', 'timePeriod.startDate', 'dateRange.start')),
        end: r.isCurrent ? null : fmtDate(pick(r, 'endDate', 'end', 'ends_at', 'timePeriod.endDate', 'dateRange.end')),
        highlights: bullets(pick(r, 'description', 'summary') ?? '')
      })
    }
  }
  const edus = (pick(profile, 'education', 'educations') ?? items.filter(i => /education/i.test(i.recordType ?? i.type ?? '')))
    .map(e => ({
      school: pick(e, 'schoolName', 'school', 'title'),
      degree: [pick(e, 'degree', 'degreeName'), pick(e, 'fieldOfStudy')].filter(Boolean).join(', '),
      start: fmtDate(pick(e, 'startDate', 'start', 'starts_at', 'timePeriod.startDate', 'dateRange.start')),
      end: fmtDate(pick(e, 'endDate', 'end', 'ends_at', 'timePeriod.endDate', 'dateRange.end')),
      notes: pick(e, 'grade', 'notes', 'description') ?? ''
    })).filter(e => e.school)
  return { experience: finalize(positions), education: edus }
}

async function fromApify () {
  const token = process.env.APIFY_TOKEN
  if (!token) return null
  const url = `https://api.apify.com/v2/acts/${ACTOR}/run-sync-get-dataset-items?timeout=240`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(process.env.APIFY_INPUT ? JSON.parse(process.env.APIFY_INPUT) : { profileUrls: [LINKEDIN_URL] })
  })
  if (!res.ok) throw new Error(`Apify ${res.status}: ${(await res.text()).slice(0, 300)}`)
  const items = await res.json()
  if (process.env.LINKEDIN_DEBUG) await writeFile(resolve(DIR, 'apify-raw.json'), JSON.stringify(items, null, 2))
  const data = normaliseApify(Array.isArray(items) ? items : [items])
  if (!data.experience.length) throw new Error('Apify returned no experience entries (set LINKEDIN_DEBUG=1 to inspect apify-raw.json)')
  return data
}

// ───────────────────────── source 2: CSV export
function parseCSV (text) {
  const rows = []; let row = []; let field = ''; let q = false
  text = text.replace(/^﻿/, '')
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++ } else if (c === '"') q = false
      else field += c
    } else if (c === '"') q = true
    else if (c === ',') { row.push(field); field = '' } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field); rows.push(row); row = []; field = ''
    } else field += c
  }
  if (field || row.length) { row.push(field); rows.push(row) }
  const [head, ...body] = rows.filter(r => r.some(Boolean))
  return body.map(r => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? '').trim()])))
}
async function fromCSV () {
  const posFile = resolve(DIR, 'Positions.csv')
  if (!existsSync(posFile)) return null
  const positions = parseCSV(await readFile(posFile, 'utf8')).map(p => ({
    company: p['Company Name'], ...splitTitle(p.Title), location: p.Location || '',
    start: fmtDate(p['Started On']), end: fmtDate(p['Finished On']), highlights: bullets(p.Description)
  }))
  let education = null
  const eduFile = resolve(DIR, 'Education.csv')
  if (existsSync(eduFile)) {
    education = parseCSV(await readFile(eduFile, 'utf8')).map(e => ({
      school: e['School Name'], degree: e['Degree Name'], start: fmtDate(e['Start Date']),
      end: fmtDate(e['End Date']), notes: e.Notes || e.Activities || ''
    }))
  }
  return { experience: finalize(positions), education }
}

// ───────────────────────── main
async function main () {
  let data = null; let source = 'cache'
  try { data = await fromApify(); if (data) source = 'apify' } catch (e) { console.warn('[linkedin] Apify failed →', e.message) }
  if (!data) { data = await fromCSV(); if (data) source = 'csv' }
  if (!data) { console.warn('[linkedin] no source available — keeping existing JSON'); return }

  await writeFile(resolve(OUT, 'experience.json'), JSON.stringify(data.experience, null, 2) + '\n')
  if (data.education?.length) {
    data.education.sort((a, b) => toKey(b.end) - toKey(a.end))
    await writeFile(resolve(OUT, 'education.json'), JSON.stringify(data.education, null, 2) + '\n')
  }
  await writeFile(resolve(OUT, 'sync-meta.json'), JSON.stringify({ source, syncedAt: new Date().toISOString() }, null, 2) + '\n')
  console.log(`[linkedin] source=${source} · ${data.experience.length} companies`)
}
main().catch(e => { console.error(e); process.exit(1) })
