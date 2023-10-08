import { type HeaderProps } from './types'
import Bg from '@/Assets/img/blog/blog-bg.png'
import BgM from '@/Assets/img/blog/blog-bg-m.png'
import Navbar from 'Containers/navbar/navbar'
const BlogListHeader = ({ description, title, bgImg, bgImgM }: HeaderProps): JSX.Element => {
  const formattedHtml = { __html: description }
  const headerTitle = { __html: title }
  return (
    <>
        <Navbar />
        <div className="h-[50vh] md:h-[60vh] flex flex-col justify-end md:justify-end inner container md:mx-auto text-left md:text-center">
          <h1 data-aos="animation-scale-y" data-aos-duration="500"
          className="title text-5xl md:text-8xl md:leading-none font-semibold font-header mt-4"
          dangerouslySetInnerHTML={headerTitle as { __html: string }}
          />
          <p data-aos="fade-up" data-aos-duration="300"
            className="md:mx-auto md:w-7/12 mt-8 text-[#617FAD] md:text-center text-md md:text-2xl not-italic font-medium leading-6 md:justify-center"
            dangerouslySetInnerHTML={formattedHtml as { __html: string }}
          />
        </div>

      <style>
        {`
    body {
      background-size: 100%;
      background-image: url(${bgImgM ?? BgM?.src});
    }

    @media (min-width: 768px) {
      body {
        background-size: 100%;
        background-image: url(${bgImg ?? Bg?.src});
      }
    }
        `}
      </style>
    </>
  )
}
export default BlogListHeader
