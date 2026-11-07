// About page: 12k particles that form a beating heart, a running shoe and a road bike in 3D,
// morphing from one to the next as you scroll. Shapes are pre-sampled into /shapes.bin.
import { Renderer, Camera, Geometry, Program, Mesh, Transform } from 'ogl'

const vert = /* glsl */`
attribute vec3 p0; attribute vec3 p1; attribute vec3 p2; attribute float seed;
uniform float uMorph; uniform float uTime; uniform float uSize; uniform float uBeat;
uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix;
varying float vSeed; varying float vShape; varying float vDepth;
void main(){
  float k = clamp(uMorph, 0., 2.);
  float i = floor(min(k, 1.999)); float f = k - i;
  // each particle leaves a little later than the last, so shapes dissolve and re-form
  float e = smoothstep(0., 1., clamp(f * 1.7 - seed * .7, 0., 1.));
  vec3 a = i < .5 ? p0 : p1; vec3 b = i < .5 ? p1 : p2;
  vec3 pos = mix(a, b, e);
  float mid = sin(e * 3.14159);
  pos += normalize(pos + vec3(.001)) * mid * (.6 + seed * .8);           // burst outwards mid-morph
  pos += vec3(sin(uTime * .9 + seed * 40.), cos(uTime * .7 + seed * 23.), sin(uTime * .8 + seed * 17.)) * .012;
  float heart = 1. - clamp(k, 0., 1.);
  pos *= 1. + uBeat * heart * .07;                                       // heartbeat only while it is a heart
  vec4 mv = modelViewMatrix * vec4(pos, 1.);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (.55 + seed * .9) / -mv.z;
  vSeed = seed; vShape = k; vDepth = -mv.z;
}`
const frag = /* glsl */`
precision highp float; varying float vSeed; varying float vShape; varying float vDepth;
void main(){
  vec2 c = gl_PointCoord - .5; float d = length(c); if (d > .5) discard;
  vec3 heartA = vec3(.937,.267,.267), heartB = vec3(.957,.447,.714);  // red → pink
  vec3 shoeA = vec3(.145,.388,.922),  shoeB = vec3(.055,.647,.914);   // blue → sky
  vec3 bikeA = vec3(.055,.647,.914),  bikeB = vec3(.063,.725,.506);   // sky → green
  vec3 h = mix(heartA, heartB, vSeed), s = mix(shoeA, shoeB, vSeed), b = mix(bikeA, bikeB, vSeed);
  vec3 col = vShape < 1. ? mix(h, s, smoothstep(0., 1., vShape)) : mix(s, b, smoothstep(1., 2., vShape));
  float a = smoothstep(.5, .15, d) * clamp(1.5 - (vDepth - 4.) * .35, .45, 1.);
  gl_FragColor = vec4(col * a, a);
}`

export async function mountSport (canvas: HTMLCanvasElement, sections: HTMLElement[]) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const small = innerWidth < 768
  const N = 12000
  const raw = new Int16Array(await (await fetch('/shapes.bin')).arrayBuffer())
  const use = small ? 7000 : N
  const shape = (s: number) => { const d = new Float32Array(use * 3); for (let i = 0; i < use * 3; i++) d[i] = raw[s * N * 3 + i] / 8000; return { size: 3, data: d } }
  const seed = new Float32Array(use); for (let i = 0; i < use; i++) seed[i] = Math.random()

  const renderer = new Renderer({ canvas, alpha: true, dpr: Math.min(devicePixelRatio, small ? 1.5 : 2), premultipliedAlpha: true })
  const gl = renderer.gl; gl.clearColor(0, 0, 0, 0)
  const camera = new Camera(gl, { fov: 35 }); camera.position.set(0, 0, 6)
  const scene = new Transform()
  const p0 = shape(0)
  const geometry = new Geometry(gl, { position: p0, p0, p1: shape(1), p2: shape(2), seed: { size: 1, data: seed } })
  const uniforms = { uMorph: { value: 0 }, uTime: { value: 0 }, uSize: { value: small ? 22 : 30 }, uBeat: { value: 0 } }
  const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program: new Program(gl, { vertex: vert, fragment: frag, uniforms, transparent: true, depthTest: false }) })
  mesh.setParent(scene)
  if (small) mesh.scale.set(0.55)

  const resize = () => { renderer.setSize(innerWidth, innerHeight); camera.perspective({ aspect: innerWidth / innerHeight }) }
  resize(); addEventListener('resize', resize)

  const targets = sections.map((el) => ({ el, k: Number(el.dataset.shape || 0), x: Number(el.dataset.x || 0) }))
  const goal = () => {
    const mid = innerHeight * 0.5; let k = 0, x = 0
    for (let i = 0; i < targets.length; i++) {
      const r = targets[i].el.getBoundingClientRect()
      if (r.top > mid) break
      k = targets[i].k; x = targets[i].x
      const nx = targets[i + 1]
      if (nx) { const p = Math.min(1, Math.max(0, (mid - (r.bottom - innerHeight * 0.4)) / (innerHeight * 0.8))); k += (nx.k - k) * p; x += (nx.x - x) * p }
    }
    return [k, x]
  }

  let morph = 0, px = 0, mx = 0, my = 0, tmx = 0, tmy = 0, spin = 0, last = performance.now(), raf = 0
  addEventListener('pointermove', (e) => { tmx = e.clientX / innerWidth - 0.5; tmy = e.clientY / innerHeight - 0.5 }, { passive: true })
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame)
    const dt = Math.min(0.05, (now - last) / 1000); last = now; const t = now / 1000
    const [k, x] = goal()
    morph += (k - morph) * (1 - Math.exp(-dt * 3)); px += (x - px) * (1 - Math.exp(-dt * 3))
    mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06
    // lub-dub: two quick pulses per beat
    const b = (t * 1.15) % 1
    uniforms.uBeat.value = Math.exp(-Math.pow((b - 0.08) * 22, 2)) + 0.6 * Math.exp(-Math.pow((b - 0.28) * 22, 2))
    uniforms.uMorph.value = morph; uniforms.uTime.value = t
    spin += dt * (reduce ? 0 : 0.35)
    mesh.position.x = small ? 0 : px * 2.3
    mesh.position.y = small ? -1.15 : 0
    mesh.rotation.y = Math.sin(spin) * 0.55 + mx * 0.8 + (morph > 0.5 ? 0.35 : 0)
    mesh.rotation.x = 0.12 + my * 0.4
    renderer.render({ scene, camera })
  }
  if (reduce) { const [k, x] = goal(); morph = k; px = x; frame(performance.now()); cancelAnimationFrame(raf) } else raf = requestAnimationFrame(frame)
  document.addEventListener('visibilitychange', () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0 } else if (!raf && !reduce) raf = requestAnimationFrame(frame) })
}
