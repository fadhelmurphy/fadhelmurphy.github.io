// Geometry for the static silk ribbon used as a section divider.
export const VW = 1440, VH = 280
const N = 34, step = 24
export const cy = (x: number) => VH * 0.5 + Math.sin((x / VW) * Math.PI * 2 + 0.6) * VH * 0.16 + Math.sin((x / VW) * Math.PI * 0.9) * VH * 0.08
const band = (x: number) => VH * (0.14 + 0.26 * Math.pow(Math.max(0, Math.sin(Math.PI * Math.min(1, Math.max(0, x / VW)))), 1.2))
const twist = (x: number) => 0.55 + 0.45 * Math.sin((x / VW) * Math.PI * 2.4 + 1.1)

// wavy edge: area above the ribbon's centre line
export function edgePath () {
  let d = 'M-20 -1'
  for (let x = -20; x <= VW + 20; x += step) d += `L${x} ${cy(x).toFixed(1)}`
  return d + `L${VW + 20} -1Z`
}

// the threads, as a standalone SVG file (cached by the browser, shared by every divider)
export function silkSvg (bold = false) {
  const lw = bold ? 2 : 1.2, glow = bold ? 9 : 6, ga = bold ? 0.8 : 0.55
  const threads = Array.from({ length: N }, (_, i) => {
    const k = i / (N - 1) - 0.5
    const pts: string[] = []
    for (let x = -20; x <= VW + 20; x += step) pts.push(`${x} ${(cy(x) + k * band(x) * twist(x)).toFixed(1)}`)
    // smooth curve through the points (Catmull-Rom → cubic Bézier is overkill here; a polyline with round joins at 24px is smooth once stretched)
    return { d: 'M' + pts.join('L'), o: (bold ? 0.45 + 0.55 * (1 - Math.abs(k) * 2) : 0.25 + 0.6 * (1 - Math.abs(k) * 2)).toFixed(2) }
  })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VW} ${VH}" preserveAspectRatio="none">
<defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#2563eb"/><stop offset=".35" stop-color="#0ea5e9"/><stop offset=".6" stop-color="#22d3ee"/><stop offset=".8" stop-color="#14b8a6"/><stop offset="1" stop-color="#10b981"/></linearGradient>
<linearGradient id="m" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".12" stop-color="#fff"/><stop offset=".88" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<mask id="k"><rect x="-20" y="0" width="${VW + 40}" height="${VH}" fill="url(#m)"/></mask>
<filter id="b" x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation="10"/></filter></defs>
<g mask="url(#k)" stroke="url(#g)" fill="none" stroke-linecap="round" stroke-linejoin="round">
${bold ? '' : `<g filter="url(#b)" opacity="${ga}">${threads.filter((_, i) => i % 3 === 0).map((t) => `<path d="${t.d}" stroke-width="${glow}" opacity="${t.o}" vector-effect="non-scaling-stroke"/>`).join('')}</g>`}
${threads.map((t) => `<path d="${t.d}" stroke-width="${lw}" opacity="${t.o}" vector-effect="non-scaling-stroke"/>`).join('')}
</g></svg>`
}
