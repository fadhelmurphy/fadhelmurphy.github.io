import React from "react";
import { TimelineSectionsType } from "Containers/types/sections.type";

const Education = ({ title, children }: TimelineSectionsType) => {
  return (
    <>
    
    <div className="education-timeline-sections">
      <div className="container mx-auto">
        <div className="head">
          <div className="title font-header text-2xl font-semibold text-teal-500 md:text-8xl">
            <h2>{title}</h2>
          </div>
        </div>
        <div className="content my-24">{children}</div>
      </div>
    </div>
    </>
  );
};

export default Education;
