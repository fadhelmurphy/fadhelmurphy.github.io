import React from 'react'
import { timelineData } from 'Consts/timeline'
import {
  type TimelineDataArrayType,
  type TimelineDataType
} from 'Consts/types/timeline.type'

const DefaultTimeline = ({
  data = timelineData
}: {
  data: TimelineDataType[]
}): JSX.Element => {
  return (
    <ol className="relative my-12">
      {data.map((item: TimelineDataType) => {
        return (
          <li>
            <h3 data-aos="animation-scale-y" data-aos-duration="500" className="mb-1 mb-6 flex items-center text-2xl md:text-4xl 2xl:text-6xl font-semibold md:w-[75%]">
              {item.company}
              {item.isLatest
                ? (
                <span className="mr-2 ml-3 rounded bg-sky-100 px-3.5 py-1.5 text-sm font-medium text-blue-500">
                  Latest
                </span>
                  )
                : null}
            </h3>

            {item.data.map((job: TimelineDataArrayType) => {
              return (
                <>
                  {job.jobtitle && (
                    <time data-aos="animation-scale-y" data-aos-duration="500" className="mb-2 block font-semibold leading-6 text-2xl">
                      {job.jobtitle}
                    </time>
                  )}
                  {job.time && (
                    <time data-aos="fade-up" data-aos-duration="500" className="mb-2 block font-normal leading-6 text-base-2">
                      {job.time}
                    </time>
                  )}
                  {job.description && (
                    <p data-aos="fade-up" data-aos-duration="500"
                      className="font-normal text-base-2 py-5"
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                  )}
                  <br />
                </>
              )
            })}
          </li>
        )
      })}
    </ol>
  )
}
export default React.memo(DefaultTimeline)
