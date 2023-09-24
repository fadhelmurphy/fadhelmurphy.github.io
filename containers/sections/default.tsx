import { type TimelineSectionsType } from 'Containers/types/sections.type'
import styles from './section.module.scss'

const TimelineSections = ({ title, desc, children }: TimelineSectionsType): JSX.Element => {
  return (
    <>
      <div className={`section-timeline ${styles.Section_default}`}>
        <div className="container mx-auto">
          <div className="head p-8 md:p-0">
            <div data-aos="fade-up" data-aos-duration="500" className="title font-header text-2xl font-semibold text-teal-500 md:text-3xl">
              <h2>{title}</h2>
            </div>
            <div data-aos="animation-scale-y" data-aos-duration="500" className="desc my-6 font-header text-2xl 2xl:text-4xl font-semibold">
              {desc}
            </div>
          </div>
          <div className="content my-24">{children}</div>
        </div>
      </div>
    </>
  )
}

export default TimelineSections
