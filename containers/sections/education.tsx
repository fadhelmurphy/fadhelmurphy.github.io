import { type TimelineSectionsType } from 'Containers/types/sections.type'
import styles from './section.module.scss'

const Education = ({ title, children }: TimelineSectionsType): JSX.Element =>
<div className={`education-timeline-sections bg-section-edu md:bg-section-edu-md 2xl:bg-section-edu-lg pb-48 ${styles.Section_education}`}>
  <div className="mx-auto grid grid-cols-1 md:grid-cols-2">
    <div className="head flex justify-center items-center relative">
      <div className="radial-white-gradient-bg" />
      <div className="pattern" />
      <div data-aos="animation-scale-y" data-aos-duration="500" className="title font-header text-center text-6xl md:text-7xl 2xl:text-8xl font-semibold bg-clip-text text-transparent bg-edu-orange z-[3] text-shadow-white">
        <h2>{title}</h2>
      </div>
    </div>
    <div className="content my-12 p-8 md:p-0">{children}</div>
  </div>
</div>

export default Education
