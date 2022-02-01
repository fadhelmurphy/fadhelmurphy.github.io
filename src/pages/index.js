import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container, Row, Col } from "reactstrap"
import Image from "../components/image"
import CustomCursorManager from "../components/CustomCursor/context/manager"
import CustomCursor from "../components/CustomCursor";
import { WebList, LogoSection, DesignSection,Menu,HomePageHeader,HomePageFooter,ProjectSlider } from "../components/HomePage"

const IndexPage = ({ location }) => (
  <>
    <SEO title="Home" />
    <Menu position="fixed-top" location={location}/>
    <HomePageHeader/>
    <WebList/>
    {/* <ProjectSlider/> */}
    <LogoSection/>
    <DesignSection/>
    <HomePageFooter/>
  </>
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
            date(formatString: "DD MM YYYY")
            path
          }
        }
      }
    }
  }
`
