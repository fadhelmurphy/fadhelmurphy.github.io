import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useRef, useEffect,useState } from "react"
import Image from "../images/home-bg.jpg"
import { Helmet } from "react-helmet"
import { TimelineLite,Power4,gsap,CSSRulePlugin } from "gsap/all"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
const Header = ({ siteTitle,postInfo }) => {
  if (postInfo){
    var {postTitle,postDate} = postInfo
    siteTitle = postTitle
  }
  const [isOpen, setIsOpen] = useState(false),toggle = () => setIsOpen(!isOpen);
  var listmenu,subheading = useRef(null)
  
  useEffect(() => {
    gsap.registerPlugin(CSSRulePlugin);
    const tl = new TimelineLite(),title = ".site-heading .line-wrap-inner",
    desctag = CSSRulePlugin.getRule(".subheading h3:before")
    //console.log("GSAP Globals", window.com.greensock);
    //contents var
    listmenu = listmenu.children[0].lastElementChild.firstElementChild.children
    //console.log(desctag)

    for (let index = 0; index < listmenu.length; index++) {
      tl.from(listmenu[index].children[0], 0.5, {opacity:0,scaleX:0, scaleY:0,ease: Power4.easeIn})
    }
    tl.staggerFrom(
      title,
      1,
      {
        y: 100,
        ease: Power4.easeOut,
        delay:.5,
      }
    )
    for (let index = 0; index < subheading.children.length; index++) {
      tl.from(subheading.children[index], 0.5, {opacity:0,scaleX:0, scaleY:0,ease: Power4.easeIn})
    }
    tl.to(desctag, 1.4, {width:"0%",ease: Power4.easeInOut});
  })
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800"
          rel="stylesheet"
          type="text/css"
        />
      </Helmet>
      <div ref={el =>(listmenu = el)} >
      <Navbar className="container navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto"navbar>
            <NavItem>
              <Link className="nav-link" to="/">Home</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/blog">Blog</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/search">Search</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar></div>

      <header
        className="masthead"
        style={{
          backgroundImage: `url(${Image})`,
        }}
      >
        <div class="overlay"></div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-10 mr-auto">
              <div class="site-heading">
                <h1>
                  <div className="line-wrap">
      <div className="line-wrap-inner">{siteTitle}</div>
                  </div>
                </h1>
                <div class="subheading" ref={el =>(subheading = el)}>
                  {postDate ? (
                    <h3><span>{postDate}</span></h3>
                  ):
                  (
                    <>
                    <h3><span>My thought</span></h3>
                    <h3><span>Story</span></h3>
                    <h3><span>Tutorial</span></h3>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

// Header.defaultProps = {
//   siteTitle: ``,
// }

export default Header
