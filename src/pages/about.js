import React, { useEffect } from "react"
import SEO from "../components/seo"
import { Container, Row, Col } from "reactstrap"
import Menu from "../components/menu"
import FooterTemplate from "../components/footer"
// import Image from "../components/image"

const About = ({ location }) => {
  useEffect(() => {
    var elements = document.querySelectorAll(".word")
    for (var i = 0, l = elements.length; i < l; i++) {
      var str = elements[i].textContent
      elements[i].innerHTML = ""
      let dur = 400
      for (var j = 0, ll = str.length; j < ll; j++) {
        var spn = document.createElement("span")
        elements[i].appendChild(spn)
        spn.textContent = str[j]
        // j % 2
        //   ? spn.setAttribute("data-aos", "titleup")
        //   : spn.setAttribute("data-aos", "titledown")
        // if (spn.textContent !== " ")
        dur = dur + 100
        spn.setAttribute("data-aos", "titledown")
        spn.setAttribute("data-aos-duration", dur)
        spn.setAttribute("data-aos-once", "true")
      }
    }
  })
  return (
    <>
      <SEO title="About" />
      <div className="overflow-hidden">
        <Menu position="fixed-top" location={location} />
        {/* <Container>
          <Row className="justify-content-center" style={{ height: "100vh" }}>
            <Col className="align-self-center text-center">
              <h1 data-aos="fade-up" data-aos-duration="1000" className="word" style={{
                fontSize:'5vw',
                textTransform:'uppercase',
              }}>sup bruh?</h1>
            </Col>
          </Row>
        </Container> */}
        <Container className="pt-5">
          <Row className="p-3 p-md-5" >
            <Col
              style={{
                position: "absolute",
                top: "0",
                right: "0",
              }}
            >
              <h1
                style={{
                  fontSize: "20vw",
                  fontWeight: "600",
                  color: "#d7eee1b3",
                  letterSpacing: "1rem",
                  WebkitTextFillColor: "white",
                  WebkitTextStroke: "2px #d7eee1b3",
                }}
              >
                Who?
              </h1>
            </Col>
            <Col>
                  <div className="line-wrap h-25 overflow-hidden">
                    <h4
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-once="true"
                      className="little line-wrap-inner mx-2 my-3"
                    >
                      A little
                    </h4>
                  </div>
                  <h1>
                    
              <div className="line-wrap h-25 overflow-hidden">
              <div
                className="word about line-wrap-inner"
              >
                About&nbsp;me
              </div>
                </div>
                  </h1>
            </Col>
          </Row>
          <Row className="mb-5 p-3 p-md-5">
            <Col>
              <p className="top-desc-about">
                Hi I’m Fadhel. I'm 22 years old, an Indonesian Front-end
                engineer with a bit of backend experienced. Born, raised, and
                currently living in Tangerang, Indonesia. I am an Informatics
                Engineering graduate. I spent my free time to watch movies and
                learn about graphic design.
              </p>
              <p>
                I'm interested in Image Processing, Machine
                Learning, or Deep Learning with skimage, sklearn, and
                Tensorflow.
              </p>
            </Col>
          </Row>
          <Row
            className="p-3 p-md-5 justify-content-between"
            data-aos="fade-up"
          >
            <Col lg="3" className="my-5 text-center align-self-center">
              <h1>Almamater</h1>
            </Col>
            <Col lg="3" className="my-5 text-center align-self-center">
              <h6>Gunadarma University</h6>
              <h2>Informatics</h2>
              <p>2017 - Present</p>
            </Col>
            <Col lg="3" className="my-5 text-center align-self-center">
              <h6>SMAN 4 Tangerang</h6>
              <h2>Science</h2>
              <p>2014 - 2017</p>
            </Col>
            {/* <Row className="p-3">
                    <Col xs="12">
                  <h1>Almamater</h1>
                </Col>
                    </Row> */}
          </Row>
          <Row
            className="text-center p-3 p-md-5 justify-content-between"
            data-aos="fade-up"
          >
            <Col md="12">
              <h6 style={{ color: "#7bc678" }}>Development</h6>
            </Col>
          </Row>
          <Row
            className="text-center p-3 p-md-5 justify-content-between"
            data-aos="fade-up"
          >
            <Col md="3">
              <h3>PHP</h3>
            </Col>
            <Col md="3">
              <h3>Javascript</h3>
            </Col>
            <Col md="3">
              <h3>Python</h3>
            </Col>
            <Col md="3">
              <h3>Jquery</h3>
            </Col>
          </Row>
          <Row
            className="text-center p-3 p-md-5 justify-content-between"
            data-aos="fade-up"
          >
            <Col md="3">
              <h3>React</h3>
            </Col>
            <Col md="3">
              <h3>Gatsby.js</h3>
            </Col>
            <Col md="3">
              <h3>Flutter</h3>
            </Col>
            <Col md="3">
              <h3>Express.js</h3>
            </Col>
          </Row>
          <Row
            className="text-center p-3 p-md-5 justify-content-between"
            data-aos="fade-up"
          >
            <Col md="3">
              <h3>Flask</h3>
            </Col>
            <Col md="3">
              <h3>Rest API</h3>
            </Col>
            <Col md="3">
              <h3>Tensorflow 2.0</h3>
            </Col>
            <Col md="3">
              <h3>Sklearn</h3>
            </Col>
          </Row>
          <Row
            className="text-center p-3 p-md-5 justify-content-between"
            data-aos="fade-up"
          >
            <Col md="12">
              <h6 style={{ color: "#7bc678" }}>Design</h6>
            </Col>
          </Row>
          <Row
            className="text-center p-3 p-md-5 justify-content-between"
            data-aos="fade-up"
          >
            <Col md="4">
              <h3>Photoshop</h3>
            </Col>
            <Col md="4">
              <h3>Illustrator</h3>
            </Col>
            <Col md="4">
              <h3>Figma</h3>
            </Col>
          </Row>
          <Row
            className="text-center p-3 p-md-5 justify-content-between"
            data-aos="fade-up"
          >
            <Col md="6">
              <h3>Premiere Pro</h3>
            </Col>
            <Col md="6">
              <h3>Blender 3D</h3>
            </Col>
          </Row>
          <Row
            className="my-5 p-3 p-md-5 justify-content-between"
            data-aos="fade-up"
          >
            <Col lg="6" className="text-center text-break align-self-center">
              <p style={{ textTransform: "uppercase" }}>Let's work together</p>
              <h2>fadhelijlalfalah@gmail.com</h2>
            </Col>
            <Col lg="6" className="text-center text-break align-self-center">
              <p>
                <a
                  class="btn btn-outline-primary"
                  href="mailto:fadhelijlalfalah@gmail.com"
                  role="button"
                  style={{ borderRadius: "30px" }}
                >
                  Get in touch
                </a>
              </p>
            </Col>
          </Row>
        </Container>
        <FooterTemplate />
      </div>
    </>
  )
}
export default About
