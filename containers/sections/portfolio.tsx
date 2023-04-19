import { TimelineSectionsType } from "Containers/types/sections.type";

const Portfolio = ({ title, desc, children }: TimelineSectionsType) => {
  return (
    <>
    
    <div className="portfolio-timeline-sections flex justify-center items-center relative h-[150vh] w-100 porto-clip">
    <div className="w-full h-full bg-white-vertical-gradient absolute z-[2]" />
    <div className="w-full h-full bg-edu-orange absolute z-[1]" />
      <div className="container mx-auto h-full absolute z-[3] py-[30rem]">
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
