import React from "react"
import Img from "gatsby-image"
// import { useStaticQuery, graphql } from "gatsby"
import { StaticQuery, graphql } from "gatsby"
/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

// Note: You can change "images" to whatever you'd like.

const Image = props => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              prettySize
              publicURL
              childImageSharp {
                fluid(maxWidth: 600, toFormat: WEBP, webpQuality: 40) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }      
    `}
    render={data => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(props.filename)
      })
      if (!image) {
        return null
      }

      //const imageSizes = image.node.childImageSharp.sizes; sizes={imageSizes}
      return (
        <Img
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
          fluid={image.node.childImageSharp.fluid}
        />
      )
    }}
  />
)

// const Image = (path) => {
//   const data = useStaticQuery(graphql`
//     query($path: String!) {
//       placeholderImage: file(relativePath: { eq: $path }) {
//         childImageSharp {
//           fluid(maxWidth: 300) {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//     }
//   `)

//   return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
// }

export default Image
