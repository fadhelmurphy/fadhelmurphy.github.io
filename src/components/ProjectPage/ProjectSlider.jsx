import { Image,React,Slider,Link } from "."
export const ProjectSlider = () => {
  let sliderOnClick = null
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    swipeToSlide: true,
    dotsClass: `slick-dots custom-slick-dots`,
  responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows:true,
        }
      }
    ],
  appendDots: (dots) => (
    <div>
    <div
    className="w-100 w-md-75 mx-auto px-3 thedots"
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center"
      }}
    >
      
      <button type="button" 
        onClick={() => sliderOnClick.slickPrev()} className="btn btn-light rounded-0 mr-3 p-3 p-md-4 d-flex">
        
      {"←"}     
          </button>
      <button type="button" 
        onClick={() => sliderOnClick.slickNext()} className="btn rounded-0 text-white p-3 p-md-4 d-flex"
        style={{
          background:"#354f52",
        }}
        >
      {"→"}
          </button>
    </div></div>
    )
  };

  const RevCard = ({
    objImg = null,
    title = "Pizza",
    desc = "Gambir, Jakarta Pusat",
    idx,
    background,
    link
  }) => (
    <>
      <div
        className="kategori mr-5 h-100 text-left position-relative row align-items-stretch overflow-hidden"
      >
        <div className="col-12 col-md-6 align-self-center"
        style={{
          background,
          zIndex:4
        }}>
        <Link href={link} key={idx}>
          <Image style={{
          borderRadius: "10px",
    transform: "scale(0.8)",
    transformOrigin:"center",
    // maxHeight: "40vh",
    width:"100%",
    height:"50vh",
    objectFit:"cover",
    boxShadow:"0 1rem 3rem rgba(0,0,0,.175)"
          }} filename={objImg} />
          </Link>
        </div>
        <div className="col-12 col-md-6 px-4 px-md-5 py-5 justify-content-center align-self-center">
      <h1 className="position-absolute font-weight-bold" 
          style={{
            left: "-25%",
            top: "-15%",
            fontSize: "8vw",
            color:background,
            opacity:"0.2",
            zIndex:0
          }}>{title}</h1>
          <h1 className="mb-0 d-flex font-weight-bold" style={{
            zIndex:4,
            fontSize: "8vh",
          }}>{title}</h1>
          <h4 className="my-0 font-weight-normal">{desc}</h4>
        <Link href={link} key={idx}>
          <h4 className="my-3">
          view ↗
          </h4>
          </Link>
        </div>
      </div>
    </>
  )
  const data = [
    {
      objImg:
      "web/personal-web.png",
      title: "Personal Web",
      desc: "Gatsby.js, AOS.js, and Bootstrap",
      background: "#7bc678",
      link:"/"
    },
    {
      objImg:
      "web/kemenkes.png",
        title: "Keluarga Sehat",
        desc: "Build with Next.Js, Bootstrap 5, HighChart, and React Context",
        background: "#34a870",
        link:"http://dashboard-keluargasehat.kemkes.go.id/login"
    },
    {
      objImg:
      "web/istih.png",
        title: "ISTIH 2020",
        desc: "Next.js, React.js, Redux, Redux-saga",
        background: "#1dc6d1",
        link:"http://istih.id/"
    },
    {
      objImg:
      "web/dashboard-desktop.png",
        title: "Vote App",
        desc: "Build with React.js, antd, context state management and Laravel. Created by me and Yazid",
        background: "#ac8af6",
        link:"http://localhost:8000/project/vote-app"
    },
    {
      objImg:
      "web/bisacpns-2020.png",
        title: "Bisa CPNS 2020",
        desc: "Implementing design to code with bootstrap and aos.js",
        background: "#f26d77",
        link:"https://bisacpns.com/"
    },
    {
      objImg:
      "web/tour-travel.png",
        title: "Tour Travel Revolution",
        desc: "Build with Next.js, Redux, Redux-saga",
        background: "#fca63c",
        link:"http://167.172.62.14/api/admin/"
    },
  ]
  return (
    <>
    <style>
        {`
        .custom-slick-dots{
            top:0;
            display:table;
        }
        .thedots {
          margin-top:-6rem;
        }
        @media only screen and (min-width:768px) {
          .thedots {
            margin-top:-10rem;
          }
        }
        `}
    </style>
      <div className="w-100 mx-auto mt-5">
        <Slider
          className="review-slider position-relative"
          ref={c => (sliderOnClick = c)}
          {...settings}
        >
          {data.map((dataprop, idx) => (
              <RevCard {...dataprop} idx={(idx+1)} />
          ))}
        </Slider>
      </div>
    </>
  )
}
