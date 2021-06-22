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
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blog-detail.js`)
  const tagTemplate = path.resolve("src/templates/tags.js")
  const mainPostTemplate = path.resolve(`src/templates/blog.js`)
  const query = `
  query blog($postpath:String!) {
     allMarkdownRemark(
       sort: { order: DESC, fields: [frontmatter___date] }
       limit: 2000
       filter: {fileAbsolutePath: {regex: $postpath  }}
     ) {
       edges {
         node {
           frontmatter {
             tags
             path
             title
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
 `

  //-Blog
  var blogParams = { postpath: "/(post)/" }
  const blogResult = await graphql(query, blogParams)
  if (blogResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // ...
  // Create blog-list pages
  const posts = await blogResult.data.allMarkdownRemark.edges
  const postsPerPage = 3
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((post, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: mainPostTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        filter: blogParams.postpath,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  await blogResult.data.allMarkdownRemark.edges.forEach(
    ({ node }, index, arr) => {
      const prev = arr[index - 1]
      const next = arr[index + 1]
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {
          prev: prev,
          next: next,
        }, // additional data can be passed via context
      })
    }
  )
  // Extract tag data from query
  const tags = await blogResult.data.tagsGroup.group
  const tagPages = Math.ceil(tags.length / postsPerPage)
  tags.forEach((tag, i) => {
    const link = `/blog/tags/${kebabCase(tag.fieldValue.toLowerCase())}`
    Array.from({
      length: tagPages,
    }).forEach((_, i) => {
      createPage({
        path: i === 0 ? link : `${link}/${i + 1}`,
        component: tagTemplate,
        context: {
          alltags: tags,
          tag: tag.fieldValue,
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i + 1,
          tagPages,
        },
      })
    })
  })

  //-Project

  var projectParams = { postpath: "/(projects)/" }
  const projectResult = await graphql(query, projectParams)
  if (projectResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // ...
  // Create project-list pages
  const projects = await projectResult.data.allMarkdownRemark.edges
  const projectsPerPage = 3
  const numProjectPages = Math.ceil(projects.length / projectsPerPage)

  Array.from({ length: numPages }).forEach((post, i) => {
    createPage({
      path: i === 0 ? `/project` : `/project/${i + 1}`,
      component: mainPostTemplate,
      context: {
        limit: projectsPerPage,
        skip: i * projectsPerPage,
        filter: projectParams.postpath,
        numPages: numProjectPages,
        currentPage: i + 1,
      },
    })
  })

  await projectResult.data.allMarkdownRemark.edges.forEach(
    ({ node }, index, arr) => {
      console.log(node.frontmatter.path, " Project")
      const prev = arr[index - 1]
      const next = arr[index + 1]
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {
          prev: prev,
          next: next,
        }, // additional data can be passed via context
      })
    }
  )
  // Extract tag data from query
  const projectTags = await projectResult.data.tagsGroup.group
  const projectTagPages = Math.ceil(projectTags.length / projectsPerPage)
  tags.forEach((tag, i) => {
    const link = `/project/tags/${kebabCase(tag.fieldValue.toLowerCase())}`
    Array.from({
      length: projectTagPages,
    }).forEach((_, i) => {
      createPage({
        path: i === 0 ? link : `${link}/${i + 1}`,
        component: tagTemplate,
        context: {
          alltags: tags,
          tag: tag.fieldValue,
          limit: projectsPerPage,
          skip: i * projectsPerPage,
          currentPage: i + 1,
          tagPages: projectTagPages,
        },
      })
    })
  })

  createPage({
    path: "/search",
    component: path.resolve(`./src/templates/search.js`),
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
