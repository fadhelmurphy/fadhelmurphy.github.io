import { type HeaderProps } from './types'
import BlogImg from '@/Assets/img/blog/blog-bg.png'
import BlogImgM from '@/Assets/img/blog/blog-bg-m.png'
import Badge from '../badge'

const BlogHeader = ({ label = [], postTitle, date, bgImg, bgImgM }: HeaderProps): JSX.Element => {
  return (
    <>
      <div className="h-screen md:h-screen mb-6 md:mb-24 px-8 md:px-0 flex flex-col justify-center container md:mx-auto">
        <div className="inner text-left md:w-[49.375rem]">
          {label.length && label?.map((item, idx: number) => (
            <Badge key={String(idx)} className="drop-shadow-2xl backdrop-blur-md bg-white/80">
            <a href={`/blog/tags/${item}`}>
              {item}
            </a>
            </Badge>
          ))}
          <h1 data-aos="animation-scale-y" data-aos-duration="500" className="title text-[40px] md:text-[72px] leading-[40px] md:leading-[78px] my-[12px] font-semibold font-header mt-5">
            {postTitle}
          </h1>
          <p className='text-[#617FAD] not-italic font-semibold leading-[normal] my-[2rem]'>{`Published on ${date}`}</p>
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
