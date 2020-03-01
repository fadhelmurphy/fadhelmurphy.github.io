/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)
const kebabCase = require(`lodash.kebabcase`)
// require('jquery/dist/jquery.slim')
// require('popper')
// require('./src/components/core-ui/js/clean-blog')
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage} = actions

  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  const tagTemplate = path.resolve("src/templates/tags.js")
  const mainPostTemplate = path.resolve(`src/templates/blog.js`)

  const result = await graphql(`

  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 2000
    ) {
      edges {
        node {
          frontmatter {
            tags
            path
          }
        }
      }
    }
    tagsGroup: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // ...
  // Create blog-list pages
  const posts = result.data.allMarkdownRemark.edges
  const postsPerPage = 3
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
   
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: mainPostTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  
  result.data.allMarkdownRemark.edges.forEach(({ node },index,arr) => {

    const prev = arr[index - 1]
    const next = arr[index + 1]
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {
        prev: prev,
        next: next}, // additional data can be passed via context
    })

  })


  createPage({
    path: "/search",
    component: path.resolve(`./src/templates/ClientSearchTemplate.js`),
    context: {
      bookData: {
        allBooks: posts,
        options: {
          indexStrategy: "Prefix match",
          searchSanitizer: "Lower Case",
          TitleIndex: true,
          AuthorIndex: true,
          SearchByTerm: true,
        },
      },
    },
  })

  // const countCategories = categories.reduce((prev, curr) => {
  //   prev[curr] = (prev[curr] || 0) + 1
  //   return prev
  // }, {})

    // Extract tag data from query
    const tags = result.data.tagsGroup.group
    const tagPages = Math.ceil(tags.length / postsPerPage)
    tags.forEach((tag, i) => {
      const link = `/tags/${kebabCase(tag.fieldValue)}`
      Array.from({
        length: tagPages,
      }).forEach((_, i) => {
        createPage({
          path: i === 0 ? link : `${link}/${i + 1}`,
          component: tagTemplate,
          context: {
            alltags: tags,
            tag: tag.fieldValue,
            limit: 1,
            skip: i * 1,
            currentPage: i + 1,
          },
        })
      })
    })

    // Make tag pages
    // tags.forEach(tag => {
    //   const link = `/tags/${kebabCase(tag.fieldValue)}`
    //   createPage({
    //     path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
    //     component: tagTemplate,
    //     context: {
    //       tag: tag.fieldValue,
    //     },
    //   })
    // })
}
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `path`,
      node,
      value,
    })
  }
}