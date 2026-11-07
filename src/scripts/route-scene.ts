// About page: a 3D terrain with a GPS route drawing itself across it, like a Strava activity in 3D.
// Scroll flies the camera; running shows a tight loop, riding shows a long climbing route.
export function mountRoute (canvas: HTMLCanvasElement, sections: HTMLElement[]) {
  const ctx = canvas.getContext('2d')!
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  let W = 0, H = 0, dpr = 1, raf = 0
  const small = () => W < 768

  // terrain height: a few layered waves = rolling hills
  const h = (x: number, z: number) => 0.32 * Math.sin(x * 1.3 + 0.4) * Math.cos(z * 1.1) + 0.16 * Math.sin(x * 2.7 - z * 1.9) + 0.08 * Math.cos(x * 5.1 + z * 4.3)

  // two routes: running loop and a long ride
  const loop = (s: number) => { const a = s * Math.PI * 2; return [Math.cos(a) * 1.1 + 0.25 * Math.cos(a * 3), Math.sin(a) * 0.7 + 0.15 * Math.sin(a * 2)] }
  const ride = (s: number) => { const x = -1.8 + s * 3.6; return [x, Math.sin(s * 9) * 0.9 * (1 - s * 0.4) + Math.sin(s * 23) * 0.12] }

  const resize = () => {
    const r = canvas.getBoundingClientRect(); W = r.width; H = r.height
    dpr = Math.min(devicePixelRatio || 1, small() ? 1.5 : 2)
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr)
  }
  resize(); addEventListener('resize', resize)

  let mx = 0, my = 0, tmx = 0, tmy = 0, mode = 0, tmode = 0, fly = 0
  addEventListener('pointermove', (e) => { tmx = e.clientX / innerWidth - 0.5; tmy = e.clientY / innerHeight - 0.5 }, { passive: true })
  const which = () => {
    let m = 0
    for (const s of sections) if (s.getBoundingClientRect().top < innerHeight * 0.55) m = Number(s.dataset.route || 0)
    return m
  }

  const draw = (now: number) => {
    const t = reduce ? 6 : now / 1000
    mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05
    tmode = which(); mode += (tmode - mode) * 0.04
    fly += ((scrollY / Math.max(1, document.body.scrollHeight - innerHeight)) - fly) * 0.08
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H)

    const yaw = -0.5 + t * 0.03 + mx * 0.35 + fly * 1.2
    const pitch = 0.62 + my * 0.12 - fly * 0.15
    const cx = W * (small() ? 0.5 : 0.7), cy = H * (small() ? 0.8 : 0.56)
    const S = Math.min(W, H) * (small() ? 0.24 : 0.22) * (1 + fly * 0.15)
    const P = (x: number, z: number, y: number) => {
      const xr = x * Math.cos(yaw) - z * Math.sin(yaw), zr = x * Math.sin(yaw) + z * Math.cos(yaw)
      const y2 = y * Math.cos(pitch) - zr * Math.sin(pitch), z2 = y * Math.sin(pitch) + zr * Math.cos(pitch)
      const f = 4 / (4 + z2)
      return [cx + xr * S * f, cy - y2 * S * f, z2]
    }

    // terrain wireframe
    const R = 2.2, G = small() ? 22 : 34
    ctx.lineWidth = 1
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 0; i <= G; i++) {
        ctx.beginPath()
        for (let j = 0; j <= G; j++) {
          const a = -R + (2 * R * i) / G, b = -R + (2 * R * j) / G
          const [x, z] = pass ? [b, a] : [a, b]
          const p = P(x, z, h(x, z))
          j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])
        }
        const edge = Math.abs(i / G - 0.5) * 2
        ctx.strokeStyle = `rgba(46,62,106,${0.16 * (1 - edge * edge)})`
        ctx.stroke()
      }
    }

    // route: blend between loop and ride, drawn progressively
    const prog = reduce ? 1 : ((t * 0.08) % 1.25)
    const visible = Math.min(1, prog)
    const M = 360
    const pts: number[][] = []
    for (let k = 0; k <= M; k++) {
      const s = k / M
      const a = loop(s), b = ride(s)
      const x = a[0] + (b[0] - a[0]) * mode, z = a[1] + (b[1] - a[1]) * mode
      pts.push(P(x, z, h(x, z) + 0.03))
    }
    const end = Math.floor(visible * M)
    // shadow/glow underlay
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    ctx.strokeStyle = 'rgba(14,165,233,.18)'; ctx.lineWidth = 12
    ctx.beginPath(); for (let k = 0; k <= end; k++) k ? ctx.lineTo(pts[k][0], pts[k][1]) : ctx.moveTo(pts[k][0], pts[k][1]); ctx.stroke()
    // gradient stroke along the route
    for (let k = 1; k <= end; k++) {
      const s = k / M
      const c = s < 0.5 ? mix([37, 99, 235], [14, 165, 233], s * 2) : mix([14, 165, 233], [16, 185, 129], (s - 0.5) * 2)
      ctx.strokeStyle = `rgb(${c})`; ctx.lineWidth = 4
      ctx.beginPath(); ctx.moveTo(pts[k - 1][0], pts[k - 1][1]); ctx.lineTo(pts[k][0], pts[k][1]); ctx.stroke()
    }
    // start pin + athlete dot with pulse
    const st = pts[0]
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 3
    ctx.beginPath(); ctx.arc(st[0], st[1], 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
    const hd = pts[end]
    const pulse = (t * 1.4) % 1
    ctx.fillStyle = `rgba(252,76,2,${0.35 * (1 - pulse)})`; ctx.beginPath(); ctx.arc(hd[0], hd[1], 8 + pulse * 22, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#fc4c02'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 3
    ctx.beginPath(); ctx.arc(hd[0], hd[1], 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
    // vertical drop line under the athlete
    const ground = P(0, 0, 0)
    void ground
  }
  const mix = (a: number[], b: number[], k: number) => a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(',')

  const loopFn = (now: number) => { raf = requestAnimationFrame(loopFn); draw(now) }
  draw(performance.now())
  if (!reduce) {
    const go = () => { raf = requestAnimationFrame(loopFn) }
    ;'requestIdleCallback' in window ? (window as any).requestIdleCallback(go, { timeout: 1500 }) : setTimeout(go, 600)
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0 } else if (!raf && !reduce) raf = requestAnimationFrame(loopFn) })
}
