import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import List from "../components/blog-list"
import {
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap"
// import $ from 'jquery/dist/jquery.slim' // importing this worked like a charm
// import 'popper.js' // importing this worked like a charm as well

const BlogPage = ({ data, pageContext }) => {
  const { edges: posts } = data.allMarkdownRemark
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <Layout>
      <Container>
        <SEO title="Blog" />
        <div class="scroll-down text-uppercase position-fixed">
          <p style={{ letterSpacing: "0.5em", fontSize: "12px" }}>
            scroll down &gt;
          </p>
        </div>
        <h1
          className="blog"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
          style={{ color: "#132f3e80" }}
        >
          LATEST
          <br />
          POST
        </h1>
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
            date(formatString: "MMM YYYY DD")
            path
            tags
          }
        }
      }
    }
  }
`
