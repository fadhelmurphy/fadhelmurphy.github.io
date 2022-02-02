
import { Container, Row, Col, Image, assets, React } from "./index"

export const LogoSection = () =>(
    
    <Container fluid>
      <Row className="flex-column-reverse flex-lg-row">
        <Col
          lg="6"
          className="order-lg-1 mb-5 logo-section"
          style={{ minHeight: "35vh" }}
        >
          {assets.logo.map(el => {
            return (
              <div
                class="position-absolute overflow-hidden shadow-lg rounded"
                data-aos="fade-up"
                style={el.style}
              >
                <div
                  className="h-100 w-100"
                  data-aos="image-reveal"
                  data-aos-duration="700"
                >
                  <Image filename={el.file} />
                </div>
              </div>
            )
          })}
        </Col>
        <Col
          lg="4"
          className="order-lg-2 align-self-center p-5 mr-0 ml-lg-5 pr-lg-0"
        >
          
          <h3
          data-aos="fade-up" className="line-wrap-inner text-capitalize" style={{ color: "#58a941" }}>
            Logo Design
          </h3>
          <h1
          data-aos="fade-up" className="line-wrap-inner">
            I'm also experienced in creating vector arts, especially logos for
            your business.
          </h1>
        </Col>
      </Row>
    </Container>
)