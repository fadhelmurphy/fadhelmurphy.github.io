// About hero: the runner photo rendered in WebGL with a live motion blur.
// The face and upper body stay sharp at rest; the blur streaks harder with scroll speed and the cursor.
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl'

const frag = /* glsl */ `
precision highp float;
uniform sampler2D tMap;
uniform vec2 uRes, uImg, uMouse;
uniform float uTime, uVel, uP;
varying vec2 vUv;

float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

// object-fit: cover, object-position: 50% 30%
vec2 cover(vec2 s){
  float ra = uRes.x / uRes.y, ia = uImg.x / uImg.y;
  vec2 sc = ra > ia ? vec2(1.0, ia / ra) : vec2(ra / ia, 1.0);
  vec2 off = (1.0 - sc) * vec2(0.5, 0.3);
  return s * sc + off;
}

void main(){
  vec2 s = vec2(vUv.x, 1.0 - vUv.y);           // screen, y down
  s += uMouse * 0.012;                          // slight parallax
  vec2 uv = cover(s);

  // sharp zones in image space: face, then a softer upper body
  float face = 1.0 - smoothstep(0.55, 1.0, length((uv - vec2(0.45, 0.33)) / vec2(0.11, 0.075)));
  float body = 1.0 - smoothstep(0.35, 1.0, length((uv - vec2(0.47, 0.47)) / vec2(0.24, 0.17)));
  float sharp = max(face, body * 0.55) * clamp(1.0 - uP * 1.3, 0.0, 1.0);

  // directional motion blur, trailing to the right, with a slow drift so it never sits still
  float amt = mix(0.055, 0.0, sharp) + uVel * 0.06 + (1.0 - sharp) * 0.008 * sin(uTime * 0.7 + s.y * 6.0);
  vec3 acc = vec3(0.0); float wsum = 0.0;
  for (int i = 0; i < 18; i++){
    float f = float(i) / 17.0;
    float w = exp(-f * 2.2);
    vec2 o = vec2((f - 0.25) * amt, 0.0);
    float ca = uVel * 0.006;
    acc.r += texture2D(tMap, uv + o + vec2(ca, 0.0)).r * w;
    acc.g += texture2D(tMap, uv + o).g * w;
    acc.b += texture2D(tMap, uv + o - vec2(ca, 0.0)).b * w;
    wsum += w;
  }
  vec3 col = acc / wsum;

  // horizontal speed streaks that brighten with velocity
  float streak = smoothstep(0.985, 1.0, hash(vec2(floor(s.y * 220.0), floor(uTime * 8.0))));
  col += streak * uVel * 0.25 * (1.0 - sharp);

  col += (hash(s * uRes + uTime) - 0.5) * 0.035;   // film grain
  gl_FragColor = vec4(col, 1.0);
}`

const vert = /* glsl */ `
attribute vec2 uv; attribute vec2 position; varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }`

export function mountHeroGL (host: HTMLElement, src: string, reduce: boolean) {
  let renderer: Renderer
  try { renderer = new Renderer({ dpr: Math.min(devicePixelRatio, 1.5), alpha: false, antialias: false }) } catch { return null }
  const gl = renderer.gl
  const canvas = gl.canvas as HTMLCanvasElement
  canvas.className = 'h-gl'
  canvas.setAttribute('aria-hidden', 'true')

  const texture = new Texture(gl, { generateMipmaps: false, minFilter: gl.LINEAR, flipY: false, wrapS: gl.CLAMP_TO_EDGE, wrapT: gl.CLAMP_TO_EDGE })
  const uniforms = {
    tMap: { value: texture }, uRes: { value: [1, 1] }, uImg: { value: [1, 1] }, uMouse: { value: [0, 0] },
    uTime: { value: 0 }, uVel: { value: 0 }, uP: { value: 0 }
  }
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program: new Program(gl, { vertex: vert, fragment: frag, uniforms }) })

  const size = () => { const w = host.clientWidth, h = host.clientHeight; renderer.setSize(w, h); uniforms.uRes.value = [w, h] }
  size(); addEventListener('resize', size)

  let ready = false, visible = true, raf = 0, last = scrollY, vel = 0
  const mouse = [0, 0], m = [0, 0]
  const draw = () => renderer.render({ scene: mesh })
  const loop = (t: number) => {
    raf = 0
    const dy = Math.abs(scrollY - last); last = scrollY
    vel += (Math.min(1, dy / 60) - vel) * 0.12
    m[0] += (mouse[0] - m[0]) * 0.06; m[1] += (mouse[1] - m[1]) * 0.06
    uniforms.uVel.value = vel; uniforms.uMouse.value = m; uniforms.uTime.value = t / 1000
    draw()
    if (visible && !reduce) raf = requestAnimationFrame(loop)
  }
  const start = () => { if (!raf && ready) raf = requestAnimationFrame(loop) }

  const img = new Image()
  img.decoding = 'async'
  img.onload = () => {
    texture.image = img
    uniforms.uImg.value = [img.naturalWidth, img.naturalHeight]
    ready = true
    host.appendChild(canvas)
    requestAnimationFrame(() => { canvas.classList.add('on'); host.classList.add('gl-on') })
    reduce ? draw() : start()
  }
  img.src = src

  if (!reduce) {
    addEventListener('pointermove', (e) => { mouse[0] = e.clientX / innerWidth - 0.5; mouse[1] = e.clientY / innerHeight - 0.5 }, { passive: true })
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start() }).observe(host)
  }

  return {
    progress (p: number) { uniforms.uP.value = p; if (reduce && ready) draw() }
  }
}
