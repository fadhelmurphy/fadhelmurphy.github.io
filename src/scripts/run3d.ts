// Long-run replay in 3D: the heart-rate trace becomes a curtain you fly along.
// t (0..1) comes from scroll; the camera starts wide, follows the playhead, then pulls back at the finish.
import { Renderer, Camera, Transform, Program, Mesh, Geometry, Vec3 } from 'ogl'

const L = 40, HMAX = 6
const ss = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }

const fog = /* glsl */ `
float fogA(float d){ return 1.0 - smoothstep(60.0, 120.0, d); }`

export function mountRun3D (host: HTMLElement, data: { km: number[]; hr: number[] }, reduce: boolean) {
  if (data.hr.length < 2) return null
  let renderer: Renderer
  try { renderer = new Renderer({ dpr: Math.min(devicePixelRatio, 2), alpha: true, antialias: true, premultipliedAlpha: false }) } catch { return null }
  const gl = renderer.gl
  gl.clearColor(0, 0, 0, 0)
  const canvas = gl.canvas as HTMLCanvasElement
  canvas.className = 'r-gl'
  canvas.setAttribute('aria-hidden', 'true')

  const camera = new Camera(gl, { fov: 38, near: 0.1, far: 200 })
  const scene = new Transform()

  // ── sample + smooth the trace a little, 4 sub-steps between samples ──
  const kmMax = data.km[data.km.length - 1]
  const lo = Math.min(...data.hr) - 6, hi = Math.max(...data.hr) + 4
  const pts: [number, number][] = []
  for (let i = 0; i < data.hr.length; i++) {
    const a = data.hr[Math.max(0, i - 1)], b = data.hr[i], c = data.hr[Math.min(data.hr.length - 1, i + 1)]
    pts.push([(data.km[i] / kmMax) * L, (((a + 2 * b + c) / 4 - lo) / (hi - lo)) * HMAX])
  }
  pts.unshift([0, pts[0][1]])
  const P: [number, number][] = []
  for (let i = 0; i < pts.length - 1; i++) for (let s = 0; s < 4; s++) {
    const u = s / 4; P.push([pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u])
  }
  P.push(pts[pts.length - 1])
  const yAt = (x: number) => { let j = P.findIndex((p) => p[0] >= x); if (j <= 0) return P[Math.max(0, j)][1]; const a = P[j - 1], b = P[j]; return a[1] + (b[1] - a[1]) * ((x - a[0]) / Math.max(1e-6, b[0] - a[0])) }

  const uT = { value: 0 }

  // ── curtain (area under the curve) ──
  {
    const pos: number[] = [], top: number[] = [], idx: number[] = []
    P.forEach(([x, y], i) => { pos.push(x, 0, 0, x, y, 0); top.push(0, 1); if (i) { const k = i * 2; idx.push(k - 2, k - 1, k, k - 1, k + 1, k) } })
    const geometry = new Geometry(gl, { position: { size: 3, data: new Float32Array(pos) }, aTop: { size: 1, data: new Float32Array(top) }, index: { data: new Uint16Array(idx) } })
    const program = new Program(gl, {
      vertex: `attribute vec3 position; attribute float aTop; uniform mat4 modelViewMatrix, projectionMatrix; varying float vTop, vX, vD;
        void main(){ vTop = aTop; vX = position.x; vec4 mv = modelViewMatrix * vec4(position, 1.0); vD = -mv.z; gl_Position = projectionMatrix * mv; }`,
      fragment: `precision highp float; uniform float uT; varying float vTop, vX, vD; ${fog}
        void main(){ float past = step(vX, uT * ${L.toFixed(1)});
          vec3 c = mix(vec3(.08), vec3(.988,.298,.008), past);
          float a = mix(.14, .62, past) * pow(vTop, 1.6);
          gl_FragColor = vec4(c, a * fogA(vD)); }`,
      uniforms: { uT }, transparent: true, depthTest: false, cullFace: false
    })
    new Mesh(gl, { geometry, program }).setParent(scene)
  }

  // ── the trace itself: a thin strip standing on the curve ──
  {
    const pos: number[] = [], idx: number[] = []
    P.forEach(([x, y], i) => { pos.push(x, y - 0.035, 0, x, y + 0.035, 0); if (i) { const k = i * 2; idx.push(k - 2, k - 1, k, k - 1, k + 1, k) } })
    const geometry = new Geometry(gl, { position: { size: 3, data: new Float32Array(pos) }, index: { data: new Uint16Array(idx) } })
    const program = new Program(gl, {
      vertex: `attribute vec3 position; uniform mat4 modelViewMatrix, projectionMatrix; varying float vX, vD;
        void main(){ vX = position.x; vec4 mv = modelViewMatrix * vec4(position, 1.0); vD = -mv.z; gl_Position = projectionMatrix * mv; }`,
      fragment: `precision highp float; uniform float uT; varying float vX, vD; ${fog}
        void main(){ float past = step(vX, uT * ${L.toFixed(1)});
          gl_FragColor = vec4(mix(vec3(.25), vec3(.988,.298,.008), past), mix(.45, 1., past) * fogA(vD)); }`,
      uniforms: { uT }, transparent: true, depthTest: false, cullFace: false
    })
    new Mesh(gl, { geometry, program }).setParent(scene)
  }

  // ── floor: lanes along the run, a line every km, a darker line every 10 km ──
  {
    const pos: number[] = [], al: number[] = []
    for (let z = -6; z <= 6; z += 2) { pos.push(-2, 0, z, L + 2, 0, z); al.push(.16, .16) }
    for (let k = 0; k <= Math.floor(kmMax); k++) { const x = (k / kmMax) * L, a = k % 10 === 0 ? .4 : .12; pos.push(x, 0, -6, x, 0, 6); al.push(a, a) }
    const geometry = new Geometry(gl, { position: { size: 3, data: new Float32Array(pos) }, aA: { size: 1, data: new Float32Array(al) } })
    const program = new Program(gl, {
      vertex: `attribute vec3 position; attribute float aA; uniform mat4 modelViewMatrix, projectionMatrix; varying float vA, vD;
        void main(){ vA = aA; vec4 mv = modelViewMatrix * vec4(position, 1.0); vD = -mv.z; gl_Position = projectionMatrix * mv; }`,
      fragment: `precision highp float; varying float vA, vD; ${fog} void main(){ gl_FragColor = vec4(vec3(.08), vA * fogA(vD)); }`,
      transparent: true, depthTest: false
    })
    new Mesh(gl, { geometry, program, mode: gl.LINES }).setParent(scene)
  }

  // ── playhead: a vertical bar and a glowing point at the current heart rate ──
  const head = new Transform(); head.setParent(scene)
  {
    const geometry = new Geometry(gl, { position: { size: 3, data: new Float32Array([0, 0, 0, 0, HMAX + 1.2, 0]) } })
    const program = new Program(gl, { vertex: `attribute vec3 position; uniform mat4 modelViewMatrix, projectionMatrix; void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragment: `precision highp float; void main(){ gl_FragColor = vec4(vec3(.08), .8); }`, transparent: true, depthTest: false })
    new Mesh(gl, { geometry, program, mode: gl.LINES }).setParent(head)
  }
  const dot = new Transform(); dot.setParent(scene)
  {
    const geometry = new Geometry(gl, { position: { size: 3, data: new Float32Array([0, 0, 0]) } })
    const program = new Program(gl, {
      vertex: `attribute vec3 position; uniform mat4 modelViewMatrix, projectionMatrix; uniform float uPx; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = uPx * 260.0 / -mv.z; }`,
      fragment: `precision highp float; void main(){ vec2 c = gl_PointCoord - .5; float d = length(c); float core = smoothstep(.22, .18, d); float glow = smoothstep(.5, .1, d) * .35;
        gl_FragColor = vec4(mix(vec3(.988,.298,.008), vec3(1.), core * .0), max(core, glow)); }`,
      uniforms: { uPx: { value: renderer.dpr } }, transparent: true, depthTest: false
    })
    new Mesh(gl, { geometry, program, mode: gl.POINTS }).setParent(dot)
  }

  // ── camera path ──
  const cur = { pos: new Vec3(L / 2, 16, 34), tgt: new Vec3(L / 2, 2, 0) }
  const want = (t: number) => {
    const x = t * L
    const k = ss(0, 0.08, t) * (1 - ss(0.92, 1, t))
    const ov = { p: [L / 2, 10 * (aspect < 1 ? 1.6 : 1), 27 * (aspect < 1 ? 1.9 : 1)], g: [L / 2, 2, 0] }
    const f = aspect < 1 ? 1.8 : 1   // narrow screens: pull the camera back so more of the run is visible
    const fo = { p: [x - 8 * f, 4.6 + (f - 1) * 2, 10.5 * f], g: [x + 5, 2.6, 0] }
    const mix = (a: number[], b: number[]) => new Vec3(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k)
    return { pos: mix(ov.p, fo.p), tgt: mix(ov.g, fo.g) }
  }

  let aspect = 1
  const size = () => { const w = host.clientWidth, h = host.clientHeight; aspect = w / Math.max(1, h); renderer.setSize(w, h); camera.perspective({ aspect }) }
  size(); addEventListener('resize', size)
  host.appendChild(canvas)
  host.classList.add('gl-on')

  let t = 0, raf = 0, idle = 0
  const frame = () => {
    raf = 0
    const w = want(t), d = reduce ? 1 : 0.09
    cur.pos.lerp(w.pos, d); cur.tgt.lerp(w.tgt, d)
    camera.position.copy(cur.pos); camera.lookAt(cur.tgt)
    const x = t * L, y = yAt(x)
    head.position.set(x, 0, 0); dot.position.set(x, y, 0)
    uT.value = t
    renderer.render({ scene, camera })
    // keep easing until the camera settles
    if (cur.pos.distance(w.pos) > 0.01 && ++idle < 400) raf = requestAnimationFrame(frame)
    else idle = 0
  }
  const kick = () => { idle = 0; if (!raf) raf = requestAnimationFrame(frame) }
  kick()

  return { set (v: number) { t = Math.min(1, Math.max(0, v)); kick() } }
}
