import logo from '@/Assets/img/menu/logo.png'
import { getImage } from 'astro:assets'

const logoFadhelImg = await getImage({ src: logo, width: 32, format: 'webp' })

function MyLogo (): JSX.Element {
  return (
    <a href="/" className="mylogo">
        <img loading="lazy"
            decoding="async" alt='fadhel-logo' src={logoFadhelImg.src} />
        <p>Fadhel</p>
    </a>
  )
}

export default MyLogo
