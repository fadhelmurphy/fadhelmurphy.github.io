import React from "react";
import { TimelineSectionsType } from "Containers/types/sections.type";

const Education = ({ title, children }: TimelineSectionsType) => {
  return (
    <>
    
    <div className="education-timeline-sections bg-edu-section">
      <div className="mx-auto grid grid-cols-2">
        <div className="head self-center p-12">
          <div className="title font-header text-center text-2xl font-semibold md:text-8xl bg-clip-text text-transparent bg-edu-orange">
            <h2>{title}</h2>
          </div>
        </div>
        <div className="content my-12">{children}</div>
      </div>
    </div>
    </>
  );
};

export default Education;
