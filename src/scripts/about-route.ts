// Long-run flyover in the spirit of Strava's 3D activity replay.
// The route is generated (seeded), NOT real GPS, so nothing on the page points at where the run started.
// Scroll drives a 0..1 progress: the orange line draws itself across a stylised map while the camera
// follows the runner dot, tilting from straight-down to a low oblique view and slowly orbiting,
// then pulls back to show the whole route at the end.
import { Renderer, Camera, Transform, Program, Mesh, Geometry, Plane } from 'ogl'

const rng = (s: number) => () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }

// a road-like random walk: straight stretches, mostly right-angle turns, the odd out-and-back,
// pulled back toward the centre when it wanders too far
function makeRoute (seed = 11) {
  const r = rng(seed)
  const pts: [number, number][] = [[0, 0]]
  let x = 0, z = 0, h = r() * Math.PI * 2, target = h
  const N = 900, step = 0.075, R = 6.2
  let until = 0
  for (let i = 1; i < N; i++) {
    if (i >= until) {
      const d = Math.hypot(x, z)
      if (d > R) target = Math.atan2(-z, -x) + (r() - 0.5) * 0.6
      else {
        const pick = r()
        target = h + (pick < 0.06 ? Math.PI : (pick < 0.53 ? 1 : -1) * (0.35 + r() * 1.25))
      }
      until = i + 25 + Math.floor(r() * 70)
    }
    h += (target - h) * 0.12
    x += Math.cos(h) * step; z += Math.sin(h) * step
    pts.push([x, z])
  }
  // centre it
  const cx = pts.reduce((a, p) => a + p[0], 0) / N, cz = pts.reduce((a, p) => a + p[1], 0) / N
  return pts.map(([a, b]) => [a - cx, b - cz] as [number, number])
}

export function mountRoute (host: HTMLElement, reduce: boolean) {
  const small = matchMedia('(max-width: 760px), (pointer: coarse)').matches
  let renderer: Renderer
  try { renderer = new Renderer({ dpr: Math.min(devicePixelRatio, small ? 1.5 : 2), alpha: true, antialias: true }) } catch { return null }
  const gl = renderer.gl
  if (!gl) return null
  gl.clearColor(0, 0, 0, 0)
  const canvas = gl.canvas as HTMLCanvasElement
  canvas.className = 'route-gl'
  canvas.setAttribute('aria-hidden', 'true')
  host.prepend(canvas)

  const camera = new Camera(gl, { fov: 38, near: 0.05, far: 120 })
  const scene = new Transform()
  const fog = { uNear: { value: 12 }, uFar: { value: 40 } }

  // ── stylised map: fields, built-up blocks and winding roads from layered noise ──
  {
    const program = new Program(gl, {
      vertex: `attribute vec3 position; uniform mat4 modelMatrix, modelViewMatrix, projectionMatrix; varying vec2 vP; varying float vD;
        void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vP = w.xz; vec4 mv = modelViewMatrix * vec4(position, 1.0); vD = -mv.z; gl_Position = projectionMatrix * mv; }`,
      fragment: `precision highp float; varying vec2 vP; varying float vD; uniform float uNear, uFar;
        float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float n(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(h(i), h(i + vec2(1, 0)), u.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), u.x), u.y); }
        float fbm(vec2 p){ float a = .5, s = 0.0; for (int i = 0; i < 5; i++){ s += a * n(p); p *= 2.03; a *= .5; } return s; }
        void main(){
          vec2 p = vP;
          float land = fbm(p * .32);                       // green vs built-up
          float town = smoothstep(.46, .58, land);
          vec3 green = mix(vec3(.21, .27, .18), vec3(.33, .37, .25), fbm(p * 3.1));
          float blocks = step(.5, h(floor(p * 18.0))) * .45 + n(p * 46.0) * .55;   // rooftops speckle
          vec3 urban = mix(vec3(.42, .40, .36), vec3(.56, .53, .48), blocks);
          vec3 c = mix(green, urban, town);
          // winding roads: thin contour lines of a warped noise field, plus a sparse straight grid in town
          float f = fbm(p * .9 + fbm(p * .5) * 1.2);
          float aa = .004 + vD * .0009;
          float road = 1.0 - smoothstep(.0025, .0025 + aa, abs(fract(f * 7.0) - .5) / 7.0);
          vec2 g = abs(fract(p * 2.2) - .5);
          float grid = (1.0 - smoothstep(.02, .02 + aa * 6.0, min(g.x, g.y))) * town * .6;
          c = mix(c, vec3(.74, .72, .67), clamp(road * .5 + grid * .3, 0.0, 1.0));
          // water patches
          float water = smoothstep(.74, .75, fbm(p * .07 + 7.3));
          c = mix(c, vec3(.18, .24, .30), water);
          float fogF = smoothstep(uNear, uFar, vD);
          gl_FragColor = vec4(c * .92, 1.0 - fogF);
        }`,
      uniforms: { ...fog },
      transparent: true, depthWrite: false
    })
    const ground = new Mesh(gl, { geometry: new Plane(gl, { width: 90, height: 90 }), program, frustumCulled: false })
    ground.rotation.x = -Math.PI / 2
    ground.renderOrder = 0
    ground.setParent(scene)
  }

  // ── the route as a flat-topped tube; aT (0..1 along the route) lets the shader reveal it ──
  const route = makeRoute()
  const N = route.length
  const cum = [0]
  for (let i = 1; i < N; i++) cum.push(cum[i - 1] + Math.hypot(route[i][0] - route[i - 1][0], route[i][1] - route[i - 1][1]))
  const total = cum[N - 1]
  const at = (t: number) => {   // position along the route at fraction t
    const d = Math.min(1, Math.max(0, t)) * total
    let i = cum.findIndex((c) => c >= d); if (i <= 0) i = 1
    const u = (d - cum[i - 1]) / Math.max(1e-6, cum[i] - cum[i - 1])
    return [route[i - 1][0] + (route[i][0] - route[i - 1][0]) * u, route[i - 1][1] + (route[i][1] - route[i - 1][1]) * u] as [number, number]
  }
  const prog = { value: 0 }
  {
    const W = 0.1, Y = 0.02, pos: number[] = [], tt: number[] = [], idx: number[] = []
    for (let i = 0; i < N; i++) {
      const a = route[Math.max(0, i - 1)], b = route[Math.min(N - 1, i + 1)]
      let dx = b[0] - a[0], dz = b[1] - a[1]; const l = Math.hypot(dx, dz) || 1; dx /= l; dz /= l
      const nx = -dz * W, nz = dx * W, [x, z] = route[i], t = cum[i] / total
      pos.push(x + nx, Y, z + nz, x - nx, Y, z - nz); tt.push(t, t)
      if (i) { const k = i * 2; idx.push(k - 2, k - 1, k, k - 1, k + 1, k) }
    }
    const geometry = new Geometry(gl, { position: { size: 3, data: new Float32Array(pos) }, aT: { size: 1, data: new Float32Array(tt) }, index: { data: new Uint16Array(idx) } })
    const program = new Program(gl, {
      vertex: `attribute vec3 position; attribute float aT; uniform mat4 modelViewMatrix, projectionMatrix; varying float vT;
        void main(){ vT = aT; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragment: `precision highp float; varying float vT; uniform float uProg;
        void main(){ if (vT > uProg) discard; gl_FragColor = vec4(.99, .30, .01, 1.0); }`,
      uniforms: { uProg: prog },
      cullFace: false, depthTest: false, depthWrite: false, transparent: true
    })
    const m = new Mesh(gl, { geometry, program, frustumCulled: false }); m.renderOrder = 2; m.setParent(scene)
  }

  // ── runner dot: white with an orange ring, always on top ──
  const headPos = new Float32Array(3)
  const headGeo = new Geometry(gl, { position: { size: 3, data: headPos } })
  const head = new Mesh(gl, {
    geometry: headGeo, mode: gl.POINTS, frustumCulled: false,
    program: new Program(gl, {
      vertex: `attribute vec3 position; uniform mat4 modelViewMatrix, projectionMatrix; uniform float uPx; void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = uPx; }`,
      fragment: `precision highp float; void main(){ float d = length(gl_PointCoord - .5); if (d > .5) discard;
        vec3 c = d < .3 ? vec3(1.0) : vec3(.99, .30, .01); float a = 1.0 - smoothstep(.45, .5, d); gl_FragColor = vec4(c, a); }`,
      uniforms: { uPx: { value: 18 * renderer.dpr } }, transparent: true, depthTest: false
    })
  })
  head.renderOrder = 3; head.setParent(scene)

  // ── camera ──
  const cam = { tx: 0, tz: 0, ready: false }
  let p = 0, vis = true, raf = 0
  const size = () => { const r = host.getBoundingClientRect(); renderer.setSize(r.width, r.height); camera.perspective({ aspect: r.width / Math.max(1, r.height) }) }
  function draw () {
    const [hx, hz] = at(p)
    headPos[0] = hx; headPos[1] = 0.03; headPos[2] = hz
    headGeo.attributes.position.needsUpdate = true
    prog.value = p

    // overview at the very end: target the centre and back off
    const end = Math.max(0, Math.min(1, (p - 0.9) / 0.1)), e = end * end * (3 - 2 * end)
    const tx = hx * (1 - e), tz = hz * (1 - e)
    if (!cam.ready || reduce) { cam.tx = tx; cam.tz = tz; cam.ready = true } else { cam.tx += (tx - cam.tx) * 0.12; cam.tz += (tz - cam.tz) * 0.12 }
    const tilt = Math.min(1, p / 0.18)                                // straight down → oblique in the first stretch
    const pitch = (84 - 60 * (tilt * tilt * (3 - 2 * tilt))) * Math.PI / 180 + e * 0.55
    const dist = (small ? 11 : 9) + 2 * (1 - tilt) + e * (small ? 22 : 15)
    const yaw = -0.6 + p * 2.2
    fog.uNear.value = dist * 1.1; fog.uFar.value = dist * 3.6
    camera.position.set(cam.tx + Math.cos(yaw) * Math.cos(pitch) * dist, Math.sin(pitch) * dist, cam.tz + Math.sin(yaw) * Math.cos(pitch) * dist)
    camera.lookAt([cam.tx, 0, cam.tz])
    renderer.render({ scene, camera })
    // keep easing the camera after scrolling stops
    if (!reduce && Math.hypot(tx - cam.tx, tz - cam.tz) > 0.002) kick()
  }
  const kick = () => { if (!raf && vis) raf = requestAnimationFrame(() => { raf = 0; draw() }) }

  size(); addEventListener('resize', () => { size(); kick() })
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis) kick() }).observe(host)
  draw()
  requestAnimationFrame(() => canvas.classList.add('on'))
  return { set (t: number) { p = Math.min(1, Math.max(0, t)); kick() } }
}
