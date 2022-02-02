import { graphql } from "gatsby"

import { Link,Row,Col,ProjectDetailHeader,ProjectDetailContent,Menu,FooterTemplate,SEO,React } from "../components/ProjectPage/Detail"

// import '../css/blog-post.css';

export default function Template({ pageContext, data }) {
  const { markdownRemark: post } = data
  const { prev, next } = pageContext
  const postInfo={
    postTitle: post.frontmatter.title,
    postDate: post.frontmatter.date,
  }
  const contentProps = {
    post,prev,next
  }
  return (
    <>
    <SEO title={post.frontmatter.title} />
    <Menu position="fixed-top"/>
    <ProjectDetailHeader {...postInfo}/>
    <ProjectDetailContent {...contentProps}/>
        <FooterTemplate/>
    </>
  )
}

export const pageQuery = graphql`
  query ProjectPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
      }
    }
  }
`
