import React from "react"
import { Container, Col, Row } from "reactstrap"

const FooterTemplate = ({pathname}) =>{

    return(
      <Container>
      {pathname !== "/" ? (
        <footer>
          <Row>
            <Col xs="12" md="6" className="text-center text-md-left">
              © {new Date().getFullYear()} Built with{" "}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </Col>
            <Col xs="12" md="6" className="text-center text-md-right">
              Designed and developed by me
            </Col>
          </Row>
        </footer>
      ) : null}
    </Container>
    )
}
export default FooterTemplate