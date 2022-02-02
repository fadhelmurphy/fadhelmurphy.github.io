import { Container, Row, Col, Image, assets, React,BlogList,Link } from "./index"
export const ProjectDetailContent = ({post,prev,next}) => (
    <>
    <div class="scroll-down text-uppercase position-fixed">
        <p style={{ letterSpacing: "0.5em", fontSize: "12px" }}>
          scroll down →
        </p>
      </div>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <Row>
          {next && (
            <Col className="text-uppercase font-weight-bold text-left">
              <Link to={next.node.frontmatter.path}>
                <Row>
                  <Col>
                    <h4 style={{ fontWeight: "800" }}>
                      {next.node.frontmatter.title}
                    </h4>
                    <h6 style={{ color: "#132f3e80" }}>PREVIOUS POST</h6>
                  </Col>
                </Row>
              </Link>
            </Col>
          )}

          {prev && (
            <Col className="text-uppercase font-weight-bold text-right">
              <Link to={prev.node.frontmatter.path}>
                <Row>
                  <Col>
                    <h4 style={{ fontWeight: "800" }}>
                      {prev.node.frontmatter.title}
                    </h4>
                    <h6 style={{ color: "#132f3e80" }}>NEXT POST</h6>
                  </Col>
                </Row>
              </Link>
            </Col>
          )}
        </Row>
        </>
)