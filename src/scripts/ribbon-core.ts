// Hero ribbon renderer, DOM-free so it can run in a worker (OffscreenCanvas) or on the main thread.
// Headline words are drawn dark, the silk on top, then a white copy masked by the silk alpha.
import { createSilk } from './silk'

export type Badge = { x: number; y: number; w: number; h: number; text: string; font: string; tint: string; dot: string; ink: string; padL: number; delay: number }
export type Item = { text: string; x: number; y: number; w: number; h: number; font: string; dark: string[]; delay: number }
export type Layout = { W: number; H: number; dpr: number; items: Item[]; badges: Badge[] }

type Cnv = HTMLCanvasElement | OffscreenCanvas
type Ctx = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
const mk = (): any => (typeof document !== 'undefined' ? document.createElement('canvas') : new OffscreenCanvas(1, 1))
const ease = (p: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, p)), 3)

export function createRibbon (canvas: Cnv, reduce: boolean) {
  const ctx = canvas.getContext('2d') as Ctx
  const off: Cnv = mk(); const octx = off.getContext('2d') as Ctx
  const mask: Cnv = mk(); const mctx = mask.getContext('2d') as Ctx
  const comp: Cnv = mk(); const cctx = comp.getContext('2d') as Ctx
  const silk = createSilk()
  let W = 0; let H = 0; let dpr = 1; let narrow = false
  let items: Item[] = []; let badges: Badge[] = []
  let introStart = -1

  const pill = (c: Ctx, x: number, y: number, w: number, h: number) => {
    const r = h / 2; c.beginPath(); c.moveTo(x + r, y); c.lineTo(x + w - r, y); c.arc(x + w - r, y + r, r, -Math.PI / 2, Math.PI / 2)
    c.lineTo(x + r, y + h); c.arc(x + r, y + r, r, Math.PI / 2, Math.PI * 1.5); c.closePath()
  }
  const drawBadges = (c: Ctx, white: boolean, ti: number) => {
    for (const b of badges) {
      const p = ease((ti - b.delay / 1000) / 0.9); if (p <= 0) continue
      c.save(); c.globalAlpha = p; c.translate(0, (1 - p) * 30)
      pill(c, b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1)
      c.fillStyle = white ? 'rgba(255,255,255,0.16)' : b.tint; c.fill()
      if (white) { c.lineWidth = 1; c.strokeStyle = 'rgba(255,255,255,0.9)'; c.stroke() }
      c.fillStyle = white ? '#fff' : b.dot
      c.beginPath(); c.arc(b.x + b.padL * 0.55, b.y + b.h / 2, 3.5, 0, Math.PI * 2); c.fill()
      c.font = b.font; c.textBaseline = 'middle'; c.fillStyle = white ? '#fff' : b.ink
      c.fillText(b.text, b.x + b.padL, b.y + b.h / 2 + 1)
      c.restore()
    }
  }
  const drawText = (c: Ctx, white: boolean, t: number) => {
    for (const it of items) {
      const p = ease((t - it.delay / 1000) / 0.9)
      if (p <= 0) continue
      c.save()
      c.globalAlpha = p
      c.translate(0, (1 - p) * 40)
      c.font = it.font; c.textBaseline = 'alphabetic'
      const m = c.measureText(it.text)
      const asc = m.fontBoundingBoxAscent ?? it.h * 0.8
      const g = c.createLinearGradient(it.x, it.y, it.x + it.w, it.y + it.h)
      const cols = white ? ['#ffffff', '#cffafe'] : it.dark
      g.addColorStop(0.3, cols[0]); g.addColorStop(1, cols[1] ?? cols[0])
      c.fillStyle = g
      c.fillText(it.text, it.x, it.y + asc)
      c.restore()
    }
  }

  return {
    layout (l: Layout) {
      W = l.W; H = l.H; dpr = l.dpr; narrow = W < 768; items = l.items; badges = l.badges
      for (const c of [canvas, off, mask, comp]) { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr) }
      silk.resize(W, H, Math.min(dpr, 1.5))
    },
    intro (now: number) { if (introStart < 0) introStart = now },
    draw (now: number) {
      const t = now / 1000
      const ti = introStart < 0 ? -1 : (now - introStart) / 1000
      for (const c of [ctx, octx]) { c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, W, H) }
      silk.render(reduce ? 3 : t, narrow)
      // 1. dark text underneath
      drawText(ctx, false, ti)
      drawBadges(ctx, false, ti)
      // 2. silk (blurred tips are done on the GPU)
      const cw = canvas.width; const ch = canvas.height
      cctx.setTransform(1, 0, 0, 1, 0, 0); cctx.clearRect(0, 0, cw, ch); cctx.drawImage(silk.body, 0, 0, cw, ch)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.drawImage(comp, 0, 0)
      // 3. white copy of the text, kept only where the ribbon is
      octx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawText(octx, true, ti)
      drawBadges(octx, true, ti)
      octx.globalCompositeOperation = 'destination-in'
      octx.setTransform(1, 0, 0, 1, 0, 0)
      mctx.setTransform(1, 0, 0, 1, 0, 0); mctx.globalCompositeOperation = 'source-over'; mctx.clearRect(0, 0, mask.width, mask.height)
      for (let k = 0; k < 3; k++) mctx.drawImage(comp, 0, 0)   // alpha → ~1 inside the wave
      octx.drawImage(mask, 0, 0)
      octx.globalCompositeOperation = 'source-over'
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.drawImage(off, 0, 0)
    }
  }
}
