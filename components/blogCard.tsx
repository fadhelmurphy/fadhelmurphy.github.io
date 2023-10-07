import Badge from './badge'

interface IBlogCard {
  title: string
  date: string
  url: string
  customClassName?: false | string
  label?: string[]
}

const BlogCard = ({ title, date, url, label, customClassName }: IBlogCard): JSX.Element => {
  const className = `blog-card${customClassName ? ` ${customClassName}` : ''}`
  return (
      <div className='md:flex md:justify-center'>
        <a
          href={url}
          className={className}
          data-aos="fade-up" data-aos-duration="300"
        >
          <div className="head">
            {label?.map((item) => (<Badge className='text-xs md:text-sm !px-2.5 !py-0.5 md:!px-3 md:!py-1'>{item}</Badge>))}
            <div className="title">
              <h2>{title}</h2>
            </div>
            <div className="desc">
              <p>Published on {date}</p>
            </div>
          </div>
        </a>
      </div>
  )
}
export default BlogCard
