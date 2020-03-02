import React from "react"
import { Link,graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Col,Row,Container } from "reactstrap"

// import '../css/blog-post.css';

export default function Template({ pageContext,data }) {
  const { markdownRemark: post} = data
  const { prev, next } = pageContext
  return (
    <Layout postInfo={{
      postTitle:post.frontmatter.title,
      postDate:post.frontmatter.date
      }}>
<Container>
    <SEO title={post.frontmatter.title} />
    <div className="blog-post-container">
      <div className="blog-post">
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    <Row style={{
                display:'inline-flex',textAlign:'right'
                }}>
          {prev && (
            <Col md>
              <Link to={prev.node.frontmatter.path}>
                    <h2>{"< "} {prev.node.frontmatter.title}</h2>
              </Link>
            </Col>
          )}

          {next && (
            <Col md>
              <Link to={next.node.frontmatter.path}>
                    <h2>{next.node.frontmatter.title} {" >"}</h2>
              </Link>
            </Col>
          )}
        </Row>
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