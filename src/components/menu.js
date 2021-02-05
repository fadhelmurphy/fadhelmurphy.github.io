import React, { useEffect, useState } from "react"
import { globalHistory } from "@reach/router"
import { Link } from "gatsby"
import { Navbar, Nav, NavItem, Container, Col,Row } from "reactstrap"
const Menu = ({position}) => {
      // State of our Menu
  const [state, setState] = useState({
    clicked: false,
  })

  //menu list
  const pathname = globalHistory.location.pathname
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Blog", to: "/blog" },
    { label: "Work", to: "/work" },
    { label: "Search", to: "/search" },
  ]

  // Toggle menu
  const handleMenu = () => {
    if (state.clicked === true) {
      console.log("clicked true")
      setState({
        clicked: !state.clicked,
      })
    } else if (state.clicked === false) {
      console.log("clicked false")
      setState({
        clicked: !state.clicked,
      })
    }
  }

  useEffect(() => {
    // //Listening for page changes.
    // globalHistory.listen(() => {
    //   setState({ clicked: false })
    //   console.log("Route change")
    // })
    var body = document.querySelector("body")
    // body.classList.add("nav-active")
    // If the menu is open and we click the menu button to close it.
    if (state.clicked === false) {
      // If menu is closed and we want to open it.
      body.classList.remove("nav-active")
    } else if (state.clicked === true) {
      body.classList.add("nav-active")
    }
  })
  return (
    <>
      <div class="nav">
        <div class="nav__content">
          <Container>
            <Row className="justify-content-lg-between">
            <Col lg="6">
            <ul class="nav__list p-4 p-lg-0">
              {navLinks.map(link => (
                <div className="overflow-hidden">
                  <li
                    className="nav__list-item"
                    onClick={() => {
                      if (pathname === link.to) {
                        setState({ clicked: false })
                      }
                    }}
                  >
                    <Link activeStyle={{
                      color:'#e8b237'
                    }} 
                    to={link.to}>{link.label}</Link>
                  </li>
                </div>
              ))}
            </ul>
            </Col>
            {/* <Col lg="6" className="align-self-center">
              <div className="overflow-hidden">
              <h4 data-aos="fade-up"
                      data-aos-duration="1000" style={{color:'white'}}>Contact me on:</h4>
              </div>
            </Col> */}
              
            </Row>
          </Container>
        </div>
      </div>

      <Navbar
        className={`navbar navbar-expand-lg navbar-light p-4 p-lg-5  ${position?position:""}`}
        style={{
          zIndex: "1030",
        }}
        id="mainNav"
      >
        <Nav className="ml-auto" navbar>
          <NavItem onClick={handleMenu}>
            <div class="nav-link menu-icon hover-target">
              <span class="menu-icon__line menu-icon__line-left"></span>
              <span class="menu-icon__line"></span>
              <span class="menu-icon__line menu-icon__line-right"></span>
            </div>
          </NavItem>
        </Nav>
      </Navbar>
</>
)
}
export default Menu;