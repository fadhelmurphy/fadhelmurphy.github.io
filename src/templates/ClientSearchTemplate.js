import React,{useState} from "react"
import {graphql,Link }from 'gatsby'
import SEO from "../components/seo"
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from "reactstrap"
import List from "../components/blog-list"

const SearchTemplate = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false),toggle = () => setIsOpen(!isOpen);
    let { edges: posts } = data.allMarkdownRemark

  const [value, setValue] = useState('');

  const handleAddValue = (e) => {
    setValue(e.target.value);
  }
  var searchValue = value.trim().toLowerCase();

  if(searchValue.length > 0){
      var searchposts = posts.filter(l => {
        return l.node.frontmatter.title.toLowerCase().match( searchValue ) || l.node.html.toLowerCase().match(searchValue);
      });
  }
  return (
    <>
    <SEO title={value || "Search Page"} />
    
    <Navbar className="container navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <NavbarToggler className="text-muted" onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto"navbar>
            <NavItem>
              <Link className="nav-link text-muted font-weight-bold" to="/">Home</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link text-muted font-weight-bold" to="/blog">Blog</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link text-muted font-weight-bold" to="/search">Search</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Container>
      <h1 className="display-1" style={{ marginTop: `2em`, border:'unset'}}>
        <input type="text" value={value} onChange={handleAddValue} placeholder="Type here" autoFocus />
      </h1>
      <div className="blog-posts">
      {searchposts?
      (searchposts)
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
          const { excerpt, id } = post
          const { title, path, date, tags } = post.frontmatter
          return (
              <List data={{ title, path, date, tags, excerpt, id }}/>
          )
        }):null
    }
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
            date(formatString: "MMMM DD, YYYY")
            path
            tags
          }
        }
      }
    }
  }`