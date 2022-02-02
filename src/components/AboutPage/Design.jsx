import { Container, Row, Col, Image, assets, React } from "./index"

export const Design = ()=>(
    
    <>
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
  </>
)