import React from 'react'
import Wave from '@/Components/wave'
import BlogCard from '@/Components/blogCard'
import './blogList.css'

interface Props {
  page: Record<string, number[] | string[]>
}

function BlogList ({ page }: Props): JSX.Element {
  return (
        <>
        <Wave />
        <div className="bg-white">
                <div className='container mx-auto p-8 pb-0 md:px-0'><h2 className='custom-border-bottom text-2xl md:text-4xl'>All Articles</h2></div>
                <div className="h-80 items-start p-8 md:px-0 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">

                    {page.data.map((post: any) => <BlogCard
                        title={post.frontmatter.postTitle}
                        url={post?.url || ''}
                        label={post.frontmatter.label}
                        date={post.frontmatter.date}
                        customClassName='md:max-h-fit' />)}
                </div>
            </div></>
  )
}

export default BlogList
