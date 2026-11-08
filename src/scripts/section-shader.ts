// Full-bleed shader backgrounds for About sections (OGL, one triangle per section).
// Each canvas renders only while its section is on screen; reduced motion gets one still frame.
import { Renderer, Program, Mesh, Triangle } from 'ogl'

const vert = /* glsl */ `attribute vec2 uv; attribute vec2 position; varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }`

const common = /* glsl */ `
precision highp float;
uniform float uTime, uScroll; uniform vec2 uRes, uMouse; varying vec2 vUv;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y); }
float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ v += a * noise(p); p = p * 2.02 + 17.0; a *= 0.5; } return v; }
`

// Topographic contour lines on the page's light grey; one contour lights up orange as you scroll.
export const contours = common + /* glsl */ `
void main(){
  vec2 p = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0) * 1.4;
  p += uMouse * 0.06;
  float e = fbm(p * 0.7 + vec2(uTime * 0.015, -uTime * 0.01)) + 0.18 * noise(p * 2.0 - uTime * 0.02);
  float h = e * 22.0;
  float f = fract(h), d = min(f, 1.0 - f);
  float idx = floor(h + 0.5);
  float major = 1.0 - step(0.5, mod(idx, 5.0));
  float w = mix(0.05, 0.085, major);
  float line = 1.0 - smoothstep(0.0, w, d);
  vec3 bg = vec3(0.937, 0.933, 0.918);
  vec3 ink = vec3(0.08);
  float target = floor(mix(6.0, 16.0, uScroll) + 0.5);
  float hot = 1.0 - smoothstep(0.0, 0.6, abs(idx - target));
  vec3 col = mix(bg, ink, line * mix(0.10, 0.22, major));
  col = mix(col, vec3(0.988, 0.298, 0.008), line * hot * 0.9);
  col += (hash(vUv * uRes + fract(uTime)) - 0.5) * 0.02;
  gl_FragColor = vec4(col, 1.0);
}`

// Molten Strava-orange flow for the closing section.
export const heat = common + /* glsl */ `
void main(){
  vec2 p = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0) * 1.6;
  vec2 q = vec2(fbm(p + uTime * 0.05), fbm(p + vec2(5.2, 1.3) - uTime * 0.04));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + uTime * 0.06), fbm(p + 3.0 * q + vec2(8.3, 2.8)));
  float v = fbm(p + 3.5 * r + uMouse * 0.4);
  vec3 a = vec3(0.86, 0.22, 0.0), b = vec3(0.988, 0.298, 0.008), c = vec3(1.0, 0.55, 0.24), d = vec3(1.0, 0.82, 0.68);
  vec3 col = mix(a, b, smoothstep(0.2, 0.5, v));
  col = mix(col, c, smoothstep(0.5, 0.72, v));
  col = mix(col, d, smoothstep(0.72, 0.95, v) * 0.7);
  col *= 0.92 + 0.12 * (1.0 - length(vUv - 0.5));
  col += (hash(vUv * uRes + fract(uTime)) - 0.5) * 0.045;
  gl_FragColor = vec4(col, 1.0);
}`

export function mountShader (host: HTMLElement, fragment: string, reduce: boolean) {
  let renderer: Renderer
  try { renderer = new Renderer({ dpr: Math.min(devicePixelRatio, 1.25), alpha: false, antialias: false }) } catch { return null }
  const gl = renderer.gl
  const canvas = gl.canvas as HTMLCanvasElement
  canvas.className = 'sec-gl'
  canvas.setAttribute('aria-hidden', 'true')
  const uniforms = { uTime: { value: 0 }, uScroll: { value: 0 }, uRes: { value: [1, 1] }, uMouse: { value: [0, 0] } }
  let program: Program
  try { program = new Program(gl, { vertex: vert, fragment, uniforms }) } catch { return null }
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })
  host.prepend(canvas)
  host.classList.add('has-gl')

  const size = () => { const w = host.clientWidth, h = host.clientHeight; renderer.setSize(w, h); uniforms.uRes.value = [w * renderer.dpr, h * renderer.dpr] }
  size(); addEventListener('resize', size)

  const mouse = [0, 0], m = [0, 0]
  let visible = false, raf = 0
  const draw = () => renderer.render({ scene: mesh })
  const loop = (t: number) => {
    raf = 0
    const r = host.getBoundingClientRect()
    uniforms.uScroll.value = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)))
    m[0] += (mouse[0] - m[0]) * 0.05; m[1] += (mouse[1] - m[1]) * 0.05
    uniforms.uMouse.value = m
    uniforms.uTime.value = t / 1000
    draw()
    if (visible) raf = requestAnimationFrame(loop)
  }
  if (reduce) { uniforms.uTime.value = 12; uniforms.uScroll.value = 0.5; draw(); return {} }
  addEventListener('pointermove', (e) => { mouse[0] = e.clientX / innerWidth - 0.5; mouse[1] = 0.5 - e.clientY / innerHeight }, { passive: true })
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(loop) }, { rootMargin: '100px' }).observe(host)
  return {}
}
