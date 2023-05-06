const PortoCard = ({ title, desc, image, linkObj }) => {
  return (
    <>
      <div className="porto-card flex flex-col justify-between">
        <div className="head p-[2.5rem] pb-[0]">
          <div className="title mb-2 block font-semibold leading-9 text-[2rem]">
            <h2>{title}</h2>
          </div>
          <div className="desc font-normal text-base-2 text-xl my-6">
            <h3>{desc}</h3>
            {/* <a href={linkObj.link}>{linkObj.text}</a> */}
          </div>
        </div>
        <div className="content p-[2.5rem] pt-[0]">
          <img src={image} className="drop-shadow-[0_55px_55px_rgba(255,187,0,1)]" loading="lazy" />
        </div>
      </div>
      <style>
        {`
        .porto-card .content {
          max-height: 20em;
          border-radius: 0 0 20px 20px;
        }
      .porto-card .content img {
        position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
    object-fit: contain;
    background: #fff;
    border-radius: 20px;
      }
      `}
      </style>
    </>
  );
};
export default PortoCard;
