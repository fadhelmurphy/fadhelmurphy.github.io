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
    <div className="relative my-12 mx-8 md:mx-0 text-ellipsis">
      {data.map((item: TimelineDataType) => {
        return (
          <>
            <div data-aos="fade-up" data-aos-duration="300" className='job-desc-card p-5 md:p-10 border border-solid border-[var(--border)] mb-10 rounded-2xl shadow-[rgba(59,130,246,0.1)_0px_20px_25px_-5px,rgba(59,130,246,0.04)_0px_10px_10px_-5px] backdrop-blur-md bg-white/70 md:bg-white/25' key={item.company}>
              <div className="mb-0 md:mb-10 grid grid-cols-1 md:grid-cols-2" key={item.company}>

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
              <div className="grid grid-cols-1 md:grid-cols-2" key={item.company}>

                {item.data.map((job: TimelineDataArrayType) => {
                  return (
                    <>
                      <div className='job-desc-1 py-5'>
                        {job.jobtitle && (
                          <time className="mb-2 block font-normal leading-6 bg-gradient-to-r from-teal-500 from-10% to-[rgba(96,165,250,1)] to-30% text-transparent bg-clip-text">
                            {job.jobtitle}
                          </time>
                        )}
                        {job.time && (
                          <time className="mb-2 block font-normal leading-6 text-base-2">
                            {job.time}
                          </time>
                        )}
                      </div>

                      <div className='job-desc-2'>

                        {job.description && (
                          <p
                            className="font-normal text-base-2 py-5"
                            dangerouslySetInnerHTML={{ __html: job.description }}
                          />
                        )}
                      </div>

                    </>
                  )
                })}
              </div>
            </div>
          </>
        )
      })}
    </div>
  )
}
export default React.memo(DefaultTimeline)
