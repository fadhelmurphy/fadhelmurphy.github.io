// About page scroll story. One pinned stage, everything driven by scroll progress:
//  0.00–0.22  heart (particles, beating)
//  0.22–0.42  morph → running shoe
//  0.42–0.60  morph → road bike
//  0.60–0.70  particles dissolve, a 3D terrain fades in, radar pings the start
//  0.70–0.95  a Strava-style route draws itself as you scroll, camera tilts into 3D
//  0.95–1.00  activity complete: confetti
import { Renderer, Camera, Geometry, Program, Mesh, Transform } from 'ogl'

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a))
const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const vert = /* glsl */`
attribute vec3 p0; attribute vec3 p1; attribute vec3 p2; attribute float seed;
uniform float uMorph; uniform float uTime; uniform float uSize; uniform float uBeat; uniform float uFade;
uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix;
varying float vSeed; varying float vShape; varying float vDepth; varying float vGrad;
void main(){
  float k = clamp(uMorph, 0., 2.);
  float i = floor(min(k, 1.999)); float f = k - i;
  float e = smoothstep(0., 1., clamp(f * 1.7 - seed * .7, 0., 1.));
  vec3 a = i < .5 ? p0 : p1; vec3 b = i < .5 ? p1 : p2;
  vec3 pos = mix(a, b, e);
  pos += normalize(pos + vec3(.001)) * sin(e * 3.14159) * (.6 + seed * .8);
  pos += normalize(pos + vec3(.001)) * uFade * (1.5 + seed * 3.);          // scatter away when the map takes over
  pos += vec3(sin(uTime * .9 + seed * 40.), cos(uTime * .7 + seed * 23.), sin(uTime * .8 + seed * 17.)) * .012;
  pos *= 1. + uBeat * (1. - clamp(k, 0., 1.)) * .07;
  // living surface: layered waves push particles along their direction from the centre
  vec3 n = normalize(pos + vec3(.001));
  float w = sin(pos.x * 3.1 + uTime * 1.3) * sin(pos.y * 2.7 - uTime * 1.1) * sin(pos.z * 3.4 + uTime * .9);
  pos += n * w * .09 * (1. - uFade);
  vGrad = clamp(pos.y * .38 + .5, 0., 1.);
  vec4 mv = modelViewMatrix * vec4(pos, 1.);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (.45 + seed * .7) / -mv.z;
  vSeed = seed; vShape = k; vDepth = -mv.z;
}`
const frag = /* glsl */`
precision highp float; varying float vSeed; varying float vShape; varying float vDepth; varying float vGrad; uniform float uFade;
void main(){
  vec2 c = gl_PointCoord - .5; float d = length(c); if (d > .5) discard;
  // aurora gradient: indigo at the bottom → cyan → green at the top
  vec3 indigo = vec3(.31,.27,.98), cyan = vec3(.13,.83,.93), green = vec3(.29,.87,.5);
  vec3 col = vGrad < .5 ? mix(indigo, cyan, vGrad * 2.) : mix(cyan, green, (vGrad - .5) * 2.);
  col = mix(col, vec3(1.), .12 * vSeed);
  float a = smoothstep(.5, 0., d) * .85 * clamp(1.6 - (vDepth - 4.) * .3, .35, 1.) * (1. - uFade);
  gl_FragColor = vec4(col * a, a);
}`

export async function mountStory (stage: HTMLElement, gl3d: HTMLCanvasElement, map: HTMLCanvasElement) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const small = () => innerWidth < 768
  const track = stage.parentElement!          // the tall section the stage is pinned inside
  const progress = () => { const r = track.getBoundingClientRect(); return clamp(-r.top / Math.max(1, r.height - innerHeight)) }

  // ---- particles ----
  const N = 12000, rep = innerWidth < 768 ? 2 : 3, base = innerWidth < 768 ? 9000 : N, use = base * rep
  const raw = new Int16Array(await (await fetch('/shapes.bin')).arrayBuffer())
  const jit = new Float32Array(use * 3); for (let i = 0; i < use * 3; i++) jit[i] = i < base * 3 ? 0 : (Math.random() - 0.5) * 0.035
  const shape = (s: number) => { const d = new Float32Array(use * 3); for (let i = 0; i < use * 3; i++) d[i] = raw[s * N * 3 + (i % (base * 3))] / 8000 + jit[i]; return { size: 3, data: d } }
  const seed = new Float32Array(use); for (let i = 0; i < use; i++) seed[i] = Math.random()
  const renderer = new Renderer({ canvas: gl3d, alpha: true, dpr: Math.min(devicePixelRatio, small() ? 1.5 : 2), premultipliedAlpha: true })
  const gl = renderer.gl; gl.clearColor(0, 0, 0, 0)
  const camera = new Camera(gl, { fov: 35 }); camera.position.set(0, 0, 6)
  const scene = new Transform()
  const p0 = shape(0)
  const geometry = new Geometry(gl, { position: p0, p0, p1: shape(1), p2: shape(2), seed: { size: 1, data: seed } })
  const u = { uMorph: { value: 0 }, uTime: { value: 0 }, uSize: { value: small() ? 16 : 20 }, uBeat: { value: 0 }, uFade: { value: 0 } }
  const program = new Program(gl, { vertex: vert, fragment: frag, uniforms: u, transparent: true, depthTest: false })
  program.setBlendFunc(gl.ONE, gl.ONE)            // additive: overlapping particles glow
  const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program })
  mesh.setParent(scene)

  // ---- 2D map ----
  const ctx = map.getContext('2d')!
  let W = 0, H = 0, dpr = 1
  const resize = () => {
    renderer.setSize(innerWidth, innerHeight); camera.perspective({ aspect: innerWidth / innerHeight })
    W = innerWidth; H = innerHeight; dpr = Math.min(devicePixelRatio || 1, small() ? 1.5 : 2)
    map.width = Math.round(W * dpr); map.height = Math.round(H * dpr)
  }
  resize(); addEventListener('resize', resize)
  const hgt = (x: number, z: number) => 0.32 * Math.sin(x * 1.3 + 0.4) * Math.cos(z * 1.1) + 0.16 * Math.sin(x * 2.7 - z * 1.9) + 0.08 * Math.cos(x * 5.1 + z * 4.3)
  const route = (s: number) => { const x = -1.7 + s * 3.4; return [x, Math.sin(s * 8) * 0.75 * (1 - s * 0.35) + Math.sin(s * 21) * 0.1] }
  const stars = Array.from({ length: 220 }, () => ({ x: Math.random(), y: Math.random(), z: 0.2 + Math.random(), s: Math.random() < 0.85 ? 1 : 2, a: 0.15 + Math.random() * 0.5, r: Math.random() }))
  const confetti = Array.from({ length: 90 }, () => ({ x: Math.random(), v: 0.4 + Math.random() * 0.8, r: Math.random() * 6, c: ['#4f46e5', '#22d3ee', '#4ade80', '#fc4c02', '#a5f3fc'][(Math.random() * 5) | 0], w: 4 + Math.random() * 5 }))

  const drawMap = (p: number, t: number) => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H)
    // dust / stars, drifting with scroll
    for (const st of stars) {
      const y = ((st.y - p * st.z * 0.6) % 1 + 1) % 1
      ctx.fillStyle = `rgba(200,230,255,${st.a * (0.6 + 0.4 * Math.sin(t * 1.5 + st.r * 9))})`
      ctx.fillRect(st.x * W, y * H, st.s, st.s)
    }
    const show = ease(range(p, 0.58, 0.68)); if (show <= 0) return
    ctx.globalAlpha = show
    const tilt = ease(range(p, 0.68, 0.9))
    const pitch = 1.45 - tilt * 0.85                 // straight down → leaning 3D view
    const yaw = -0.2 + tilt * 0.6
    const cx = W / 2, cy = H * (small() ? 0.58 : 0.56)
    const S = Math.min(W, H) * (small() ? 0.27 : 0.34) * (1 + tilt * 0.2)
    const P = (x: number, z: number, y: number) => {
      const xr = x * Math.cos(yaw) - z * Math.sin(yaw), zr = x * Math.sin(yaw) + z * Math.cos(yaw)
      const y2 = y * Math.cos(pitch) - zr * Math.sin(pitch), z2 = y * Math.sin(pitch) + zr * Math.cos(pitch)
      const f = 4 / (4 + z2); return [cx + xr * S * f, cy - y2 * S * f]
    }
    // terrain wireframe
    const R = 2.2, G = small() ? 24 : 36
    ctx.lineWidth = 1
    for (let pass = 0; pass < 2; pass++) for (let i = 0; i <= G; i++) {
      ctx.beginPath()
      for (let j = 0; j <= G; j++) { const a = -R + 2 * R * i / G, b = -R + 2 * R * j / G; const [x, z] = pass ? [b, a] : [a, b]; const q = P(x, z, hgt(x, z) * tilt); j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]) }
      const e = Math.abs(i / G - 0.5) * 2; ctx.strokeStyle = `rgba(103,232,249,${0.16 * (1 - e * e)})`; ctx.stroke()
    }
    // radar ping at the start until the route begins
    const start = route(0), sp = P(start[0], start[1], hgt(start[0], start[1]) * tilt)
    const findT = range(p, 0.62, 0.72)
    if (findT > 0 && findT < 1) for (let k = 0; k < 2; k++) {
      const q = ((t * 0.8 + k * 0.5) % 1)
      ctx.fillStyle = `rgba(34,211,238,${0.16 * (1 - q) * (1 - findT)})`; ctx.beginPath(); ctx.arc(sp[0], sp[1], 10 + q * Math.min(W, H) * 0.22, 0, Math.PI * 2); ctx.fill()
    }
    // the route, drawn up to the scroll position
    const drawn = ease(range(p, 0.72, 0.95))
    const M = 300, end = Math.floor(drawn * M), pts: number[][] = []
    for (let k = 0; k <= end; k++) { const s = k / M, [x, z] = route(s); pts.push(P(x, z, hgt(x, z) * tilt + 0.03)) }
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    if (pts.length > 1) {
      const g = ctx.createLinearGradient(pts[0][0], 0, pts[pts.length - 1][0] + 1, 0); g.addColorStop(0, '#4f46e5'); g.addColorStop(0.5, '#22d3ee'); g.addColorStop(1, '#4ade80')
      ctx.strokeStyle = 'rgba(34,211,238,.18)'; ctx.lineWidth = 16; ctx.beginPath(); pts.forEach((q, k) => k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke()
      ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = 14; ctx.strokeStyle = g; ctx.lineWidth = 4; ctx.beginPath(); pts.forEach((q, k) => k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); ctx.shadowBlur = 0
    }
    // start pin
    ctx.fillStyle = '#05070d'; ctx.strokeStyle = '#a5f3fc'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(sp[0], sp[1], 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
    // athlete
    const hd = pts[pts.length - 1] || sp
    ctx.fillStyle = '#fc4c02'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(hd[0], hd[1], 9, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
    // finish confetti
    const done = range(p, 0.95, 1)
    if (done > 0) for (const c of confetti) {
      const y = -20 + ((done * 1.4 * c.v + c.x * 0.3) % 1.2) * (H + 40), x = c.x * W + Math.sin(t * 2 + c.r) * 20
      ctx.save(); ctx.translate(x, y); ctx.rotate(t * 3 + c.r); ctx.fillStyle = c.c; ctx.globalAlpha = show * Math.min(1, done * 4); ctx.fillRect(-c.w / 2, -2, c.w, 4); ctx.restore()
    }
    ctx.globalAlpha = 1
  }

  // ---- stage copy: each block fades in for its slice of the story ----
  const blocks = [...stage.querySelectorAll<HTMLElement>('[data-from]')].map((el) => ({ el, a: Number(el.dataset.from), b: Number(el.dataset.to) }))
  const bar = stage.querySelector<HTMLElement>('[data-bar]')

  let mx = 0, my = 0, tmx = 0, tmy = 0, raf = 0, sp = 0
  addEventListener('pointermove', (e) => { tmx = e.clientX / innerWidth - 0.5; tmy = e.clientY / innerHeight - 0.5 }, { passive: true })
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame)
    const t = now / 1000
    sp += (progress() - sp) * 0.12
    const p = reduce ? progress() : sp
    mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06
    // particles
    const morph = ease(range(p, 0.2, 0.36)) + ease(range(p, 0.4, 0.54))
    const fade = ease(range(p, 0.58, 0.68))
    const side = small() ? 0 : (p < 0.2 ? 0.55 : p < 0.4 ? 0.5 : 0.62)
    const bt = (t * 1.15) % 1
    u.uBeat.value = Math.exp(-Math.pow((bt - 0.08) * 22, 2)) + 0.6 * Math.exp(-Math.pow((bt - 0.28) * 22, 2))
    u.uMorph.value = morph; u.uTime.value = t; u.uFade.value = fade
    mesh.position.x = side * 2.3; mesh.position.y = small() ? -1.05 : 0
    mesh.scale.set(small() ? 0.55 : 1)
    mesh.rotation.y = p * 7 + mx * 0.8                 // the object turns as you scroll
    mesh.rotation.x = 0.12 + my * 0.4
    if (fade < 1) renderer.render({ scene, camera }); else gl.clear(gl.COLOR_BUFFER_BIT)
    drawMap(p, t)
    for (const b of blocks) {
      const o = Math.min(range(p, b.a, b.a + 0.04), 1 - range(p, b.b - 0.04, b.b))
      b.el.style.opacity = String(o); b.el.style.transform = `translateY(${(1 - o) * 24}px)`; b.el.style.pointerEvents = o > 0.5 ? 'auto' : 'none'
    }
    if (bar) bar.style.transform = `scaleX(${p})`
  }
  raf = requestAnimationFrame(frame)
  document.addEventListener('visibilitychange', () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0 } else if (!raf) raf = requestAnimationFrame(frame) })
}
