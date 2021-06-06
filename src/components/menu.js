import React, { useEffect, useState } from "react"
import { globalHistory } from "@reach/router"
import { Link } from "gatsby"
import { Navbar, Nav, NavItem, Container, Col, Row } from "reactstrap"
const Menu = ({ position, location }) => {
  // State of our Menu
  const [state, setState] = useState({
    clicked: false,
  })

  //menu list
  // var pathname = globalHistory.location.pathname.split("/")
  var pathname = null
  if (location) {
    pathname = location.pathname.split("/");
    pathname = "/" + pathname[1]
  }
  var navLinks = [
    { label: "About", to: "/about" },
    { label: "Blog", to: "/blog" },
    // { label: "Labs", to: "/labs" },
    { label: "Search", to: "/search" },
  ]
  var Social = [
    { label: "Github", to: "github.com/fadhelmurphy" },
    { label: "Instagram", to: "instagram.com/mattkosim" },
    { label: "Facebook", to: "facebook.com/fadhelmurphy" },
  ]

  navLinks.map(link => {
    if (pathname == link.to)
      link.active = true;
    else
      link.active = false
  })

  // Toggle menu
  const handleMenu = () => {
    if (state.clicked === true) {
      setState({
        clicked: !state.clicked,
      })
    } else if (state.clicked === false) {
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
            <Row className="justify-content-lg-start">
              <Col md="4">
                <ul class="nav__list p-4 p-lg-0">
                  <div className="overflow-hidden">
                    <li
                      className="nav__list-item"
                    >
                      <h6 className="text-uppercase text-left text-white mb-5" style={{ letterSpacing: '0.5em' }}>Sitemap</h6>
                    </li>
                  </div>
                  {navLinks.map(link => (
                    <>
                      <div className="overflow-hidden">
                        <li
                          className="nav__list-item"
                          onClick={() => {
                            if (link.active) {
                              setState({ clicked: false })
                            }
                          }}
                        >
                          {link.active ?
                            <Link style={{
                              // color:'#e8b237'
                              color: '#8cf36fe3'
                            }}
                              to={link.to}>{link.label}</Link> :
                            <Link
                              to={link.to}>{link.label}</Link>}
                        </li>
                      </div>
                    </>
                  ))}
                </ul>
              </Col>
              <Col md="4" className="d-none d-md-block">
                <ul class="nav__list p-4 p-lg-0">
                  <div className="overflow-hidden">
                    <li
                      className="nav__list-item"
                    >
                      <h6 className="text-uppercase text-left text-white mb-5" style={{ letterSpacing: '0.5em' }}>Living In</h6>
                    </li>
                  </div>
                  <div className="overflow-hidden">
                    <li
                      className="nav__list-item"
                    >
                      <p className="text-left m-0" style={{ color: '#ffffff99' }}>Tangerang, Banten</p>
                    </li>
                  </div>
                </ul>
              </Col>
              <Col md="4" className="d-none d-md-block">
                <ul class="nav__list p-4 p-lg-0">
                  <div className="overflow-hidden">
                    <li
                      className="nav__list-item"
                    >
                      <h6 className="text-uppercase text-left mb-5" style={{ letterSpacing: '0.5em' }}>Reach me on</h6>
                    </li>
                  </div>
                  {Social.map(link => (
                    <div className="overflow-hidden">
                      <li
                        className="nav__list-item"
                      >
                        <a className="text-left" target="_blank" href={"https://www." + link.to}>{link.label}</a>
                      </li>
                    </div>
                  ))}
                </ul>
              </Col>
              {/* <Col md="6" className="align-self-center">
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
        className={`navbar navbar-expand-lg navbar-light p-3 p-lg-5 ${position ? position : ""}`}
        style={{
          zIndex: "1030",
        }}
        id="mainNav"
      >
        <Nav className="ml-auto flex-row" navbar>
          <NavItem className="mr-4">
            <h4 className="Home" style={{ lineHeight: '2.5rem' }}>
              <Link
              to="/">Fadhel</Link>
              </h4>
          </NavItem>
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