import { TimelineSectionsType } from "Containers/types/sections.type";
import { useState, useEffect } from "react";

const Portfolio = ({ title, desc, children }: TimelineSectionsType) => {
  const [DynHeight, setDynHeight] = useState("170vh");
  useEffect(() => {
    typeof children !== "undefined" &&
      setDynHeight(
        `${
          document.querySelector<HTMLElement>(
            ".portfolio-timeline-sections-child"
          )?.offsetHeight + (384)
        }px`
      );
  }, [children, setDynHeight]);

  return (
    <>
      <style>
        {`
      .portfolio-timeline-sections {
        height: ${DynHeight};
      }
      `}
      </style>
      <div
        className={`portfolio-timeline-sections w-100 porto-clip relative flex items-center justify-center`}
      >
        <div className="absolute z-[2] h-full w-full bg-white-vertical-gradient" />
        <div className="absolute z-[1] h-full w-full bg-edu-orange" />
        <div className="portfolio-timeline-sections-child container absolute z-[3] mx-auto h-full py-[24rem]">
          <div className="head h-1/4 text-left">
            <div className="title font-header text-4xl font-semibold text-white">
              <h2>{title}</h2>
            </div>
            <div className="desc my-6 font-header text-2xl font-semibold text-white/75 md:text-8xl">
              {desc}
            </div>
          </div>
          <div className="content grid grid-cols-2 gap-20">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
