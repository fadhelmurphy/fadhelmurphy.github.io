import { silkSvg } from '../lib/silk-svg'
export const GET = () => new Response(silkSvg(), { headers: { 'Content-Type': 'image/svg+xml' } })
