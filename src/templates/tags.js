import React from "react"
import PropTypes from "prop-types"


import Layout from "../components/layout"
import SEO from "../components/seo"
import ConcatWords from "../utils/ConcatWords"
// Components
import { Link, graphql } from "gatsby"
import { Container,Pagination, PaginationItem, PaginationLink,Col,Row } from "reactstrap"
const kebabCase = require(`lodash.kebabcase`)

const Tags = ({ pageContext, data }) => {
  const { currentPage, tag } = pageContext
  console.log(data)
  const { edges, totalCount } = data.allMarkdownRemark
  const isFirst = currentPage === 1
  const isLast = currentPage === totalCount
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout>
    <Container>
<SEO title="Blog" />
      <h3>{tagHeader}</h3>
      <div className="blog-posts">
        {edges
        .filter(({ node }) => node.frontmatter.title.length > 0)
        .map(({ node }) => {
          const {excerpt,id} = node
          const { title,path,date,tags } = node.frontmatter
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
        <Link to={`/tags/${tag}/`+prevPage} rel="prev">
          ← Previous Page
        </Link>
        </PaginationLink>
      </PaginationItem>
      )}
            {Array.from({ length: totalCount }, (_, i) => (
              <PaginationItem>
                  <PaginationLink>
                      <Link key={`pagination-number${i + 1}`} to={`/tags/${tag}/${i === 0 ? "" : i + 1}`}>
                        {i + 1}
                      </Link>
                  </PaginationLink>
              </PaginationItem>
      ))}
      {!isLast && (

        <PaginationItem>
            <PaginationLink next>
            <Link to={`/tags/${tag}/`+nextPage} rel="next">
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
            date(formatString: "MMMM DD, YYYY")
            path
            tags
          }
        }
      }
    }
  }
`