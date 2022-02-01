import { Container, Row, Col, Image, assets, React,BlogList,Link } from "./index"
export const BlogPageContent = ({posts,numPages,currentPage,isFirst,isLast,prevPage,nextPage}) => {

    return(
        <>
        
      <Container>
        <div class="scroll-down text-uppercase position-fixed">
          <p style={{ letterSpacing: "0.5em", fontSize: "12px" }}>
            scroll down →
          </p>
        </div>
        <h2
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-once="true"
          className="custom-border-bottom"
          style={{ fontWeight: 600 }}
        >
          Latest
          <br />
          Post
        </h2>
        <div className="blog-posts mt-5">
          {posts
            .filter(post => post.node.frontmatter.title.length > 0)
            .map(({ node: post }) => {
              const { excerpt, id } = post
              const { title, path, date, tags } = post.frontmatter
              return (
                <BlogList data={{ title, path, date, tags, excerpt, id }}></BlogList>
              )
            })}
        </div>
      
        <Row>
        <Col
          xs="12"
          md="6"
          className="d-flex align-items-center font-weight-bold justify-content-center justify-content-md-start my-3"
        >
          {Array.from({ length: numPages }, (_, i) =>
            i + 1 === currentPage ? (
              <>
                <Link
                  style={{
                    margin: "0 10px",
                  }}
                  key={`pagination-number${i + 1}`}
                  to={`/blog/${i === 0 ? "" : i + 1}`}
                >
                  {i + 1}
                </Link>

                <span
                  style={{
                    width: "96px",
                    borderBottom: "2px solid #354f52",
                  }}
                ></span>
              </>
            ) : (
              <Link
                style={{
                  color: "#aaa",
                  margin: "0 10px",
                }}
                key={`pagination-number${i + 1}`}
                to={`/blog/${i === 0 ? "" : i + 1}`}
              >
                {i + 1}
              </Link>
            )
          )}
        </Col>
        <Col
          xs="12"
          md="6"
          className="align-items-center text-center text-md-right my-3"
        >
          {!isFirst && (
            <Link
              style={{
                margin: "0 10px",
              }}
              to={"/blog/" + prevPage}
              rel="prev"
            >
              ← Previous
            </Link>
          )}
          {!isLast && (
            <Link
              style={{
                margin: "0 10px",
              }}
              to={"/blog/" + nextPage}
              rel="next"
            >
              Next →
            </Link>
          )}
        </Col>
      </Row>
      </Container>
        </>
    )
}