import React from "react";
import {timelineData} from "Consts/timeline"
import {TimelineDataArrayType, TimelineDataType} from "Consts/types/timeline.type"

const TimeLine = () => {
  return (
    <ol className="relative my-12 mx-5 border-l border-blue-400">
      {timelineData.map((item: TimelineDataType) => {
        return (
          <li className="mb-10 ml-10">
            <span className="absolute -left-4 mt-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 ring-8 ring-white ring-blue-100">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="mb-1 mb-6 flex items-center text-6xl font-semibold">
              {item.company}
              {item.isLatest ? (
                <span className="mr-2 ml-3 rounded bg-sky-100 px-3.5 py-1.5 text-sm font-medium text-blue-500">
                  Latest
                </span>
              ) : null}
            </h3>

            {item.data.map((job: TimelineDataArrayType) => {
              return (
                <>
                  <time className="mb-2 block font-normal leading-6">
                    {job.jobtitle}
                  </time>
                  <time className="mb-2 block font-normal leading-6 text-base-2">
                    {job.time}
                  </time>
                  <p
                    className="font-normal text-base-2 py-5"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />
                  <br />
                </>
              );
            })}
          </li>
        );
      })}
    </ol>
  );
};
export default React.memo(TimeLine);
