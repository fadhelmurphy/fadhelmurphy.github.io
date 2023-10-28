interface IPortoCard {
  title: string
  desc: string
  image: string
  linkObj: Record<string, string>
  customClassName: false | string
}

const PortoCard = ({ title, desc, image, linkObj, customClassName }: IPortoCard): JSX.Element => {
  const className = `porto-card${customClassName ? ` ${customClassName}` : ''}`
  return (
    <>
      <a
        href={linkObj.link}
        className={className}
        data-aos="fade-up" data-aos-duration="300"
      >
        <div className="head">
          <div className="title">
            <h2>{title}</h2>
          </div>
          <div className="desc">
            <p dangerouslySetInnerHTML={{ __html: desc }} />
            {/* <a href={linkObj.link}>{linkObj.text}</a> */}
          </div>
        </div>
        <div className="content">
          <img src={image} loading="lazy" />
        </div>
      </a>
    </>
  )
}
export default PortoCard
