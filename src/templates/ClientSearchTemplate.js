import React, { useState } from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import {
  Container,
} from "reactstrap"
import List from "../components/blog-list"
import Menu from "../components/menu"

const SearchTemplate = ({ data }) => {
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
      <Menu />
      <Container>
        <h1 className="mt-0" style={{ border: "unset", fontSize: "6vw" }}>
          <input
            type="text"
            value={value}
            onChange={handleAddValue}
            placeholder="Type here"
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
                    <List data={{ title, path, date, tags, excerpt, id }} />
                  )
                })
            : null}
        </div>
      </Container>
    </>
  )
}

export default SearchTemplate

export const searchListQuery = graphql`
  query BlogQuery {
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
