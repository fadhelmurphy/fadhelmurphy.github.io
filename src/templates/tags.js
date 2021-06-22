import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import List from "../components/blog/blog-list"
// Components
import { Link, graphql } from "gatsby"
import {
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap"

const Tags = ({ pageContext, data }) => {
  const { currentPage, tag, tagPages } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const isFirst = currentPage === 1
  const isLast = currentPage === tagPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout>
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
        <h4>{tagHeader}</h4>
        <div className="blog-posts mt-5">
          {edges
            .filter(({ node }) => node.frontmatter.title.length > 0)
            .map(({ node }) => {
              const { excerpt, id } = node
              const { title, path, date, tags } = node.frontmatter
              return (
                <List data={{ title, path, date, tags, excerpt, id }}></List>
              )
            })}
        </div>
        <Pagination aria-label="Page navigation example">
          {!isFirst && (
            <PaginationItem>
              <PaginationLink previous>
                <Link to={`/blog/tags/${tag.toLowerCase()}/` + prevPage} rel="prev">
                  ← Previous Page
                </Link>
              </PaginationLink>
            </PaginationItem>
          )}
          {Array.from({ length: tagPages }, (_, i) => (
            <PaginationItem>
              <PaginationLink>
                <Link
                  key={`pagination-number${i + 1}`}
                  to={`/blog/tags/${tag.toLowerCase()}/${i === 0 ? "" : i + 1}`}
                >
                  {i + 1}
                </Link>
              </PaginationLink>
            </PaginationItem>
          ))}
          {!isLast && (
            <PaginationItem>
              <PaginationLink next>
                <Link to={`/blog/tags/${tag.toLowerCase()}/` + nextPage} rel="next">
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

export default Tags

export const pageQuery = graphql`
  query($tag: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
      limit: $limit
      skip: $skip
    ) {
      totalCount
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
