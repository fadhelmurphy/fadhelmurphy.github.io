import React from "react"


import Layout from "../components/layout"
import SEO from "../components/seo"
import List from "../components/blog-list"
// Components
import { Link, graphql } from "gatsby"
import { Container,Pagination, PaginationItem, PaginationLink } from "reactstrap"

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
      <h3>{tagHeader}</h3>
      <div className="blog-posts">
        {edges
        .filter(({ node }) => node.frontmatter.title.length > 0)
        .map(({ node }) => {
          const {excerpt,id} = node
          const { title,path,date,tags } = node.frontmatter
          return (
            <List data={{ title, path, date, tags, excerpt, id }}></List>
          )
        })}
      </div>
      <Pagination aria-label="Page navigation example">
    {!isFirst && (
      <PaginationItem>
        <PaginationLink previous>
        <Link to={`/tags/${tag.toLowerCase()}/`+prevPage} rel="prev">
          ← Previous Page
        </Link>
        </PaginationLink>
      </PaginationItem>
      )}
            {Array.from({ length: tagPages }, (_, i) => (
              <PaginationItem>
                  <PaginationLink>
                      <Link key={`pagination-number${i + 1}`} to={`/tags/${tag.toLowerCase()}/${i === 0 ? "" : i + 1}`}>
                        {i + 1}
                      </Link>
                  </PaginationLink>
              </PaginationItem>
      ))}
      {!isLast && (

        <PaginationItem>
            <PaginationLink next>
            <Link to={`/tags/${tag.toLowerCase()}/`+nextPage} rel="next">
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