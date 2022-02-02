import { Container, Row, Col, Image, assets, React } from "./index"

export const AboutPageFooter = ()=>(
    
    
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
)