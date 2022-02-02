import { graphql } from "gatsby"

import { Link, Row,Col,Container,ProjectPageHeader,Menu,FooterTemplate,SEO,React,ProjectSlider } from "../components/ProjectPage"

export default function ProjectPage ({ data, pageContext, location }) {
  const { edges: posts } = data.allMarkdownRemark
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  const contentProps = {
    posts,currentPage,numPages,isFirst,isLast,prevPage,nextPage
  }
  // console.log(currentPage)
  return (
    <>
    <SEO title="Project" />
    <Menu position="fixed-top" location={location} />
    <ProjectPageHeader/>
    <ProjectSlider/>
      <FooterTemplate/>
    </>
  )
}

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

export const projectListQuery = graphql`
  query projectListQuery($skip: Int!, $limit: Int!, $filter: String!) {
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
