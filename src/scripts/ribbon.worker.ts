// Runs the hero ribbon off the main thread so animation never blocks input.
import { createRibbon, type Layout } from './ribbon-core'

let r: ReturnType<typeof createRibbon> | null = null
let running = false; let pending: Layout | null = null; let introAt = -1; let still = false
const raf: (cb: (t: number) => void) => unknown =
  (self as any).requestAnimationFrame ? (cb) => (self as any).requestAnimationFrame(cb) : (cb) => setTimeout(() => cb(performance.now()), 16)
const loop = (now: number) => { if (!running || !r) return; r.draw(now); raf(loop) }

self.onmessage = async (e: MessageEvent) => {
  const m = e.data
  if (m.type === 'init') {
    // register the page's Poppins faces inside the worker so canvas text matches the HTML
    const fs = (self as any).fonts
    await Promise.all((m.fonts as { url: string; weight: string }[]).map(async (f) => {
      try { const face = new FontFace('Poppins', `url(${f.url})`, { weight: f.weight }); await face.load(); fs?.add(face) } catch {}
    }))
    r = createRibbon(m.canvas, m.reduce)
    if (pending) { r.layout(pending); pending = null }
    if (introAt >= 0) r.intro(introAt)
    r.draw(performance.now() + (still ? 5000 : 0))
    if (running) raf(loop)
  } else if (m.type === 'layout') {
    if (r) { r.layout(m.layout); if (!running) r.draw(performance.now()) } else pending = m.layout
  } else if (m.type === 'intro') {
    introAt = performance.now() - (m.ago || 0); still = !!m.still
    if (r) { r.intro(introAt); if (still) r.draw(performance.now() + 5000) }
  } else if (m.type === 'play') {
    if (!running) { running = true; if (r) raf(loop) }
  } else if (m.type === 'pause') {
    running = false
  }
}
