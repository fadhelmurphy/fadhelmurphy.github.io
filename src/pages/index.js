import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container, Row, Col } from "reactstrap"
import Image from "../components/image"
// import $ from 'jquery/dist/jquery.slim' // importing this worked like a charm
// import 'popper.js' // importing this worked like a charm as well
const assets = {
  web: [
    {
      judul: "My personal web",
      desc:
        "Build with Gatsby.js,bootstrap,and Aos.js",
      file: "web/personal-web.png",
      link: "https://fadhelmurphy.github.io",
      className: ["order-lg-2", "order-lg-1"],
    },
    {
      judul: "ISTIH (Indonesian Smart Textile Hub Industry) 2020",
      desc:
        "Helped my friend (rully/main developer) to build some feature using React.js, Redux, Redux-saga",
      file: "web/istih.png",
      link: "#",
      className: ["order-lg-1", "order-lg-2"],
    },
    {
      judul: "BisaCPNS 2020",
      desc:
        "Implementing design to code with bootstrap and aos.js",
      file: "web/bisacpns-2020.png",
      link: "https://bisacpns.com",
      className: ["order-lg-2", "order-lg-1"],
    },
    {
      judul: "Vote App-2",
      desc:
        "Build with React.js, antd, context state management and Laravel. Created by me and yazid",
      file: "web/dashboard-desktop.png",
      link: "/project/vote-app",
      className: ["order-lg-1", "order-lg-2"],
    },
    {
      judul: "Inventory",
      desc:
        "Inventory with C# for college task. Created by me and yazid",
      file: "web/warehouse.jpg",
      link: "https://github.com/fadhelmurphy/inventorycsharpasp",
      className: ["order-lg-2", "order-lg-1"],
    },
    {
      judul: "Indonesian news classification and Keyword extraction",
      desc: "build with python and naive bayes method",
      file: "web/classification.jpg",
      link: "https://github.com/fadhelmurphy/Penulisan-Ilmiah-2020",
      className: ["order-lg-1", "order-lg-2"],
    },
  ],
  logo: [
    {
      file: "logo/logo-air-v2.jpg",
      style: {
        bottom: "0%",
        left: "0px",
        width: "30%",
        height: "50%",
      },
    },
    {
      file: "logo/logo-aliansi-v2.jpg",
      style: {
        top: "10%",
        left: "0px",
        width: "30%",
        height: "35%",
      },
    },
    {
      file: "logo/Andrian-color-100.jpg",
      style: {
        top: "15%",
        left: "35%",
        width: "30%",
        height: "40%",
      },
    },
    {
      file: "logo/logo f grid.jpg",
      style: {
        bottom: "10%",
        left: "35%",
        width: "30%",
        height: "30%",
      },
    },
    {
      file: "logo/tetra-civic.jpg",
      style: {
        bottom: "10%",
        right: "0",
        width: "30%",
        height: "50%",
      },
    },
  ],
  another: [
    {
      file: "another/chelsea-islan.jpg",
      style: {
        bottom: "5%",
        left: "0px",
        width: "15%",
        height: "50%",
      },
    },
    {
      file: "another/backdrop.jpg",
      style: {
        top: "5%",
        left: "0px",
        width: "25%",
        height: "35%",
      },
    },
    {
      file: "another/matchday-1.jpg",
      style: {
        top: "10%",
        left: "28%",
        width: "15%",
        height: "30%",
      },
    },
    {
      file: "another/carried-away-cover-rgb.jpg",
      style: {
        bottom: "10%",
        left: "17%",
        width: "26%",
        height: "45%",
      },
    },
    {
      file: "another/Fadhel-AsianGames2018.jpg",
      style: {
        top: "15%",
        right: "35%",
        width: "20%",
        height: "45%",
      },
    },
    {
      file: "another/not-now.jpg",
      style: {
        top: "10%",
        right: "17%",
        width: "16%",
        height: "25%",
      },
    },
    {
      file: "another/poster.jpg",
      style: {
        top: "5%",
        right: "0",
        width: "15%",
        height: "54%",
      },
    },
    {
      file: "another/matchday-2.jpg",
      style: {
        top: "39%",
        right: "17%",
        width: "10%",
        height: "20%",
      },
    },
    {
      file: "another/tatjana-100.jpg",
      style: {
        bottom: "0%",
        right: "0%",
        width: "27%",
        height: "37%",
      },
    },
  ],
}

const IndexPage = ({ location }) => (
  <>
    <Layout location={location}>
      <SEO title="Home" />
      <Container className="my-5">
        {/* <p
          className="font-weight-bold my-5"
          style={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <a>App Development</a>
          <div
            style={{
              width: "96px",
              margin: "0 10px",
              borderBottom: "3px solid #354f52",
            }}
          ></div>
        </p> */}

        <h1
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-once="true"
          className="custom-border-bottom"
          style={{ fontWeight: 600, fontSize: "2.8rem" }}
        >
          App
          <br />
          Development
        </h1>
      </Container>
      <Container className="my-5">
        {assets.web.map(el => {
          return (
            <Row className="justify-content-lg-between my-5 py-5 flex-column-reverse flex-lg-row">
              <Col
                lg="5"
                className={
                  "align-self-center ml-lg-0 p-5 mx-auto " + el.className[0]
                }
                data-aos="fade-up"
              >
                <h2 className="text-capitalize">{el.judul}</h2>
                <p className="mt-0 mb-5">{el.desc}</p>
                <a
                  href={el.link}
                  target="_blank"
                  className="btn btn-outline-primary"
                  style={{
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                >
                  {"Detail →"}
                </a>
              </Col>
              <Col lg="7" className={"mr-lg-0 mx-auto " + el.className[1]}>
                <div
                  class="overflow-hidden shadow-lg rounded"
                  data-aos="fade-up"
                  style={{
                    maxHeight: "20em",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="h-100 w-100"
                    data-aos="image-reveal"
                    data-aos-duration="700"
                  >
                    <Image filename={el.file} />
                  </div>
                </div>
              </Col>
            </Row>
          )
        })}

        {/* <p
          className="font-weight-bold my-5"
          style={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <a>Logo Design</a>
          <div
            style={{
              width: "96px",
              margin: "0 10px",
              borderBottom: "3px solid #354f52",
            }}
          ></div>
        </p> */}

        <h1
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-once="true"
          className="custom-border-bottom"
          style={{ fontWeight: 600, fontSize: "2.8rem" }}
        >
          Logo
          <br />
          Design
        </h1>
      </Container>
    </Layout>

    <Container fluid={true}>
      <Row className="flex-column-reverse flex-lg-row">
        <Col
          lg="6"
          className="order-lg-1 mb-5 logo-section"
          style={{ minHeight: "35vh" }}
        >
          {assets.logo.map(el => {
            return (
              <div
                class="position-absolute overflow-hidden rounded shadow-lg"
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
          data-aos="fade-up"
        >
          <h3 className="text-capitalize" style={{ color: "#58a941" }}>
            Logo Design
          </h3>
          <h1>
            I'm also experienced in creating vector arts, especially logos for
            your business.
          </h1>
        </Col>
      </Row>
    </Container>
    {/* <Container>
  <p
    className="font-weight-bold my-5"
    style={{
      alignItems: "center",
      display: "flex",
    }}
  >
    <a>Another Project</a>
    <div
      style={{
        width: "96px",
        margin: "0 10px",
        borderBottom: "3px solid #354f52",
      }}
    ></div>
  </p>
</Container> */}
    <Container fluid={true}>
      <Row className="order-lg-1 justify-content-lg-center">
        <Container>
          <Col xs="12" className="order-lg-1 my-5">
            <h1 className="text-center" style={{ fontSize: "6vh" }}>
              Another personal project that I learned from internet
            </h1>

            <p className="text-center">
              For more project you can follow my{" "}
              <b>
                <a href="https://www.instagram.com/ijlalfadhel">Instagram</a>
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
                class="position-absolute overflow-hidden rounded shadow"
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
    <Container>
      <Row
        className="my-5 text-center p-5 justify-content-between"
        data-aos="fade-up"
      >
        <Col md="12" className="text-center text-break align-self-center">
          <p style={{ textTransform: "uppercase" }}>Let's work together</p>
          <h2>fadhelijlalfalah@gmail.com</h2>
        </Col>
        <Col md="12" className="text-center text-break align-self-center">
          <p>
            <a
              class="btn btn-outline-primary"
              href="mailto:fadhelijlalfalah@gmail.com"
              role="button"
              style={{ borderRadius: "30px" }}
            >
              Get in touch
            </a>
          </p>
        </Col>
      </Row>
    </Container>
    <Container>
      <footer>
        <Row>
          <Col xs="12" md="6" className="text-center text-md-left">
            © {new Date().getFullYear()} Built with{" "}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </Col>
          <Col xs="12" md="6" className="text-center text-md-right">
            Designed and developed by me
          </Col>
        </Row>
      </footer>
    </Container>
  </>
)
export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "DD MM YYYY")
            path
          }
        }
      }
    }
  }
`
