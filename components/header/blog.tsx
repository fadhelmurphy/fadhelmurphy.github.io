import { type HeaderProps } from './types'

const BlogHeader = ({ label = [], postTitle, date }: HeaderProps): JSX.Element => {
  return (
    <>
      <div className="h-screen md:h-screen mb-6 md:mb-24 px-8 md:px-0 flex flex-col justify-center">
        <div className="inner container md:mx-auto text-left">
          {label.length && label?.map((item) => (

<span data-aos="fade-up" data-aos-duration="900" className="mr-[16px] rounded bg-[rgba(224,242,254,0.50)] px-3.5 py-1.5 text-sm font-medium text-blue-500">
{item}
      </span>
          ))}
          <h1 data-aos="animation-scale-y" data-aos-duration="500" className="title text-[40px] md:text-[72px] leading-[40px] md:leading-[72px] my-[12px] font-semibold font-header mt-4">
            {postTitle}
          </h1>
          <p data-aos="fade-up" data-aos-duration="900" className='text-[#617FAD] not-italic font-semibold leading-[normal] my-[12px]'>{`Published on ${date}`}</p>
        </div>
      </div>
      <style>
        {`
    
    body {
      background-image: url(/blog/blog-bg-m.png);
    }

    @media (min-width: 768px) {
      body {
        background-image: url(/blog/blog-bg.png);
      }
    }
        `}
      </style>
    </>
  )
}
export default BlogHeader
