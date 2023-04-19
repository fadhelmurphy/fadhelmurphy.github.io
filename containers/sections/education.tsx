import { TimelineSectionsType } from "Containers/types/sections.type";

const Education = ({ title, children }: TimelineSectionsType) => {
  return (
    <>
    
    <div className="education-timeline-sections bg-edu-section pb-48">
      <div className="mx-auto grid grid-cols-2">
        <div className="head flex justify-center items-center relative">
          <div className="radial-white-gradient-bg" />
          <div className="pattern" />
          <div className="title font-header text-center text-2xl font-semibold md:text-8xl bg-clip-text text-transparent bg-edu-orange z-[3] text-shadow-white">
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
