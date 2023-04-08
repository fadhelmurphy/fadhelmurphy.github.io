import React from "react";
import { TimelineSectionsType } from "Containers/types/sections.type";

const TimelineSections = ({ title, desc, children }: TimelineSectionsType) => {
  return (
    <>
    
    <style>
        {`
        .timeline-sections {
            background: radial-gradient(ellipse at -10% 75%, rgba(96,165,250,1) 0%, rgba(165,243,252,0.5) 12%, rgba(255,255,255,0) 15%)

            ;
        }
        `}
    </style>
    <div className="timeline-sections py-24">
      <div className="container mx-auto">
        <div className="head">
          <div className="title font-header text-2xl font-semibold text-teal-500 md:text-3xl">
            <h2>{title}</h2>
          </div>
          <div className="desc my-6 font-header text-4xl font-semibold">
            {desc}
          </div>
        </div>
        <div className="content my-24">{children}</div>
      </div>
    </div>
    </>
  );
};

export default TimelineSections;
