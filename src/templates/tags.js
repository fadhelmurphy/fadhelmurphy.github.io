
// Components
import { graphql } from "gatsby"

import { Link, SEO,Container,Row,Col,BlogList,BlogPageHeader,Menu,FooterTemplate,React } from "../components/Blog"

const Tags = ({ pageContext, data }) => {
  const { currentPage, tag, tagPages } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const isFirst = currentPage === 1
  const isLast = currentPage === tagPages
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <>
    <Menu position="fixed-top"/>
    <BlogPageHeader/>
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
                <BlogList data={{ title, path, date, tags, excerpt, id }}></BlogList>
              )
            })}
        </div>
        
        <Row>
        <Col
          xs="12"
          md="6"
          className="d-flex align-items-center font-weight-bold justify-content-center justify-content-md-start my-3"
        >
          {Array.from({ length: tagPages }, (_, i) =>
            i + 1 === currentPage ? (
              <>
                <Link
                  style={{
                    margin: "0 10px",
                  }}
                  key={`pagination-number${i + 1}`}
                  to={`/blog/tags/${tag.toLowerCase()}/${i === 0 ? "" : i + 1}`}
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
                to={`/blog/tags/${tag.toLowerCase()}/${i === 0 ? "" : i + 1}`}
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
                  to={`/blog/tags/${tag.toLowerCase()}/` + prevPage}
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
                  to={`/blog/tags/${tag.toLowerCase()}/` + nextPage}
                  rel="next"
            >
              Next →
            </Link>
          )}
        </Col>
        </Row>
      </Container>
    <FooterTemplate/>
    </>
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
