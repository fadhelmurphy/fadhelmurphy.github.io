import { Container, Row, Col, Image, assets, React } from "./index"

export const DesignSection = () => (
    
    <Container fluid>
      <Row className="order-lg-1 justify-content-lg-center">
        <Container>
          <Col xs="12" className="order-lg-1 my-5">
            <h1 className="text-center" style={{ fontSize: "6vh" }}>
              Another personal project that I learned from internet
            </h1>

            <p className="text-center">
              For more project you can follow my{" "}
              <b>
                <a href="https://www.instagram.com/fadhel.pop">Instagram</a>
              </b>{" "}
              and{" "}
              <b>
                <a href="https://www.github.com/fadhelmurphy">Github</a>
              </b>
            </p>
          </Col>
        </Container>
        <Col
          xs="12"
          className="order-lg-2 mb-5 logo-section"
          style={{ minHeight: "35vh" }}
        >
          {assets.another.map(el => {
            return (
              <div
                class="position-absolute overflow-hidden shadow-lg rounded"
                data-aos="zoom-in"
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
      </Row>
    </Container>
)