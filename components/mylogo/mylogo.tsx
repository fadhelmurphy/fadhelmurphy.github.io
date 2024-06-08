import logo from '@/Assets/img/menu/logo.png'

function MyLogo (): JSX.Element {
  return (
    <a href="/" className="mylogo">
        <img src={logo.src} />
        <p>Fadhel</p>
    </a>
  )
}

export default MyLogo
