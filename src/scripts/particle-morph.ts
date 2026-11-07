// About page: one cloud of 3D particles that morphs between shapes as you scroll
// (galaxy → running track → bicycle → sphere → ring). All morphing happens on the GPU.
import { Renderer, Camera, Geometry, Program, Mesh, Transform } from 'ogl'

const TAU = Math.PI * 2
const rnd = (a = 1) => (Math.random() - 0.5) * a

type Shape = (i: number, n: number) => [number, number, number]

const galaxy: Shape = (i) => {
  const arm = i % 3, t = Math.pow(Math.random(), 0.6), a = t * 7 + arm * TAU / 3
  const r = 0.15 + t * 1.6
  return [Math.cos(a) * r + rnd(0.18 * (1 - t * 0.5)), rnd(0.08), Math.sin(a) * r + rnd(0.18 * (1 - t * 0.5))]
}
const track: Shape = (i) => {      // 6-lane stadium track, seen in perspective
  const lane = i % 6, r = 0.55 + lane * 0.09, L = 1.1
  const per = 2 * L + TAU * r / 1
  let d = Math.random() * per, x = 0, z = 0
  if (d < L) { x = -L / 2 + d; z = -r } else if ((d -= L) < Math.PI * r) { const a = -Math.PI / 2 + d / r; x = L / 2 + Math.cos(a) * r; z = Math.sin(a) * r }
  else if ((d -= Math.PI * r) < L) { x = L / 2 - d; z = r } else { d -= L; const a = Math.PI / 2 + d / r; x = -L / 2 + Math.cos(a) * r; z = Math.sin(a) * r }
  return [x * 1.1, rnd(0.015), z * 1.1]
}
const bike: Shape = (i) => {       // two wheels + diamond frame + bars, standing upright
  const k = i % 10
  const wheel = (cx: number) => { const a = Math.random() * TAU, r = k < 3 ? 0.62 : Math.random() * 0.62
    return k < 3 ? [cx + Math.cos(a) * r, Math.sin(a) * r, rnd(0.04)] : [cx + Math.cos(a) * r * (Math.random() < 0.85 ? 1 : 0.1), Math.sin(a) * r, rnd(0.01)] }
  if (k < 4) return wheel(-0.95) as any
  if (k < 8) return wheel(0.95) as any
  const seg = [[-0.95, 0, -0.2, 0], [-0.2, 0, 0.6, 0.55], [-0.2, 0, -0.35, 0.62], [-0.35, 0.62, 0.6, 0.55], [-0.95, 0, -0.35, 0.62], [0.6, 0.55, 0.95, 0], [0.6, 0.55, 0.55, 0.8], [0.45, 0.82, 0.7, 0.8], [-0.45, 0.7, -0.22, 0.7]]
  const s = seg[(Math.random() * seg.length) | 0], t = Math.random()
  return [s[0] + (s[2] - s[0]) * t + rnd(0.02), s[1] + (s[3] - s[1]) * t + rnd(0.02) - 0.05, rnd(0.04)]
}
const sphere: Shape = () => {
  const u = Math.random() * 2 - 1, a = Math.random() * TAU, r = 1.05 * Math.cbrt(0.85 + Math.random() * 0.15)
  return [Math.sqrt(1 - u * u) * Math.cos(a) * r, u * r, Math.sqrt(1 - u * u) * Math.sin(a) * r]
}
const ring: Shape = () => {        // watch-like torus with a dial
  const a = Math.random() * TAU, b = Math.random() * TAU
  if (Math.random() < 0.25) { const r = Math.random() * 0.8; return [Math.cos(a) * r, Math.sin(a) * r, rnd(0.02)] }
  return [(1 + 0.18 * Math.cos(b)) * Math.cos(a), (1 + 0.18 * Math.cos(b)) * Math.sin(a), 0.18 * Math.sin(b)]
}

const vert = /* glsl */`
attribute vec3 p0; attribute vec3 p1; attribute vec3 p2; attribute vec3 p3; attribute vec3 p4; attribute float seed;
uniform float uMorph; uniform float uTime; uniform float uSize; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix;
varying float vSeed; varying float vDepth;
vec3 at(float k){ return k < .5 ? p0 : k < 1.5 ? p1 : k < 2.5 ? p2 : k < 3.5 ? p3 : p4; }
void main(){
  float k = clamp(uMorph, 0., 4.); float f = fract(k); float i = floor(k);
  // stagger each particle so the morph ripples instead of snapping
  float e = smoothstep(0., 1., clamp(f * 1.6 - seed * .6, 0., 1.));
  vec3 a = at(i), b = at(min(i + 1., 4.));
  vec3 pos = mix(a, b, e);
  // swirl outward in the middle of a transition
  float mid = sin(e * 3.14159);
  pos += normalize(pos + .001) * mid * .35 * (seed - .3);
  pos.y += sin(uTime * .8 + seed * 30.) * .012;
  vec4 mv = modelViewMatrix * vec4(pos, 1.);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (.6 + seed) / -mv.z;
  vSeed = seed; vDepth = -mv.z;
}`
const frag = /* glsl */`
precision highp float; varying float vSeed; varying float vDepth; uniform float uTime; uniform float uAlpha;
void main(){
  vec2 c = gl_PointCoord - .5; float d = length(c); if (d > .5) discard;
  // brand blue → cyan → green, slowly cycling per particle
  float t = fract(vSeed + uTime * .03);
  vec3 blue = vec3(.145,.388,.922), cyan = vec3(.055,.647,.914), green = vec3(.063,.725,.506);
  vec3 col = t < .5 ? mix(blue, cyan, t * 2.) : mix(cyan, green, (t - .5) * 2.);
  float a = smoothstep(.5, .1, d) * clamp(1.6 - vDepth * .18, .35, 1.);
  a *= uAlpha; gl_FragColor = vec4(col * a, a);
}`

export function mountMorph (canvas: HTMLCanvasElement, sections: HTMLElement[]) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const small = innerWidth < 768
  const renderer = new Renderer({ canvas, alpha: true, dpr: Math.min(devicePixelRatio, small ? 1.5 : 2), premultipliedAlpha: true, antialias: false })
  const gl = renderer.gl; gl.clearColor(0, 0, 0, 0)
  const camera = new Camera(gl, { fov: 40 }); camera.position.set(0, 0, 5.2)
  const scene = new Transform()
  const N = small ? 7000 : 16000
  const shapes = [galaxy, track, bike, sphere, ring]
  const attrs: Record<string, { size: number; data: Float32Array }> = {}
  shapes.forEach((fn, s) => { const d = new Float32Array(N * 3); for (let i = 0; i < N; i++) d.set(fn(i, N), i * 3); attrs['p' + s] = { size: 3, data: d } })
  const seed = new Float32Array(N); for (let i = 0; i < N; i++) seed[i] = Math.random()
  const geometry = new Geometry(gl, { position: attrs.p0, ...attrs, seed: { size: 1, data: seed } })
  const uniforms = { uMorph: { value: 0 }, uTime: { value: 0 }, uSize: { value: small ? 14 : 18 }, uAlpha: { value: small ? 0.55 : 1 } }
  const program = new Program(gl, { vertex: vert, fragment: frag, uniforms, transparent: true, depthTest: false })
  const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program }); mesh.setParent(scene)
  if (small) mesh.scale.set(0.72)

  const resize = () => { renderer.setSize(innerWidth, innerHeight); camera.perspective({ aspect: innerWidth / innerHeight }) }
  resize(); addEventListener('resize', resize)

  // which shape each section asks for, and where the cloud sits (left/right) so text stays readable
  const target = sections.map((s) => ({ el: s, k: Number(s.dataset.shape || 0), x: Number(s.dataset.x || 0) }))
  let morph = 0, x = 0, mx = 0, my = 0, tmx = 0, tmy = 0
  addEventListener('pointermove', (e) => { tmx = e.clientX / innerWidth - 0.5; tmy = e.clientY / innerHeight - 0.5 }, { passive: true })
  const goal = () => {
    // interpolate between the two sections around the middle of the viewport
    const mid = innerHeight / 2; let k = 0, gx = 0
    for (let i = 0; i < target.length; i++) {
      const r = target[i].el.getBoundingClientRect()
      if (r.top <= mid) { k = target[i].k; gx = target[i].x
        const nx = target[i + 1]; if (nx) { const p = Math.min(1, Math.max(0, (mid - r.bottom + innerHeight * 0.35) / (innerHeight * 0.7)))
          k += (nx.k - k) * p; gx += (nx.x - gx) * p } }
    }
    return [k, gx]
  }
  let raf = 0, last = performance.now()
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame)
    const dt = Math.min(0.05, (now - last) / 1000); last = now
    const [k, gx] = goal()
    morph += (k - morph) * (1 - Math.exp(-dt * 4)); x += (gx - x) * (1 - Math.exp(-dt * 4))
    mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05
    uniforms.uMorph.value = morph; uniforms.uTime.value = now / 1000
    mesh.position.x = x * (small ? 0 : 2.5)
    mesh.position.y = small ? -1.1 : 0
    // galaxy and track lie flat and tilt towards you; bike/ring face the camera
    const flat = Math.max(0, 1 - Math.abs(morph - 0.5) * 1.3)
    mesh.rotation.x = 0.35 + flat * 0.45 + my * 0.3
    mesh.rotation.y = (reduce ? 0 : now / 1000 * 0.12) * (morph > 1.6 && morph < 2.4 ? 0.15 : 1) + mx * 0.5
    renderer.render({ scene, camera })
  }
  if (reduce) { const [k, gx] = goal(); morph = k; x = gx; frame(performance.now()); cancelAnimationFrame(raf) } else raf = requestAnimationFrame(frame)
  document.addEventListener('visibilitychange', () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0 } else if (!raf && !reduce) raf = requestAnimationFrame(frame) })
}
