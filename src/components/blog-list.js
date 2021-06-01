import React from "react"
import { Link } from "gatsby"
import { Col, Row } from "reactstrap"
import ConcatWords from "../utils/ConcatWords"
const kebabCase = require(`lodash.kebabcase`)

const blogList = ({ data }) => {
  const { title, path, date, tags, excerpt, id } = data
  return (
    <div className="blog-post-preview row" data-aos="fade-up" key={id}>
        <Col xs="12" className="text-break">
          <h1>
            <Link to={path}>{title}</Link>
          </h1>
          <h5>
            <div
              className="blog-post-date text-uppercase"
              style={{
                color: "#aaa",
              }}
            >
              {date}
            </div>
          </h5>
          <p className="mt-3">
            <div className="blog-post-category text-uppercase" style={{ color: "#58a941" }}>
              {tags
                ? tags.map((tag, index, arr) => {
                    return (
                      // <Link className="btn btn-secondary btn-sm border-0 mr-3 px-3" to={`/tags/${kebabCase(tag)}`} style={{
                      //   fontWeight:600
                      // }}>
                      //   {tag}
                      // </Link>
                      <ConcatWords
                        arrCount={arr.length}
                        index={index}
                        key={tag}
                      >
                        <Link
                          to={`/tags/${kebabCase(tag)}`}
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
export default blogList
