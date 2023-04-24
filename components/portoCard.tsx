const PortoCard = ({ title, desc, image, linkObj }) => {
  return (
    <>
      <div className="porto-card">
        <div className="head">
          <div className="title">
            <h2>{title}</h2>
          </div>
          <div className="desc">
            <p>{desc}</p>
            <a href={linkObj.link}>{linkObj.text}</a>
          </div>
        </div>
        <div className="content">
          <img src={image} loading="lazy" />
        </div>
      </div>
      <style>
        {`
        .porto-card .content {
          background: #7bc678;
          max-height: 20em;
        }
      .porto-card .content img {
        position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
    object-fit: cover;
    transform: scale(0.95) rotate(-10deg) translate(7%, 20%);
      }
      `}
      </style>
    </>
  );
};
export default PortoCard;
