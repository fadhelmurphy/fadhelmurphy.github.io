import React, {useEffect} from "react"
import SEO from "../components/seo"
import { Container, Row, Col } from "reactstrap"
import Menu from "../components/menu"
import Image from "../components/image"

const About = () => {
useEffect(()=>{
  var elements = document.querySelectorAll(".word")
  for (var i = 0, l = elements.length; i < l; i++) {
    var str = elements[i].textContent
    elements[i].innerHTML = ""
    for (var j = 0, ll = str.length; j < ll; j++) {
      var spn = document.createElement("span")
      elements[i].appendChild(spn)
      spn.textContent = str[j]
      console.log(spn.textContent)
      if(spn.textContent!==" ")
      j % 2?
      spn.setAttribute("data-aos","titleup"):
      spn.setAttribute("data-aos","titledown");
      spn.setAttribute("data-aos-duration","3000");
      spn.setAttribute("data-aos-once","true");
    }
  }
})
  return (
    <>
      <SEO title="About" />
      <div className="overflow-hidden">
        <Menu position="fixed-top" />
        <Container>
          <Row className="justify-content-center" style={{ height: "100vh" }}>
            <Col className="align-self-center text-center">
              <h1 data-aos="fade-up" data-aos-duration="1000" className="word" style={{
                fontSize:'5vw',
                textTransform:'uppercase',
              }}>sup bruh?</h1>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-between">
            <Col lg="6" className="align-self-start">
              <Col
                style={{
                  position: "absolute",
                  top: "-10%",
                  left: "-30%",
                }}
              >
                <h1
                  style={{
                    fontSize: "30vh",
                    fontWeight: "600",
                    color: "#d7eee1b3",
                    letterSpacing: "1rem",
                  }}
                >
                  Who?
                </h1>
              </Col>
              <Col>
                <h1
                  data-aos="fade-right"
                  data-aos-duration="1000"
                  style={{
                    alignItems: "center",
                    display: "flex",
                    WebkitTextFillColor: "white",
                    WebkitTextStroke: "1px #354f52",
                    lineHeight: "2.5em",
                  }}
                >
                  A little
                </h1>
                <h1
                  data-aos="fade-right"
                  data-aos-duration="1500"
                  style={{
                    alignItems: "center",
                    display: "flex",
                    fontSize: "14vh",
                    fontWeight: "600",
                    lineHeight: "1rem",
                  }}
                >
                  About
                </h1>
                <h1
                  data-aos="fade-right"
                  data-aos-duration="1600"
                  style={{
                    alignItems: "center",
                    display: "flex",
                    WebkitTextFillColor: "white",
                    WebkitTextStroke: "1px #354f52",
                    lineHeight: "2.5em",
                  }}
                >
                  Me
                </h1>
              </Col>
            </Col>
            <Col lg="6" className="align-self-center">
              <Row className="my-5 p-5" data-aos="fade-up">
                <Col>
                  <h1
                    style={{
                      color: "#58a941",
                    }}
                  >
                    Fadhel Ijlal
                    <br />
                    Falah
                  </h1>
                </Col>
              </Row>
              <Row className="my-5 p-5">
                <Col>
                  <p>
                    Hi I’m Fadhel. Your usual 21 year old Indonesian digital designer & developer based in Jakarta. Known as
                    Fadhel Murphy on Internet.
                  </p>
                </Col>
              </Row>
              <Row className="my-5 p-5 justify-content-between" data-aos="fade-up">
                    <Row className="p-3">
                    <Col xs="12">
                  <h1>Almamater</h1>
                </Col>
                    </Row>
                  <Row className="px-3">
                    
                <Col xs="8">
                    Gunadarma University - Informatics
                </Col>
                <Col xs="4">
                    2017 - Present
                </Col>
                <Col xs="8">
                    SMAN 4 Tangerang - Science
                </Col>
                <Col xs="4">
                    2014 - 2017
                </Col>
                  </Row>
              </Row>
              <Row className="my-5 p-5 justify-content-between" data-aos="fade-up">
                <Col lg="7">
                  <h1 >Development</h1>
                  <p>
                    PHP
                    <br />
                    javascript
                    <br />
                    Python
                    <br />
                    Jquery
                    <br />
                    React
                    <br />
                    Gatsby.js
                    <br />
                    Flutter
                    <br />
                    Express.js
                    <br />
                    Flask
                    <br />
                    Rest API
                    <br />
                    Tensorflow 2.0
                    <br />
                    Sklearn
                  </p>
                </Col>
                <Col lg="4">
                <h1>Design</h1>
                  <p>
                    Photoshop
                    <br />
                    Illustrator
                    <br />
                    Figma
                    <br />
                    Premiere Pro
                    <br />
                    Blender 3D
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
export default About
