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
    <ol className="relative my-12 md:me-12">
      {data.map((item: TimelineDataType) => {
        return (
          <li className='base-card p-6 md:p-12 mb-12' data-aos="fade-up" data-aos-duration="500">
            <div className='education-detail' style={{
              placeContent: 'flex-start',
              alignItems: 'flex-start',
              display: 'flex',
              flex: '0 0 auto',
              flexFlow: 'column',
              gap: '4px',
              height: 'min-content',
              overflow: 'visible',
              padding: '0px',
              position: 'relative',
              width: '100%'
            }}>
              <h3 data-aos="animation-scale-y" data-aos-duration="700"
                className="flex items-center mb-3 text-2xl md:text-4xl !font-semibold">
                {item.company}
              </h3>

              {item.isLatest
                ? (
                  <Badge className='text-lg mb-6 me-3'>
                    Latest
                  </Badge>
                  )
                : null}

              {item.data.map((job: TimelineDataArrayType) => {
                return (
                  <>
                    {job.jobtitle && (
                      <time data-aos="animation-scale-y" data-aos-duration="700" className="mb-2 block font-normal leading-6 text-xl">
                        {job.jobtitle}
                      </time>
                    )}
                    {job.time && (
                      <time data-aos="fade-up" data-aos-duration="700" className="mb-2 block font-normal leading-6 text-base-2">
                        {job.time}
                      </time>
                    )}
                    {job.description && (
                      <p data-aos="fade-up" data-aos-duration="700"
                        className="font-normal text-base-2 py-5"
                        dangerouslySetInnerHTML={{ __html: job.description }}
                      />
                    )}
                    <br />
                  </>
                )
              })}

            </div>
          </li>
        )
      })}
    </ol>
  )
}
export default React.memo(DefaultTimeline)
