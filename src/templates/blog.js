import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import List from "../components/blog/blog-list"
import {
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Col,
} from "reactstrap"
// import $ from 'jquery/dist/jquery.slim' // importing this worked like a charm
// import 'popper.js' // importing this worked like a charm as well

const BlogPage = ({ data, pageContext, location }) => {
  const { edges: posts } = data.allMarkdownRemark
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  // console.log(currentPage)
  return (
    <Layout location={location}>
      <Container>
        <SEO title="Blog" />
        <div class="scroll-down text-uppercase position-fixed">
          <p style={{ letterSpacing: "0.5em", fontSize: "12px" }}>
            scroll down →
          </p>
        </div>
        <h2
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-once="true"
          className="custom-border-bottom"
          style={{ fontWeight: 600 }}
        >
          Latest
          <br />
          Post
        </h2>
        <div className="blog-posts mt-5">
          {posts
            .filter(post => post.node.frontmatter.title.length > 0)
            .map(({ node: post }) => {
              const { excerpt, id } = post
              const { title, path, date, tags } = post.frontmatter
              return (
                <List data={{ title, path, date, tags, excerpt, id }}></List>
              )
            })}
        </div>
      </Container>

      <Container>
      <Row>
        <Col
          xs="12"
          md="6"
          className="d-flex align-items-center font-weight-bold justify-content-center justify-content-md-start my-3"
        >
          {Array.from({ length: numPages }, (_, i) =>
            i + 1 === currentPage ? (
              <>
                <Link
                  style={{
                    margin: "0 10px",
                  }}
                  key={`pagination-number${i + 1}`}
                  to={`/blog/${i === 0 ? "" : i + 1}`}
                >
                  {i + 1}
                </Link>

                <span
                  style={{
                    width: "96px",
                    borderBottom: "2px solid #354f52",
                  }}
                ></span>
              </>
            ) : (
              <Link
                style={{
                  color: "#aaa",
                  margin: "0 10px",
                }}
                key={`pagination-number${i + 1}`}
                to={`/blog/${i === 0 ? "" : i + 1}`}
              >
                {i + 1}
              </Link>
            )
          )}
        </Col>
        <Col
          xs="12"
          md="6"
          className="align-items-center text-center text-md-right my-3"
        >
          {!isFirst && (
            <Link
              style={{
                margin: "0 10px",
              }}
              to={"/blog/" + prevPage}
              rel="prev"
            >
              ← Previous
            </Link>
          )}
          {!isLast && (
            <Link
              style={{
                margin: "0 10px",
              }}
              to={"/blog/" + nextPage}
              rel="next"
            >
              Next →
            </Link>
          )}
        </Col>
      </Row>
      </Container>
    </Layout>
  )
}
export default BlogPage

// export const pageQuery = graphql`
//   query BlogQuery {
//     allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
//       edges {
//         node {
//           excerpt(pruneLength: 250)
//           id
//           frontmatter {
//             title
//             date(formatString: "MMMM DD, YYYY")
//             path
//           }
//         }
//       }
//     }
//   }`

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!, $filter: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { fileAbsolutePath: { regex: $filter } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
            path
            tags
          }
        }
      }
    }
  }
`
