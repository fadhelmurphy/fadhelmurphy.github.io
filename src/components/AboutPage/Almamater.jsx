import { Container, Row, Col, Image, assets, React } from "./index"

export const Almamater = ()=>(
    
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
      <p>2017 - 2021</p>
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
)