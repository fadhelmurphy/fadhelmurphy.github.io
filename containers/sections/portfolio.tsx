import React from "react";
import { TimelineSectionsType } from "Containers/types/sections.type";

const Portfolio = ({ title, desc, children }: TimelineSectionsType) => {
  return (
    <>
    
    <div className="portfolio-timeline-sections bg-edu-orange h-screen w-100 porto-clip py-72">
      <div className="container mx-auto h-full">
        <div className="head h-4/6">
          <div className="title font-header text-center text-2xl font-semibold md:text-8xl text-white">
            <h2>{title}</h2>
          </div>
          <div className="desc text-center my-6 font-header text-4xl font-semibold text-white/75">
            {desc}
          </div>
        </div>
        <div className="content my-24 grid grid-cols-2">{children}</div>
      </div>
    </div>
    </>
  );
};

export default Portfolio;
