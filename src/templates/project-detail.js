import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Col, Row } from "reactstrap"

// import '../css/blog-post.css';

export default function Template({ pageContext, data }) {
  const { markdownRemark: post } = data
  const { prev, next } = pageContext
  return (
    <Layout
      postInfo={{
        postTitle: post.frontmatter.title,
        postDate: post.frontmatter.tags,
      }}
      project={true}
    >
      <div class="scroll-down text-uppercase position-fixed">
        <p style={{ letterSpacing: "0.5em", fontSize: "12px" }}>
          scroll down →
        </p>
      </div>
      <SEO title={post.frontmatter.title} />
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <Row>
          {next && (
            <Col className="text-uppercase font-weight-bold text-left">
              <Link to={next.node.frontmatter.path}>
                <Row>
                  <Col>
                    <h4 style={{ fontWeight: "800" }}>
                      {next.node.frontmatter.title}
                    </h4>
                    <h6 style={{ color: "#132f3e80" }}>PREVIOUS POST</h6>
                  </Col>
                </Row>
              </Link>
            </Col>
          )}

          {prev && (
            <Col className="text-uppercase font-weight-bold text-right">
              <Link to={prev.node.frontmatter.path}>
                <Row>
                  <Col>
                    <h4 style={{ fontWeight: "800" }}>
                      {prev.node.frontmatter.title}
                    </h4>
                    <h6 style={{ color: "#132f3e80" }}>NEXT POST</h6>
                  </Col>
                </Row>
              </Link>
            </Col>
          )}
        </Row>
    </Layout>
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
