import Slider from "react-slick"
import React, { useCallback } from "react"
import { Image } from "."
export const ProjectSlider = () => {
  let sliderOnClick = null
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    dotsClass: `slick-dots custom-slick-dots`,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  }

  const RevCard = ({
    objImg = null,
    title = "Pizza",
    place = "Gambir, Jakarta Pusat",
  }) => (
    <>
      <div
        className="kategori mr-5 p-5 text-left position-relative row align-items-stretch overflow-hidden"
        style={{
          background: "#7bc6784d",
        }}
      >
        <div className="col-6 align-self-center">
          <img className="ml-n5 img-fluid w-100 shadow-lg" style={{
          borderRadius: "10px",
    transform: "scale(1.3)"
          }} src={objImg} />
        </div>
        <div className="col-6 py-5">
          <h2 className="mb-0 font-weight-bold">{title}</h2>
          <p className="my-0">{place}</p>
        </div>
      </div>
    </>
  )
  const data = [
    {
      objImg:
        "https://fadhelmurphy.github.io/static/a38e8fd4b1b97df209df0697f4c1f803/58fd3/istih.webp",
      title: "My App",
      place: "Stack",
    },
    {
      objImg:
        "https://fadhelmurphy.github.io/static/18cddd2d64493df156691b1ffb92ee55/58fd3/bisacpns-2020.webp",
        title: "My App",
        place: "Stack",
    },
    {
      objImg:
        "https://fadhelmurphy.github.io/static/b19e559e3f8d42b4ce30eb9aee2b3917/58fd3/dashboard-desktop.webp",
        title: "My App",
        place: "Stack",
    },
  ]
  return (
    <>
      <div className="w-100 w-md-75 mx-auto mt-5">
        <Slider
          className="review-slider position-relative"
          ref={c => (sliderOnClick = c)}
          {...settings}
        >
          {data.map((dataprop, idx) => (
            <div key={idx}>
              <RevCard {...dataprop} />
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}
