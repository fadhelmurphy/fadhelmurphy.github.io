import React,{useState} from "react"
import {Link }from 'gatsby'

const SearchTemplate = ({ data,pageContext }) => {
    let { edges: posts } = data.allMarkdownRemark
  console.log(data.allMarkdownRemark.edges)
  const { bookData } = pageContext
  const { allBooks, options } = bookData

  const [value, setValue] = useState('');

  const handleAddValue = (e) => {
    setValue(e.target.value);
  }
  var searchValue = value.trim().toLowerCase();

  if(searchValue.length > 0){
      var searchposts = posts.filter(l => {
        return l.node.frontmatter.title.toLowerCase().match( searchValue );
      });
  }
  return (
    <div>
      <h1 style={{ marginTop: `3em`, textAlign: `center` }}>
        Search data using JS Search using Gatsby Api
      </h1>
      <div>
      <input type="text" value={value} onChange={handleAddValue} placeholder="Type here" />
      <div className="blog-posts">
      {searchposts?
      (searchposts)
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
          const title = post.frontmatter.title || post.frontmatter.path
          return (
            <div className="blog-post-preview" key={post.id}>
              <h1>
                <Link to={post.frontmatter.path}>{title}</Link>
              </h1>
              <h6>{post.frontmatter.date}</h6>
              <p>{post.excerpt}</p>
              {post.frontmatter.tags?
              post.frontmatter.tags.map(tag=>
                {
                  return(<Link to={"/tags/"+tag.toLowerCase()}>
                    <h6>{tag}</h6>
                </Link>)
                }
              )
              :null
              }
            </div>
          )
        }):null
    }
    </div>
      </div>
    </div>
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
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }`