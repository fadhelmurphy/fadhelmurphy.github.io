import { prefix } from "Consts/config";
import React from "react";

type SliderDataType = {
    [key:string]: string | boolean;
}

const SliderData: SliderDataType[] = [
  {
    type: "text",
    text: "React",
  },
  {
    type: "image",
    url: `${prefix}/home/stack-slider/webpack.png`,
    alt: "webpack fadhel",
  },
  {
    type: "image",
    url: `${prefix}/home/stack-slider/nextjs-icon.png`,
    alt: "nextjs fadhel",
  },
  {
    type: "image",
    url: `${prefix}/home/stack-slider/gatsby-icon.png`,
    alt: "gatsby fadhel",
  },
  {
    type: "image",
    url: `${prefix}/home/stack-slider/flutter.png`,
    alt: "flutter fadhel",
  },
  {
    type: "text",
    text: "MobX",
  },
  {
    type: "text",
    text: "Zustand",
  },
  {
    type: "text",
    text: "Redux",
  },
  {
    type: "image",
    url: `${prefix}/home/stack-slider/tensorflow-logo.png`,
    alt: "tensorflow fadhel",
  },
  {
    type: "text",
    text: "Sklearn",
  },
  {
    type: "text",
    text: "Express.js",
  },
  {
    type: "image",
    url: `${prefix}/home/stack-slider/mysql.png`,
    alt: "mysql fadhel",
  },
  {
    type: "image",
    url: `${prefix}/home/stack-slider/laravel.png`,
    alt: "laravel fadhel",
  },
  {
    type: "text",
    text: "GraphQL",
  },
  {
    type: "text",
    text: "MongoDB",
  },
];

const LogoSlider = ({ data = SliderData }) => {
  const duplicatedData: SliderDataType[] = [...data, ...data];
  return (
    <>
      <div className="mx-auto mb-9 md:mb-24">
        <div className="slider h-[16vh] md:h-[30vh] flex items-start md:items-stretch">
          <div className="slide-track">
            {duplicatedData &&
              duplicatedData.length > 0 &&
              duplicatedData.map((item: any, idx: number) =>
                item.type === "text" ? (
                  <div
                    key={String(idx + 1)}
                    className="slide w-48 h-24 md:w-80 md:h-36 relative backdrop-blur-sm bg-white/50 drop-shadow-2xl rounded-lg"
                  >
                    <h2 className="text-gray-500 text-2xl font-bold">
                      {item.text}
                    </h2>
                  </div>
                ) : (
                  <div
                    key={String(idx + 1)}
                    className="slide w-48 h-24 md:w-80 md:h-36 relative backdrop-blur-sm bg-white/50 drop-shadow-2xl rounded-lg"
                  >
                    <img
                      className="p-6 md:p-[3.2rem]"
                      src={item.url}
                      alt={item.alt}
                    />
                  </div>
                )
              )}
          </div>
        </div>
      </div>
      <style>
        {`

@keyframes scroll {
    100% {
      transform: translateX(calc((-20rem) * ${data.length}));
    }
  }
          .slider {
            margin: auto;
            overflow: hidden;
            position: relative;
            width: auto;
          }
          
          .slide-track {
            width:calc(20rem * ${duplicatedData.length});
            animation: scroll 25s linear infinite;
            display: flex;
            gap: 3rem;
          }
          .slide {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            align-self: center;
            word-wrap: break-word;
          }
          .slide img {
            display: block;
            object-fit: contain;
            -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
            filter: grayscale(100%);
          }
          .slide img:hover {
            -webkit-filter: grayscale(0%); /* Safari 6.0 - 9.0 */
            filter: grayscale(0%);
          }
          .slide-track:has(.slide:hover) {
            animation-play-state: paused!important;
          }
        `}
      </style>
    </>
  );
};
export default React.memo(LogoSlider);
