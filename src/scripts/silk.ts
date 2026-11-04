// Abstract silk ribbon (WebGL / OGL), modelled on a long twisting sheet made of fine threads:
//   pass 1 — the sheet body, shaded from its surface normal (folds read as 3D)
//   pass 2 — ~100 fine threads running along the sheet, giving the woven line texture
// The ribbon is defined in pixel space, rotated per breakpoint (horizontal on desktop, diagonal on phones),
// and both tips fade out with progressively softer edges (blur feel).
import { Renderer, Program, Mesh, Geometry, Transform, Triangle, RenderTarget } from 'ogl'

const SURFACE = /* glsl */`
uniform float uTime; uniform vec2 uRes;
uniform float uAngle; uniform vec2 uCenter; uniform float uLen; uniform float uH; uniform float uAmp; uniform float uPhase;
vec3 S(float u, float v){
  // ribbon space: x along the length, y across, z depth (pixels)
  float t = uTime;
  float along = (u - 0.5) * uLen;
  // reference shape: one wide ribbon, a dip on the left and a big rising crest on the right
  float wave = sin(u * 6.6 - 1.9 + t * 0.28 + uPhase * 0.2);
  float bend = uAmp * (wave + 0.25 * sin(u * 13.0 + t * 0.4));
  // narrow curled left tip, full body, right tip spreading out
  float h = uH * (0.25 + 0.75 * smoothstep(0.0, 0.35, u)) * (0.85 + 0.35 * smoothstep(0.55, 1.0, u)) * (0.9 + 0.1 * sin(u * 9.0 + t * 0.5));
  // slight roll so the sheet shows its fold; it leans with the slope of the wave
  float th = 0.55 * cos(u * 6.6 - 1.9 + t * 0.28) + 0.25 * sin(u * 3.0 + t * 0.2) - 0.5 * (1.0 - smoothstep(0.0, 0.2, u));
  float sp = 1.0 - smoothstep(0.0, 0.32, u) * smoothstep(1.0, 0.68, u);           // 0 in the body → 1 at the tips
  float hv = fract(sin(v * 91.7 + 3.1) * 43758.5);                               // per-thread random
  float s = (v - 0.5) * h * (1.0 + 1.8 * sp * sp);
  s += sp * sp * h * (hv - 0.5) * 1.4 * (0.6 + 0.4 * sin(t * 0.6 + hv * 6.28));
  // loose fabric: the edges flutter, the body has soft lengthwise folds
  float ripple = h * (0.10 * sin(u * 16.0 + v * 2.2 + t * 0.8) + 0.05 * sin(u * 31.0 - v * 4.0 + t * 1.1)) * (0.3 + abs(v - 0.5) * 1.8);
  float fold = 0.22 * h * sin(v * 6.2 + u * 4.0 + t * 0.5);
  vec3 r = vec3(along, bend + cos(th) * s + ripple, sin(th) * s + fold);
  // rotate onto the screen
  float c = cos(uAngle), sn = sin(uAngle);
  return vec3(uCenter.x + r.x * c - r.y * sn, uCenter.y + r.x * sn + r.y * c, r.z);
}
vec4 toClip(vec3 p){ return vec4(p.x / uRes.x * 2.0 - 1.0, 1.0 - p.y / uRes.y * 2.0, 0.0, 1.0); }
`

const PALETTE = /* glsl */`
// live-site tones: #a5f3fc cyan → #60a5fa blue → #3b82f6 → #6366f1 indigo, teal accent #14b8a6
vec3 pal(float x){
  // richer blue → green journey: royal blue, azure, sky, cyan, teal, emerald, mint
  vec3 c0 = vec3(0.15, 0.39, 0.92), c1 = vec3(0.23, 0.55, 0.97), c2 = vec3(0.22, 0.74, 0.97),
       c3 = vec3(0.13, 0.83, 0.93), c4 = vec3(0.08, 0.72, 0.65), c5 = vec3(0.06, 0.73, 0.51), c6 = vec3(0.43, 0.91, 0.62);
  vec3 col = mix(c0, c1, smoothstep(0.0, 0.16, x));
  col = mix(col, c2, smoothstep(0.16, 0.33, x));
  col = mix(col, c3, smoothstep(0.33, 0.5, x));
  col = mix(col, c4, smoothstep(0.5, 0.66, x));
  col = mix(col, c5, smoothstep(0.66, 0.83, x));
  return mix(col, c6, smoothstep(0.83, 1.0, x));
}
uniform float uLen; uniform float uH;
vec2 grainCell(vec2 uv){   // ~2px cells on the surface, compensating for the tip spread
  float sp = 1.0 - smoothstep(0.0, 0.32, uv.x) * smoothstep(1.0, 0.68, uv.x);
  return floor(vec2(uv.x * uLen, uv.y * uH * (1.0 + 1.8 * sp * sp)) / 2.0);
}
float tipFade(float u){ return smoothstep(0.0, 0.36, u) * smoothstep(1.0, 0.64, u); }
float threadFade(float u){ return smoothstep(0.0, 0.1, u) * smoothstep(1.0, 0.9, u); }
`

const bodyVert = /* glsl */`
attribute vec2 uv;
${SURFACE}
varying vec3 vN; varying vec2 vUv;
void main(){
  vec3 p = S(uv.x, uv.y);
  vec3 a = S(uv.x + 0.0015, uv.y) - p; vec3 b = S(uv.x, uv.y + 0.01) - p;
  vN = normalize(cross(a, b)); vUv = uv;
  gl_Position = toClip(p);
}`
const bodyFrag = /* glsl */`
precision highp float;
${PALETTE}
varying vec3 vN; varying vec2 vUv;
void main(){
  vec3 n = normalize(vN); if (n.z < 0.0) n = -n;
  vec3 L = normalize(vec3(-0.4, -0.6, 1.0));
  float diff = max(dot(n, L), 0.0);
  float spec = pow(max(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0), 36.0);
  float rim = pow(1.0 - abs(n.z), 3.0);
  vec3 c = pal(clamp(vUv.x + 0.22 * (vUv.y - 0.5) + 0.06 * sin(vUv.x * 9.0 + vUv.y * 4.0), 0.0, 1.0));
  
  vec3 col = c * (1.0 + 0.08 * diff) + vec3(1.0) * spec * 0.45 + vec3(1.0) * rim * 0.4;
  float tip = tipFade(vUv.x);
  float grain = fract(sin(dot(floor(gl_FragCoord.xy / 1.25), vec2(12.9898, 78.233))) * 43758.5453);
  float soft = mix(0.04, 0.5, 1.0 - tip);
  float edge = smoothstep(0.0, soft, vUv.y) * smoothstep(1.0, 1.0 - soft, vUv.y);
  float a = tip * edge * 0.97;
  if (a < 0.01) discard;
  gl_FragColor = vec4(col * a, a);
}`

const lineVert = /* glsl */`
attribute vec2 uv;
${SURFACE}
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = toClip(S(uv.x, uv.y)); }`
const lineFrag = /* glsl */`
precision highp float;
${PALETTE}
varying vec2 vUv;
void main(){
  float k = fract(sin(vUv.y * 431.7) * 43758.5);                       // per-thread variation
  vec3 c = mix(pal(vUv.x), vec3(1.0), k > 0.5 ? 0.85 : 0.35);    // light & dark threads
  float g2 = fract(sin(dot(floor(gl_FragCoord.xy / 1.25), vec2(39.3468, 11.135))) * 24634.6345);
  float tf = tipFade(vUv.x);
  float a = threadFade(vUv.x) * mix(0.16, 0.5, 1.0 - tf);
  gl_FragColor = vec4(c * a, a);
}`

const dustVert = /* glsl */`
attribute vec2 uv;
${SURFACE}
varying vec2 vUv; varying float vSp;
void main(){
  float r = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5);
  float r2 = fract(r * 17.31 + uv.y * 3.7);
  float sp = 1.0 - smoothstep(0.0, 0.36, uv.x) * smoothstep(1.0, 0.64, uv.x);
  float dir = uv.x < 0.5 ? -1.0 : 1.0;
  float life = fract(uTime * 0.035 + r2);                       // each grain loops: leaves the tip, drifts out, fades
  float uu = uv.x - dir * 0.04 * r + dir * sp * (0.12 * life + 0.03 * r);
  float vv = uv.y + (r - 0.5) * sp * (0.25 + 0.5 * life);
  vec3 p = S(uu, vv);
  vUv = vec2(clamp(uu, 0.0, 1.0), vv);
  vSp = pow(sp, 1.4) * smoothstep(0.0, 0.3, life) * 1.0 * step(0.0, r) * (1.0 - life) * smoothstep(0.0, 0.2, life);
  gl_Position = toClip(p);
  gl_PointSize = 2.2 + 1.8 * fract(r * 7.3);
}`
const dustFrag = /* glsl */`
precision highp float;
${PALETTE}
varying vec2 vUv; varying float vSp;
void main(){
  float d = length(gl_PointCoord - 0.5); if (d > 0.5 || vSp < 0.02) discard;
  float a = vSp * 0.75 * (1.0 - smoothstep(0.1, 0.5, d));
  gl_FragColor = vec4(pal(vUv.x) * a, a);
}`

// Separable Gaussian blur whose radius depends on distance to the ribbon tips (0 in the body → max at the tips).
const blurVert = /* glsl */`
attribute vec2 position; attribute vec2 uv; varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }`
const blurFrag = /* glsl */`
precision highp float;
uniform sampler2D tMap; uniform vec2 uPx; uniform vec2 uDir; uniform vec2 uA; uniform vec2 uB; uniform float uMax;
varying vec2 vUv;
void main(){
  vec2 p = vUv / uPx;                               // pixel coords (y up)
  vec2 ab = uB - uA;
  float t = clamp(dot(p - uA, ab) / dot(ab, ab), 0.0, 1.0);
  float d = min(t, 1.0 - t);
  float w = 1.0 - smoothstep(0.01, 0.36, d);
  float r = uMax * pow(w, 1.6);                           // smooth, continuous radius
  if (r < 0.6) { gl_FragColor = texture2D(tMap, vUv); return; }
  vec4 acc = vec4(0.0); float tot = 0.0;
  for (int i = -14; i <= 14; i++) {
    float x = float(i) / 14.0;
    float g = exp(-x * x * 2.5);
    acc += texture2D(tMap, vUv + uDir * uPx * x * r) * g; tot += g;
  }
  gl_FragColor = acc / tot;
}`

// works on the main thread and inside a worker (OffscreenCanvas)
const mk = (): any => (typeof document !== 'undefined' ? document.createElement('canvas') : new OffscreenCanvas(1, 1))

export function createSilk () {
  const canvas = mk()
  const renderer = new Renderer({ canvas, alpha: true, antialias: true, dpr: 1, premultipliedAlpha: true })
  const gl = renderer.gl
  gl.clearColor(0, 0, 0, 0)

  const U = 320; const V = 26; const THREADS = 110
  const uvB: number[] = []; const idxB: number[] = []
  for (let j = 0; j <= V; j++) for (let i = 0; i <= U; i++) uvB.push(i / U, j / V)
  for (let j = 0; j < V; j++) for (let i = 0; i < U; i++) { const a = j * (U + 1) + i; idxB.push(a, a + U + 1, a + 1, a + 1, a + U + 1, a + U + 2) }
  const uvL: number[] = []; const idxL: number[] = []
  for (let j = 0; j < THREADS; j++) {
    const v = (j + 0.5) / THREADS
    for (let i = 0; i <= U; i++) uvL.push(i / U, v)
    for (let i = 0; i < U; i++) { const a = j * (U + 1) + i; idxL.push(a, a + 1) }
  }
  const body = new Geometry(gl, { uv: { size: 2, data: new Float32Array(uvB) }, index: { data: new Uint16Array(idxB) } })
  const lines = new Geometry(gl, { uv: { size: 2, data: new Float32Array(uvL) }, index: { data: new Uint32Array(idxL) } })

  const u = {
    uTime: { value: 0 }, uRes: { value: [1, 1] }, uAngle: { value: 0 }, uCenter: { value: [0, 0] },
    uLen: { value: 1 }, uH: { value: 1 }, uAmp: { value: 1 }, uPhase: { value: 0.6 }
  }
  const scene = new Transform()
  new Mesh(gl, { geometry: body, program: new Program(gl, { vertex: bodyVert, fragment: bodyFrag, uniforms: u, transparent: true, cullFace: false, depthTest: false }) }).setParent(scene)
  new Mesh(gl, { geometry: lines, mode: gl.LINES, program: new Program(gl, { vertex: lineVert, fragment: lineFrag, uniforms: u, transparent: true, depthTest: false }) }).setParent(scene)

  const rtA = new RenderTarget(gl, { width: 2, height: 2 }); const rtB = new RenderTarget(gl, { width: 2, height: 2 })
  const bu = { tMap: { value: rtA.texture }, uPx: { value: [1, 1] }, uDir: { value: [1, 0] }, uA: { value: [0, 0] }, uB: { value: [1, 0] }, uMax: { value: 40 } }
  const blurMesh = new Mesh(gl, { geometry: new Triangle(gl), program: new Program(gl, { vertex: blurVert, fragment: blurFrag, uniforms: bu, depthTest: false, depthWrite: false }) })
  const axis = () => {   // ribbon axis in device pixels, y up (GL convention)
    const d = renderer.dpr; const [cx, cy] = u.uCenter.value as number[]; const a = u.uAngle.value as number; const L = (u.uLen.value as number) / 2
    const H = (u.uRes.value as number[])[1]
    const ex = Math.cos(a) * L; const ey = Math.sin(a) * L
    bu.uA.value = [(cx - ex) * d, (H - (cy - ey)) * d]; bu.uB.value = [(cx + ex) * d, (H - (cy + ey)) * d]
  }

  let narrow = false
  const layout = (w: number, h: number) => {
    u.uRes.value = [w, h]
    if (narrow) {               // phones: long diagonal ribbon behind the lower half of the headline
      const diag = Math.hypot(w, h)
      u.uAngle.value = -1.05; u.uCenter.value = [w * 0.42, h * 0.5]
      u.uLen.value = diag * 1.0; u.uH.value = w * 0.5; u.uAmp.value = w * 0.16
    } else {                    // desktop: wide ribbon sweeping across behind "Software Engineer"
      u.uAngle.value = -0.06; u.uCenter.value = [w * 0.52, h * 0.55]
      u.uLen.value = w * 1.05; u.uH.value = Math.min(h * 0.42, w * 0.26); u.uAmp.value = h * 0.13
    }
  }
  let W = 1; let H = 1
  const bodyCanvas = mk(); const bctx = bodyCanvas.getContext('2d')!
  return {
    canvas, body: bodyCanvas,
    resize (w: number, h: number, dpr: number) {
      W = w; H = h; narrow = w < 768
      renderer.dpr = dpr; renderer.setSize(w, h); layout(w, h)
      const cw = gl.canvas.width; const ch = gl.canvas.height
      rtA.setSize(cw, ch); rtB.setSize(cw, ch)
      bu.uPx.value = [1 / cw, 1 / ch]; bu.uMax.value = (narrow ? 52 : 95) * dpr
      axis()
    },
    render (t: number, isNarrow: boolean) {
      if (isNarrow !== narrow) { narrow = isNarrow; layout(W, H); axis() }
      u.uTime.value = t
      for (const c of [bodyCanvas]) if (c.width !== canvas.width || c.height !== canvas.height) { c.width = canvas.width; c.height = canvas.height }
      // ribbon → A, horizontal blur → B, vertical blur → screen
      renderer.render({ scene, target: rtA })
      bu.tMap.value = rtA.texture; bu.uDir.value = [1, 0]
      renderer.render({ scene: blurMesh, target: rtB })
      bu.tMap.value = rtB.texture; bu.uDir.value = [0, 1]
      renderer.render({ scene: blurMesh })
      bctx.clearRect(0, 0, bodyCanvas.width, bodyCanvas.height); bctx.drawImage(canvas, 0, 0)
    }
  }
}
