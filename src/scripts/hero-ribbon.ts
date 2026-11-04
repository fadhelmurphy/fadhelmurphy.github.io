// Hero: 3D silk ribbon (WebGL) with headline words re-drawn on the canvas, dark on the background and
// white where the ribbon passes. Rendering runs in a worker via OffscreenCanvas when supported.
import type { Badge, Item, Layout } from './ribbon-core'
import RibbonWorker from './ribbon.worker?worker&inline'

// @font-face URLs for the Poppins weights the canvas needs (works with hashed files or inlined data: URIs)
const fontUrls = (weights: Set<string>) => {
  const out: { url: string; weight: string }[] = []
  for (const sheet of [...document.styleSheets]) {
    let rules: CSSRuleList; try { rules = sheet.cssRules } catch { continue }
    for (const rule of [...rules]) {
      if (!(rule instanceof CSSFontFaceRule)) continue
      const st = rule.style; const fam = st.getPropertyValue('font-family').replace(/["']/g, '').trim()
      const w = st.getPropertyValue('font-weight').trim(); const src = st.getPropertyValue('src')
      const u = src.match(/url\(["']?([^"')]+)["']?\)/)?.[1]
      if (fam !== 'Poppins' || !weights.has(w) || !u) continue
      const range = st.getPropertyValue('unicode-range')
      if (range && !/U\+0+-?0*FF|U\+0000-00FF/i.test(range)) continue   // latin subset only
      out.push({ url: new URL(u, location.href).href, weight: w })
    }
  }
  return out
}

export function mountRibbon (canvas: HTMLCanvasElement, root: HTMLElement) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

  const measure = (): Layout => {
    const r = root.getBoundingClientRect()
    const W = r.width; const H = r.height; const dpr = Math.min(devicePixelRatio || 1, W < 768 ? 1.5 : 2)
    const items: Item[] = [...root.querySelectorAll<HTMLElement>('[data-swap]')].map((el) => {
      const b = el.getBoundingClientRect(); const cs = getComputedStyle(el)
      return {
        text: el.textContent ?? '', x: b.left - r.left, y: b.top - r.top, w: b.width, h: b.height,
        font: `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`,
        dark: (el.dataset.swap || '#2e3e6a,#2e3e6a').split(','),
        delay: Number(el.dataset.delay || 0)
      }
    })
    const badges: Badge[] = [...root.querySelectorAll<HTMLElement>('[data-badge]')].map((el) => {
      const b = el.getBoundingClientRect(); const cs = getComputedStyle(el)
      const [tint, dot, ink = '#2e3e6a'] = (el.dataset.badge || 'rgba(255,255,255,.4)|#2e3e6a').split('|')
      return { x: b.left - r.left, y: b.top - r.top, w: b.width, h: b.height, text: el.textContent?.trim() ?? '',
        font: `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`, tint, dot, ink, padL: parseFloat(cs.paddingLeft), delay: Number(el.dataset.delay || 0) }
    })
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px'
    return { W, H, dpr, items, badges }
  }

  let visible = true
  let send: (m: any, t?: Transferable[]) => void
  const play = () => send({ type: visible && !document.hidden && !reduce ? 'play' : 'pause' })

  const offscreen = 'transferControlToOffscreen' in canvas && typeof Worker !== 'undefined'
  if (offscreen) {
    const w: Worker = new RibbonWorker()
    send = (m, t) => w.postMessage(m, t || [])
    const first = measure()
    const weights = new Set([...first.items, ...first.badges].map((i) => i.font.split(' ')[0]))
    const oc = canvas.transferControlToOffscreen()
    send({ type: 'init', canvas: oc, reduce, fonts: fontUrls(weights) }, [oc])
    send({ type: 'layout', layout: first })
  } else {
    // fallback: same renderer on the main thread
    let r: any = null; let raf = 0; let queue: any[] = []
    const loop = (now: number) => { raf = requestAnimationFrame(loop); r.draw(now) }
    send = (m) => {
      if (!r) { queue.push(m); return }
      if (m.type === 'layout') { r.layout(m.layout); if (!raf) r.draw(performance.now()) }
      else if (m.type === 'intro') { r.intro(performance.now() - (m.ago || 0)); if (m.still) r.draw(performance.now() + 5000) }
      else if (m.type === 'play') { if (!raf) raf = requestAnimationFrame(loop) }
      else if (m.type === 'pause') { cancelAnimationFrame(raf); raf = 0 }
    }
    import('./ribbon-core').then(({ createRibbon }) => {
      r = createRibbon(canvas, reduce)
      const q = queue; queue = []
      r.layout(measure()); r.draw(performance.now())
      q.forEach((m) => m.type !== 'layout' && send(m))
    })
  }

  root.classList.add('swap-ready')            // HTML copy becomes transparent; canvas now owns the headline

  let lastW = 0; let lastH = 0
  new ResizeObserver(() => {
    const r = root.getBoundingClientRect()
    if (r.width === lastW && r.height === lastH) return
    lastW = r.width; lastH = r.height; send({ type: 'layout', layout: measure() })
  }).observe(root)
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; play() }).observe(root)
  document.addEventListener('visibilitychange', play)

  let introAt = -1
  const go = () => { if (introAt >= 0) return; introAt = performance.now(); send({ type: 'intro', ago: 0, still: reduce }) }
  ;(window as any).__booted ? go() : document.addEventListener('boot:done', go, { once: true })
  setTimeout(go, 4000)
  play()
}
