import React from 'react'
import { timelineData } from 'Consts/timeline'
import {
  type TimelineDataArrayType,
  type TimelineDataType
} from 'Consts/types/timeline.type'
import Badge from '../badge'

const DefaultTimeline = ({
  data = timelineData
}: {
  data: TimelineDataType[]
}): JSX.Element => {
  return (
    <ol className="relative my-12 mx-10 text-ellipsis md:mx-0">
      {data.map((item: TimelineDataType) => {
        return (
          <>
          <div className="mb-10 grid grid-cols-1 md:grid-cols-2" key={item.company}>

            <h3 data-aos="animation-scale-y" data-aos-duration="400" className="flex items-center pr-0 md:pr-8 text-2xl md:text-4xl 2xl:text-6xl font-semibold">
              {item.company}
              {item.isLatest
                ? (
                <Badge className='bg-sky-100 text-blue-500 mx-3'>
                  Latest
                </Badge>
                  )
                : null}
            </h3>
            </div>
          <div className="mb-10 grid grid-cols-1 md:grid-cols-2" key={item.company}>

            {item.data.map((job: TimelineDataArrayType) => {
              return (
                <>
            <div className='job-desc-1 py-5'>
                  {job.jobtitle && (
                    <time data-aos="fade-up" data-aos-duration="200" className="mb-2 block font-normal leading-6">
                      {job.jobtitle}
                    </time>
                  )}
                  {job.time && (
                    <time data-aos="fade-up" data-aos-duration="200" className="mb-2 block font-normal leading-6 text-base-2">
                      {job.time}
                    </time>
                  )}
            </div>

            <div className='job-desc-2'>

                  {job.description && (
                    <p data-aos="fade-up" data-aos-duration="200"
                      className="font-normal text-base-2 py-5"
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                  )}
              </div>

                </>
              )
            })}
          </div>
          </>
        )
      })}
    </ol>
  )
}
export default React.memo(DefaultTimeline)
