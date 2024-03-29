import { Container, Row, Col, Image, assets, React,BlogList,Link } from "./index"
export const BlogDetailContent = ({post,prev,next}) => (
    <>
    <div class="scroll-down text-uppercase position-fixed">
        <p style={{ letterSpacing: "0.5em", fontSize: "12px" }}>
          scroll down →
        </p>
      </div>
    <main
     className="p-3 w-100 w-md-50 mx-auto blog-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <Row className="w-100 w-md-50 mx-auto mt-5">
          {next && (
            <Col className="p-md-0 text-uppercase font-weight-bold text-left">
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
            <Col className="p-md-0 text-uppercase font-weight-bold text-right">
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