// About hero: a holographic planet with a running track in orbit around it, in a 3D starfield.
// Canvas 2D with a hand-rolled perspective projection: light, no dependencies.
export function mountOrbit (canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  let W = 0, H = 0, dpr = 1, raf = 0, visible = true
  let mx = 0, my = 0, tx = 0, ty = 0

  // stars in a cube around the camera
  const small = innerWidth < 768
  const N = small ? 220 : 520
  const stars = Array.from({ length: N }, () => ({ x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2, z: Math.random(), h: Math.random() }))

  const belt = Array.from({ length: small ? 110 : 260 }, () => ({ a: Math.random() * Math.PI * 2, r: 1.0 + Math.random() * 0.25, z: (Math.random() - 0.5) * 0.08, w: 0.05 + Math.random() * 0.06, s: 0.6 + Math.random() * 1.4, h: Math.random() }))
  const comets = Array.from({ length: 3 }, (_, i) => ({ x: 0.1 + Math.random() * 0.5, y: Math.random() * 0.4, dx: 0.35, dy: 0.18, T: 7 + i * 3, o: i * 2.3, h: Math.random() }))
  const resize = () => {
    const r = canvas.getBoundingClientRect()
    W = r.width; H = r.height; dpr = Math.min(devicePixelRatio || 1, W < 768 ? 1.5 : 2)
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr)
  }

  // stadium-shaped lane (two straights + two semicircles), param s in [0,1)
  const lane = (s: number, r: number, L: number) => {
    const per = 2 * L + 2 * Math.PI * r
    let d = s * per
    if (d < L) return [-L / 2 + d, -r]
    d -= L
    if (d < Math.PI * r) { const a = -Math.PI / 2 + d / r; return [L / 2 + Math.cos(a) * r, Math.sin(a) * r] }
    d -= Math.PI * r
    if (d < L) return [L / 2 - d, r]
    d -= L
    const a = Math.PI / 2 + d / r; return [-L / 2 + Math.cos(a) * r, Math.sin(a) * r]
  }

  const draw = (now: number) => {
    const t = reduce ? 4 : now / 1000
    mx += (tx - mx) * 0.05; my += (ty - my) * 0.05
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, W, H)
    const narrow = W < 768
    const cx = W * (narrow ? 0.5 : 0.68) + mx * 18, cy = H * (narrow ? 0.74 : 0.5) + my * 12
    const S = Math.min(W, H) * (narrow ? 0.58 : 0.5)

    // starfield, flying slowly towards the viewer
    for (const st of stars) {
      st.z -= reduce ? 0 : 0.0009; if (st.z <= 0.02) { st.z = 1; st.x = (Math.random() - 0.5) * 2; st.y = (Math.random() - 0.5) * 2 }
      const k = 0.6 / st.z
      const x = W / 2 + (st.x + mx * 0.02) * k * W * 0.5, y = H / 2 + (st.y + my * 0.02) * k * H * 0.5
      if (x < 0 || x > W || y < 0 || y > H) continue
      const a = Math.min(.85, (1 - st.z) * 1.2) * (0.55 + 0.45 * Math.sin(t * 2 + st.h * 40))
      const r = Math.max(0.5, (1 - st.z) * 2.2)
      ctx.fillStyle = `hsla(${(200 + st.h * 160 + t * 20) % 360},85%,${58 + st.h * 10}%,${a})`
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
      if (r > 1.6) { ctx.strokeStyle = `hsla(${(200 + st.h * 160) % 360},90%,65%,${a * 0.5})`; ctx.lineWidth = 0.6
        ctx.beginPath(); ctx.moveTo(x - r * 3, y); ctx.lineTo(x + r * 3, y); ctx.moveTo(x, y - r * 3); ctx.lineTo(x, y + r * 3); ctx.stroke() }
    }

    // projection for the tilted orbit plane
    const sc = Math.min(1, scrollY / (H || 1)); const tilt = 1.12 + my * 0.05 - sc * 0.35, yaw = -0.35 + t * 0.05 + mx * 0.08 + sc * 0.8
    const P = (x: number, y: number, z = 0) => {
      const xr = x * Math.cos(yaw) - y * Math.sin(yaw), yr = x * Math.sin(yaw) + y * Math.cos(yaw)
      const y2 = yr * Math.cos(tilt) - z * Math.sin(tilt), z2 = yr * Math.sin(tilt) + z * Math.cos(tilt)
      const f = 3.2 / (3.2 + z2)
      return [cx + xr * S * f, cy + y2 * S * f, z2]
    }

    const holo = (a: number, alpha: number) => `hsla(${(a * 360 + t * 40) % 360},85%,58%,${alpha})`
    const lanes = 6, R0 = 0.62, L = 0.9

    // back half of the track (behind the planet)
    const drawTrack = (front: boolean) => {
      for (let i = 0; i < lanes; i++) {
        const r = R0 + i * 0.055
        ctx.lineWidth = i === 0 || i === lanes - 1 ? 1.6 : 0.9
        let prev: number[] | null = null
        for (let k = 0; k <= 240; k++) {
          const s = k / 240
          const [x, y] = lane(s, r, L); const p = P(x, y)
          if (prev && (p[2] < 0) === !front && (prev[2] < 0) === !front) {
            ctx.strokeStyle = holo(s + i * 0.04, front ? 0.85 : 0.35)
            ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(p[0], p[1]); ctx.stroke()
          }
          prev = p
        }
      }
    }
    drawTrack(false)

    // holographic planet
    const pr = S * 0.42
    const g = ctx.createRadialGradient(cx - pr * 0.35, cy - pr * 0.4, pr * 0.1, cx, cy, pr)
    g.addColorStop(0, '#ffffff'); g.addColorStop(0.4, '#e0f2fe'); g.addColorStop(0.75, '#c4b5fd'); g.addColorStop(1, '#93c5fd')
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, pr, 0, Math.PI * 2); ctx.fill()
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, pr, 0, Math.PI * 2); ctx.clip()
    const cg = ctx.createConicGradient(t * 0.4, cx + pr * 0.2, cy - pr * 0.2)
    ;['#22d3ee', '#a78bfa', '#f472b6', '#facc15', '#34d399', '#22d3ee'].forEach((c, i, a) => cg.addColorStop(i / (a.length - 1), c))
    ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = 0.9; ctx.fillStyle = cg; ctx.fillRect(cx - pr, cy - pr, pr * 2, pr * 2)
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1
    // latitude bands
    ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 1
    for (let b = -3; b <= 3; b++) { const yy = cy + (b / 4) * pr + Math.sin(t + b) * 2; const w = Math.sqrt(Math.max(0, pr * pr - (yy - cy) ** 2)); ctx.beginPath(); ctx.ellipse(cx, yy, w, w * 0.12, 0, 0, Math.PI * 2); ctx.stroke() }
    ctx.restore()
    // atmosphere glow
    const atm = ctx.createRadialGradient(cx, cy, pr * 0.9, cx, cy, pr * 1.45)
    atm.addColorStop(0, 'rgba(167,139,250,.28)'); atm.addColorStop(1, 'rgba(125,211,252,0)')
    ctx.fillStyle = atm; ctx.beginPath(); ctx.arc(cx, cy, pr * 1.45, 0, Math.PI * 2); ctx.fill()

    drawTrack(true)

    // particle belt: hundreds of iridescent motes orbiting just outside the track
    for (let i = 0; i < belt.length; i++) {
      const b = belt[i]; const a = b.a + t * b.w
      const p = P(Math.cos(a) * b.r * 1.35, Math.sin(a) * b.r, b.z)
      ctx.fillStyle = holo(b.h, 0.55 + 0.4 * Math.sin(t * 3 + i))
      ctx.beginPath(); ctx.arc(p[0], p[1], b.s * (3.2 / (3.2 + p[2])), 0, Math.PI * 2); ctx.fill()
    }
    // comets streaking across now and then
    for (const c of comets) {
      const k = ((t + c.o) % c.T) / c.T; if (k > 0.25) continue
      const q = k / 0.25, x0 = c.x * W, y0 = c.y * H, x1 = x0 + c.dx * W * q, y1 = y0 + c.dy * H * q
      const gr = ctx.createLinearGradient(x1 - c.dx * 120, y1 - c.dy * 120, x1, y1)
      gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(1, holo(c.h, 0.9))
      ctx.strokeStyle = gr; ctx.lineWidth = 2; ctx.lineCap = 'round'
      ctx.beginPath(); ctx.moveTo(x1 - c.dx * 120, y1 - c.dy * 120); ctx.lineTo(x1, y1); ctx.stroke()
    }

    // runners: glowing dots lapping the track with comet trails
    const runners = [{ lane: 1, sp: 0.045, ph: 0 }, { lane: 3, sp: 0.038, ph: 0.4 }, { lane: 4, sp: 0.052, ph: 0.7 }]
    for (const rn of runners) {
      const r = R0 + rn.lane * 0.055
      for (let k = 18; k >= 0; k--) {
        const s = ((t * rn.sp + rn.ph - k * 0.004) % 1 + 1) % 1
        const [x, y] = lane(s, r, L); const p = P(x, y, 0.02)
        const a = (1 - k / 18)
        ctx.fillStyle = k === 0 ? '#1e3a8a' : holo(s, a * 0.85)
        ctx.beginPath(); ctx.arc(p[0], p[1], (k === 0 ? 3.2 : 2.4 * a) * (3.2 / (3.2 + p[2])), 0, Math.PI * 2); ctx.fill()
      }
    }
  }

  const loop = (now: number) => { raf = requestAnimationFrame(loop); draw(now) }
  const start = () => { if (!raf && visible && !document.hidden && !reduce) raf = requestAnimationFrame(loop) }
  const stop = () => { cancelAnimationFrame(raf); raf = 0 }
  resize(); draw(performance.now())
  // let the page settle before the loop starts competing for the main thread
  const go = () => start()
  new ResizeObserver(() => { resize(); draw(performance.now()) }).observe(canvas)
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop() }).observe(canvas)
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()))
  addEventListener('pointermove', (e) => { tx = (e.clientX / innerWidth - 0.5) * 2; ty = (e.clientY / innerHeight - 0.5) * 2 }, { passive: true })
  ;('requestIdleCallback' in window ? (window as any).requestIdleCallback(go, { timeout: 2500 }) : setTimeout(go, 1200))
}
