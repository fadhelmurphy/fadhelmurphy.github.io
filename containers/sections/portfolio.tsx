import { type TimelineSectionsType } from 'Containers/types/sections.type'
import styles from './section.module.scss'

const Portfolio = ({ title, desc, children }: TimelineSectionsType): JSX.Element =>
  (
  <div className="portfolio-timeline-sections h-auto portfolio-timeline-sections w-100 porto-clip-mweb md:porto-clip relative flex items-center justify-center">
    <div className="absolute z-[2] h-full w-full md:bg-white-vertical-gradient" />
    <div className={`absolute z-[1] h-full w-full ${styles.Section_portofolio}`} />
    <div className="portfolio-timeline-sections-child container flex flex-col md:gap-14 z-[3] mx-auto h-full py-[12rem] md:py-[24rem]">
      <div className="head h-72 md:h-[15%] text-left p-8 pb-0 md:p-0">
        <div className="title font-header text-2xl md:text-3xl 2xl:text-4xl font-bold text-white">
          <h2 data-aos="fade-up" data-aos-duration="700">{title}</h2>
        </div>
        <div data-aos="animation-scale-y" data-aos-duration="900" className="desc my-6 font-header text-6xl md:text-7xl 2xl:text-8xl font-semibold text-white">
          {desc}
        </div>
      </div>
      <div className="content grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
        {children}
      </div>
    </div>
  </div>)

export default Portfolio
