import React from "react"
import { Link } from "gatsby"
import { Col, Row } from "reactstrap"
import ConcatWords from "../utils/ConcatWords"
const kebabCase = require(`lodash.kebabcase`)

const blogList = ({data}) => {
    const { title, path, date, tags, excerpt, id } = data
return(
    <div className="blog-post-preview" key={id}>
    <h1 
          data-aos="fade-up">
      <Row>
      <Col xs="1" className="d-none d-md-block date p-4 pr-lg-0 mw-100" style={{textAlign:'right'}}>
        {
        date.split(" ").map((tag,index)=>{
         return index!==2?
          <h6>{tag}</h6>
          :<></>;
        })}</Col>
        <Col xs="1" className="d-none d-md-block date mw-100">{ date.split(" ")[2]}</Col>
        <Col xs="8">
      <Link to={path}>{title}</Link>
      <h4 className="font-weight-bold">
      <Row>
        <Col xs="auto">
          <div className="blog-post-category">
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
          </div>
        </Col>
      </Row>
    </h4>
      </Col>
      </Row>
    </h1>
    {/* <p>{excerpt}</p> */}
  </div>
)
}
export default blogList