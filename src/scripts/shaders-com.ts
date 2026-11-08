// Section backgrounds built with Shaders (shaders.com, MIT, WebGPU).
// Browsers without WebGPU, or a GPU failure, fall back to the hand-written WebGL versions.
// The library (~360 KB gzipped) is loaded lazily, only on WebGPU browsers, once a section is near the viewport.
import { mountShader, contours, heat } from './section-shader'

type Preset = { components: { type: string; id?: string; props?: Record<string, unknown> }[] }

export const presets: Record<string, (host: HTMLElement) => Preset> = {
  // topographic map that ripples under the cursor
  contours: () => ({
    components: [
      { type: 'FractalNoise', props: { colorA: '#000000', colorB: '#ffffff', octaves: 4, detail: 1.4, contrast: 0.35, speed: 0.06, seed: 7 } },
      { type: 'ContourLines', props: { levels: 16, lineWidth: 1.1, softness: 0.4, gamma: 0.9, colorMode: 'custom', lineColor: '#bdbab2', backgroundColor: '#efeeea' } },
      { type: 'CursorRipples', props: { intensity: 7, decay: 8, radius: 0.35, chromaticSplit: 0 } },
      { type: 'FilmGrain', props: { strength: 0.12, animated: true } }
    ]
  }),
  // molten Strava orange with a warm light leak; ripples follow the cursor
  heat: () => ({
    components: [
      { type: 'FlowingGradient', props: { colorA: '#8f2700', colorB: '#d63e00', colorC: '#fc4c02', colorD: '#ff7a2f', speed: 0.55, distortion: 0.65, seed: 3 } },
      { type: 'LightLeak', props: { intensity: 0.22, spread: 0.6, colorHot: '#fff3c4', colorMid: '#ff7a2f', colorFringe: '#ffb38a', speed: 0.6 } },
      { type: 'CursorRipples', props: { intensity: 9, decay: 7, radius: 0.4, chromaticSplit: 0.6 } },
      { type: 'FilmGrain', props: { strength: 0.35, animated: true } }
    ]
  }),
  // the stadium photo with an orange light leak and film grain
  photo: (host) => ({
    components: [
      { type: 'ImageTexture', props: { url: host.dataset.img, objectFit: 'cover' } },
      { type: 'LightLeak', props: { intensity: 0.32, spread: 0.55, colorHot: '#fff3c4', colorMid: '#fc4c02', colorFringe: '#ff9a5c', speed: 0.7 } },
      { type: 'FilmGrain', props: { strength: 0.45, animated: true } }
    ]
  })
}

const fallbacks: Record<string, string | undefined> = { contours, heat }

export function mountSectionShaders (reduce: boolean) {
  const hosts = [...document.querySelectorAll<HTMLElement>('[data-shader]')]
  const fallback = (host: HTMLElement, canvas?: HTMLCanvasElement) => {
    canvas?.remove()
    const frag = fallbacks[host.dataset.shader!]
    if (frag) mountShader(host, frag, reduce)
  }
  if (!('gpu' in navigator)) { hosts.forEach((h) => fallback(h)); return }
  let lib: Promise<typeof import('shaders/js')> | null = null
  const load = () => (lib ??= import('shaders/js'))

  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return
    io.unobserve(e.target)
    mount(e.target as HTMLElement)
  }), { rootMargin: '600px 0px' })
  hosts.forEach((h) => io.observe(h))

  async function mount (host: HTMLElement) {
    const make = presets[host.dataset.shader!]
    if (!make) return
    let createShader: typeof import('shaders/js')['createShader']
    try { ({ createShader } = await load()) } catch { fallback(host); return }
    const canvas = document.createElement('canvas')
    canvas.className = 'sec-gl sc-gl'
    canvas.setAttribute('aria-hidden', 'true')
    host.prepend(canvas)
    let shader: Awaited<ReturnType<typeof createShader>> | undefined
    try {
      shader = await createShader(canvas, make(host) as any, {
        disableTelemetry: true,
        onReady: () => { host.classList.add('has-gl'); canvas.classList.add('on') },
        // terminal failures leave the canvas blank: swap in the WebGL version
        onError: () => setTimeout(() => { if (!shader || shader.getFailureReason()) fallback(host, canvas) }, 0)
      })
      if (reduce) setTimeout(() => shader?.pause(), 800)
    } catch { fallback(host, canvas) }
  }
}
