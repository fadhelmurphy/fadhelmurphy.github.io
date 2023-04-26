const PortoCard = ({ title, desc, image, linkObj }) => {
  return (
    <>
      <div className="porto-card">
        <div className="head">
          <div className="title mb-2 block font-semibold leading-6 text-2xl">
            <h2>{title}</h2>
          </div>
          <div className="desc font-normal text-base-2">
            <h3>{desc}</h3>
            {/* <a href={linkObj.link}>{linkObj.text}</a> */}
          </div>
        </div>
        <div className="content">
          <img src={image} className="drop-shadow-[0_55px_55px_rgba(255,187,0,1)]" loading="lazy" />
        </div>
      </div>
      <style>
        {`
        .porto-card {
          border-radius: 20px;
          background: #fff;
          -webkit-mask: linear-gradient(345deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 35%);
        }
        .porto-card .head {
          padding: 40px;
        }
        .porto-card .content {
          max-height: 20em;
          border-radius: 0 0 20px 20px;
          padding: 40px;
        }
      .porto-card .content img {
        position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
    object-fit: cover;
    background: #fff;
    border-radius: 20px;
      }
      `}
      </style>
    </>
  );
};
export default PortoCard;
