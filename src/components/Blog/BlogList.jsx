import { Col, Row, Link,ConcatWords,React,kebabCase } from "./index"

export const BlogList = ({ data }) => {
  const { title, path, date, tags, excerpt, id } = data
  return (
    <div className="blog-post-preview row" data-aos="fade-up" 
    data-aos-once="true" key={id}>
      <Col xs="12" className="text-break">
        <h1>
          <Link to={path}>{title}</Link>
        </h1>
        <h6>
          <div
            className="blog-post-date text-uppercase"
            style={{
              color: "#aaa",
            }}
          >
            {date}
          </div>
        </h6>
        <p className="mt-3">
          <div
            className="blog-post-category text-uppercase"
            style={{ color: "#58a941" }}
          >
            {tags
              ? tags.map((tag, index, arr) => {
                  return (
                    // <Link className="btn btn-secondary btn-sm border-0 mr-3 px-3" to={`/blog/tags/${kebabCase(tag)}`} style={{
                    //   fontWeight:600
                    // }}>
                    //   {tag}
                    // </Link>
                    <ConcatWords arrCount={arr.length} index={index} key={tag}>
                      <Link
                        to={`/blog/tags/${kebabCase(tag)}`}
                        style={{ color: "#58a941" }}
                      >
                        {tag}
                      </Link>
                    </ConcatWords>
                  )
                })
              : null}
          </div>
        </p>
      </Col>
      {/* <p>{excerpt}</p> */}
    </div>
  )
}
