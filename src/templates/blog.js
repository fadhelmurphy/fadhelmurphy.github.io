import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import ConcatWords from "../utils/ConcatWords"
import { Col, Row } from "reactstrap"
import {
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap"
const kebabCase = require(`lodash.kebabcase`)
// import $ from 'jquery/dist/jquery.slim' // importing this worked like a charm
// import 'popper.js' // importing this worked like a charm as well

const BlogPage = ({ data, pageContext }) => {
  const { edges: posts } = data.allMarkdownRemark
  console.log(data.allMarkdownRemark.edges)
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
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
              const { excerpt, id } = post
              const { title, path, date, tags } = post.frontmatter
              return (
                <div className="blog-post-preview" key={id}>
                  <h1>
                    <Link to={path}>{title}</Link>
                  </h1>
                  <h6>
                    <Row>
                      <Col md="auto">{date}</Col>
                      <Col md="auto">
                        <Row className="blog-post-category">
                          {tags
                            ? tags.map((tag, index, arr) => {
                                return (
                                  <ConcatWords
                                    arrCount={arr.length}
                                    index={index}
                                    key={tag}
                                  >
                                    <Link to={`/tags/${kebabCase(tag)}`}>
                                      {tag}
                                    </Link>
                                  </ConcatWords>
                                )
                              })
                            : null}
                        </Row>
                      </Col>
                    </Row>
                  </h6>
                  <p>{excerpt}</p>
                </div>
              )
            })}
        </div>
        <Pagination aria-label="Page navigation example">
          {!isFirst && (
            <PaginationItem>
              <PaginationLink previous>
                <Link to={"/blog/" + prevPage} rel="prev">
                  ← Previous Page
                </Link>
              </PaginationLink>
            </PaginationItem>
          )}
          {Array.from({ length: numPages }, (_, i) => (
            <PaginationItem>
              <PaginationLink>
                <Link
                  key={`pagination-number${i + 1}`}
                  to={`/blog/${i === 0 ? "" : i + 1}`}
                >
                  {i + 1}
                </Link>
              </PaginationLink>
            </PaginationItem>
          ))}
          {!isLast && (
            <PaginationItem>
              <PaginationLink next>
                <Link to={"/blog/" + nextPage} rel="next">
                  Next Page →
                </Link>
              </PaginationLink>
            </PaginationItem>
          )}
        </Pagination>
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
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
          }
        }
      }
    }
  }
`
