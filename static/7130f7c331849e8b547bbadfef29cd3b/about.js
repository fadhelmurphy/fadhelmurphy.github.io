import React from "react"
import SEO from "../components/seo"
import { Container } from "reactstrap"
import { AboutPageHeader,Menu,Desc,Almamater,Dev,Design,AboutPageFooter,FooterTemplate } from "../components/AboutPage"
// import Image from "../components/image"

const About = ({ location }) => {
  return (
    <>
      <SEO title="About" />
      <div className="overflow-hidden">
        <Menu position="fixed-top" location={location} />
        <AboutPageHeader />
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
        <Container>
          <Desc/>
          <Almamater />
          <Dev />
          <Design />
          <AboutPageFooter/>
        </Container>
        <FooterTemplate />
      </div>
    </>
  )
}
export default About
