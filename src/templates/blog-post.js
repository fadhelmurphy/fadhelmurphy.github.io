import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { Container } from "reactstrap"

// import '../css/blog-post.css';

export default function Template({ data }) {
  const { markdownRemark: post} = data
  return (
    <Layout postTitle={post.frontmatter.title} postDate={post.frontmatter.date}>
<Container>
    <SEO title={post.frontmatter.title} />
    <div className="blog-post-container">
      <div className="blog-post">
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
    </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`