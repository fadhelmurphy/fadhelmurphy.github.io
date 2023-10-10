import { type HeaderProps } from './types'
import BlogImg from '@/Assets/img/blog/blog-bg.png'
import BlogImgM from '@/Assets/img/blog/blog-bg-m.png'
import Badge from '../badge'

const BlogHeader = ({ label = [], postTitle, date, bgImg, bgImgM }: HeaderProps): JSX.Element => {
  return (
    <>
      <div className="h-screen md:h-screen mb-6 md:mb-24 px-8 md:px-0 flex flex-col justify-center container md:mx-auto">
        <div className="inner text-left md:w-[49.375rem]">
          <h1 data-aos="animation-scale-y" data-aos-duration="500" className="title text-[40px] md:text-[72px] leading-[40px] md:leading-[78px] font-semibold font-header my-8 md:my-14">
            {postTitle}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className='column'>
            <h2 className='text-teal-500 text-md md:text-[1.5rem] font-normal leading-[normal]'>Date</h2>
          <p className='text-[#617FAD] text-sm md:text-[1.3rem] not-italic font-light leading-[normal] mt-[0.5rem] md:mt-[1rem]'>{date}</p>
            </div>
            <div className='column mt-[2rem] md:mt-0'>
            <h2 className='text-teal-500 text-md md:text-[1.5rem] font-normal leading-[normal] mb-[1rem] md:mb-[1rem]'>Tags</h2>
            <div className='label'>
          {label.length && label?.map((item, idx: number) => (
            <Badge key={String(idx)} className="drop-shadow-2xl backdrop-blur-md bg-white/80 !mr-6">
            <a href={`/blog/tags/${item}`}>
              {item}
            </a>
            </Badge>
          ))}
            </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
    
    body {
      background-image: url(${bgImgM ?? BlogImgM.src});
    }

    @media (min-width: 768px) {
      body {
        background-image: url(${bgImg ?? BlogImg.src});
      }
    }
        `}
      </style>
    </>
  )
}
export default BlogHeader
