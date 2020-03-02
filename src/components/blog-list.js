import React from "react"
import { Link } from "gatsby"
import { Col, Row } from "reactstrap"
import ConcatWords from "../utils/ConcatWords"
const kebabCase = require(`lodash.kebabcase`)

const blogList = ({data}) => {
    const { title, path, date, tags, excerpt, id } = data
return(
    <div className="blog-post-preview" key={id}>
    <h1>
      <Link to={path}>{title}</Link>
    </h1>
    <h6 className="font-weight-bold">
      <Row>
        <Col md="auto">{date}</Col>
        <Col md="auto">
          <Row className="blog-post-category">
            {tags
              ? tags.map((tag, index, arr) => {
                  return (
                    <ConcatWords
                      arrCount={arr.length}
                      index={index}
                      key={tag}
                    >
                      <Link to={`/tags/${kebabCase(tag)}`}>
                        {tag}
                      </Link>
                    </ConcatWords>
                  )
                })
              : null}
          </Row>
        </Col>
      </Row>
    </h6>
    <p>{excerpt}</p>
  </div>
)
}
export default blogList