
import { graphql } from "gatsby"

import { Container,BlogList,SEO,Link,Menu,React } from "../components/Blog"
const {useState} = React
const Search = ({ data, location }) => {
  let { edges: posts } = data.allMarkdownRemark

  const [value, setValue] = useState("")

  const handleAddValue = e => {
    setValue(e.target.value)
  }
  var searchValue = value.trim().toLowerCase()

  if (searchValue.length > 0) {
    var searchposts = posts.filter(l => {
      return (
        l.node.frontmatter.title.toLowerCase().match(searchValue) ||
        l.node.html.toLowerCase().match(searchValue)
      )
    })
  }
  return (
    <>
      <SEO title={value || "Search Page"} />
      <Menu location={location} />
      <Container className="overflow-hidden">
        <h1 className="my-5 py-5 py-md-0 my-md-0">
          <textarea
            type="text"
            value={value}
            onChange={handleAddValue}
            placeholder="Type here"
            style={{
              width: "100%",
              border: "unset",
              color: "#354f52",
              borderBottom: "1px solid #354f52",
              minHeight: "60px",
              boxShadow: "none",
              outline: "none",
              borderRadius: 0,
            }}
            autoFocus
          />
        </h1>
        <div className="blog-posts">
          {searchposts
            ? searchposts
                .filter(post => post.node.frontmatter.title.length > 0)
                .map(({ node: post }) => {
                  const { excerpt, id } = post
                  const { title, path, date, tags } = post.frontmatter
                  return (
                    <BlogList data={{ title, path, date, tags, excerpt, id }} />
                  )
                })
            : null}
        </div>
      </Container>
    </>
  )
}

export default Search

export const searchListQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          html
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
