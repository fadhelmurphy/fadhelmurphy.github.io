import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import About from "../components/aboutpage"
import SEO from "../components/seo"
// import $ from 'jquery/dist/jquery.slim' // importing this worked like a charm
// import 'popper.js' // importing this worked like a charm as well

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
<About/>
  </Layout>
)
export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }`