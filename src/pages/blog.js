import React from "react"
import { Link,graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { Container } from "reactstrap"
// import $ from 'jquery/dist/jquery.slim' // importing this worked like a charm
// import 'popper.js' // importing this worked like a charm as well

const BlogPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark
return(
  <Layout>
            <Container>
    <SEO title="Blog" />
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div> */}
        <div className="blog-posts">
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
          return (
            <div className="blog-post-preview" key={post.id}>
              <h1>
                <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
              </h1>
              <h6>{post.frontmatter.date}</h6>
              <p>{post.excerpt}</p>
            </div>
          )
        })}
    </div></Container>
  </Layout>
)
}
export default BlogPage

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }`