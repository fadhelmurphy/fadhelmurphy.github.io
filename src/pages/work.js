import React,{useEffect} from "react"
import SEO from "../components/seo"
import { Container, Row, Col } from "reactstrap"
import Menu from "../components/menu"
import Image from "../components/image"

const assets = {
  web: [
    {
      judul: "Vote App",
      desc:
        "This is my first time I using MEAN (Mongo,Express,Angular 6,Node) Stack",
      file: "web/vote-app.jpg",
      className:["order-lg-1","order-lg-2"]
    },
    {
      judul: "Warehouse App",
      desc:
        "Warehouse App with C# for college task. build with me and my friend (yazid)",
      file: "web/warehouse.jpg",
      className:["order-lg-2","order-lg-1"]
    },
    {
      judul: "Indonesian news classification and Keyword extraction",
      desc:
        "build with python and naive bayes method",
      file: "web/classification.jpg",
      className:["order-lg-1","order-lg-2"]
    },
  ],
  logo: [
    { 
      file:"logo/logo-air-v2.jpg",
      style:{
      bottom: "0%", 
      left: "0px", 
      width: "30%", 
      height: "50%" 
      }
    },
    { 
      file:"logo/logo-aliansi-v2.jpg",
      style:{
        top: "10%",
        left: "0px",
        width: "30%",
        height: "35%",
      }
    },
    { 
      file:"logo/Andrian-color-100.jpg",
      style:{
        top: "15%",
        left: "35%",
        width: "30%",
        height: "40%",
      }
    },
    { 
      file:"logo/logo f grid.jpg",
      style:{
        bottom: "10%",
        left: "35%",
        width: "30%",
        height: "30%",
      }
    },
    { 
      file:"logo/tetra-civic.jpg",
      style:{
        bottom: "10%",
        right: "0",
        width: "30%",
        height: "50%",
      }
    }
  ],
  another: [
    { 
      file:"another/chelsea-islan.jpg",
      style:{
      bottom: "5%", 
      left: "0px", 
      width: "15%", 
      height: "50%" 
      }
    },
    { 
      file:"another/backdrop.jpg",
      style:{
        top: "5%",
        left: "0px",
        width: "25%",
        height: "35%",
      }
    },
    { 
      file:"another/matchday-1.jpg",
      style:{
        top: "10%",
        left: "28%",
        width: "15%",
        height: "30%",
      }
    },
    { 
      file:"another/carried-away-cover-rgb.jpg",
      style:{
        bottom: "10%",
        left: "17%",
        width: "26%",
        height: "45%",
      }
    },
    { 
      file:"another/Fadhel-AsianGames2018.jpg",
      style:{
        top: "15%",
        right: "35%",
        width: "20%",
        height: "45%",
      }
    },
    { 
      file:"another/not-now.jpg",
      style:{
        top: "10%",
        right: "17%",
        width: "16%",
        height: "25%",
      }
    },
    { 
      file:"another/poster.jpg",
      style:{
        top: "5%",
        right: "0",
        width: "15%", 
        height: "54%" 
      }
    },
    { 
      file:"another/matchday-2.jpg",
      style:{
        top: "39%",
        right: "17%",
        width: "10%",
        height: "20%",
      }
    },
    { 
      file:"another/tatjana-100.jpg",
      style:{
        bottom: "0%",
        right: "0%",
        width: "27%",
        height: "37%",
      }
    },
  ],
}

const Works = () => {
  useEffect(()=>{
    var elements = document.querySelectorAll(".word")
    for (var i = 0, l = elements.length; i < l; i++) {
      var str = elements[i].textContent
      elements[i].innerHTML = ""
      for (var j = 0, ll = str.length; j < ll; j++) {
        var spn = document.createElement("span")
        elements[i].appendChild(spn)
        spn.textContent = str[j]
        let pos = j % 2 ? "up" : "down"
        spn.classList.add(pos)
      }
    }
  })
  return (
    <>
      <SEO title="Works" />
      <Menu position="fixed-top"/>
      <Container className="align-self-center py-5">
        <Row className="justify-content-center overflow-hidden" style={{
          height:'100vh'
        }}>
          
          <Col className="align-self-center" style={{
                  position:'absolute',
                  top:'30%',
                  left:'0'
              }}>
                  
        <h1 className="word word-project text-center" style={{
                  fontWeight:'600',
                  color:'#d7eee1',
                  letterSpacing:'2rem'
                }}>
                     PROJECT
                </h1>
              </Col>
                          <Col className="align-self-center" xs="12">
          <h3 className="text-left" style={{
            fontSize: "4vh",
            textTransform:'uppercase',
            letterSpacing:'1rem'
          }}
          >
          <div className="overflow-hidden d-inline-flex">
            <div
              className="overflow-hidden-inner"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-once="true"
            >
              It's about
            </div>
          </div>
          </h3>
          <h1 className="text-left word-d-p" style={{
            textTransform:'uppercase',
            fontWeight:'800',
          }}>
            
            <div className="overflow-hidden d-inline-flex">
                    <div
                      className="overflow-hidden-inner"
                      data-aos="fade-up"
                      data-aos-duration="1500"
                      data-aos-once="true"
                    >
                      Design &
                    </div>
                  </div><br/>
                  <div className="overflow-hidden d-inline-flex">
                    <div
                      className="overflow-hidden-inner"
                      data-aos="fade-up"
                      data-aos-duration="1500"
                      data-aos-once="true"
                    >
                      Programming
                    </div>
                  </div>
          </h1>
                          </Col>
        </Row>
      </Container>
      <Container className="my-5">
      <p className="font-weight-bold my-5" style={{
                    alignItems:'center',
                    display:'flex'
                  }}>
                    <a>App Development</a>
                    <div style={{
                      width:'96px',
                      margin:'0 10px',
                      borderBottom:'3px solid #354f52'
                    }}></div>
                  </p>
      </Container>
      <Container className="my-5">
        {assets.web.map((el) => {
            return (
              <Row className="justify-content-lg-between my-5 py-5 flex-column-reverse flex-lg-row">
                <Col
                  lg="5"
                  className={"align-self-center ml-lg-0 p-5 mx-auto "+el.className[0]}
                  data-aos="fade-up"
                >
                  <h1
                    className="text-capitalize"
                    style={{ fontWeight: "800" }}
                  >
                    {el.judul}
                  </h1>
                  <p>{el.desc}</p>
                  <p className="font-weight-bold" style={{
                    alignItems:'center',color: "#58a941",
                    display:'flex'
                  }}>
                    <a>Github</a>
                    <div style={{
                      width:'30px',
                      margin:'0 10px',
                      borderBottom:'1px solid #58a941'
                    }}></div>
                    <a style={{
                      fontWeight:'400'
                    }}>{">"}</a>
                  </p>
                </Col>
                <Col lg="7" className={"mr-lg-0 mx-auto "+el.className[1]}
                        >
                  <div
                    class="overflow-hidden shadow-lg rounded"
                    data-aos="fade-up"
                    style={{
                      maxHeight: "20em",
                      overflow: "hidden",
                    }}
                  >
                    <div className="h-100 w-100"
                    data-aos="image-reveal"
                    data-aos-duration="700">
                    <Image filename={el.file} />
                    </div>
                  </div>
                </Col>
              </Row>
            )
        })}
        
        
      <p className="font-weight-bold my-5" style={{
                    alignItems:'center',
                    display:'flex'
                  }}>
                    <a>Logo Design</a>
                    <div style={{
                      width:'96px',
                      margin:'0 10px',
                      borderBottom:'3px solid #354f52'
                    }}></div>
                  </p>
      </Container>

      <Container fluid={true}>
        <Row className="flex-column-reverse flex-lg-row">
          <Col lg="6" className="order-lg-1 mb-5 logo-section" style={{ minHeight: "35vh" }}>
            {assets.logo.map(el=>{
            return(<div
              class="position-absolute overflow-hidden rounded shadow-lg"
              data-aos="fade-up"
              style={el.style}
            >
            <div className="h-100 w-100"
            data-aos="image-reveal"
            data-aos-duration="700">
              <Image filename={el.file}/>
            </div>
            </div>
            )
              
            })}
          </Col>
          <Col lg="4" className="order-lg-2 align-self-center p-5 mr-0 ml-lg-5 pr-lg-0"
                        data-aos="fade-up">
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
      <Container>
        
        <p className="font-weight-bold my-5" style={{
                      alignItems:'center',
                      display:'flex'
                    }}>
                      <a>Another Project</a>
                      <div style={{
                        width:'96px',
                        margin:'0 10px',
                        borderBottom:'3px solid #354f52'
                      }}></div>
                    </p></Container>
      <Container fluid={true}>
        <Row className="order-lg-1 justify-content-lg-center">
          <Container>
          <Col xs="12" className="order-lg-1 my-5">
          <h1
            className="text-center"
            style={{fontSize:'6vh'}}
          >
            Another personal project that I learned from internet
          </h1>
            
          <p className="text-center">
          For more project you can follow my <b>
              <a href="https://www.instagram.com/miripfadhel">Instagram</a>
            </b>{" "}
            and{" "}
            <b>
              <a href="https://www.github.com/fadhelmurphy">Github</a>
            </b>
          </p>
          </Col>
          
          </Container>
          <Col xs="12" className="order-lg-2 mb-5 logo-section" style={{ minHeight: "35vh" }}>
            {assets.another.map(el=>{
            return(<div
              class="position-absolute overflow-hidden rounded shadow"
              data-aos="zoom-in"
              style={el.style}
            >
              <div className="h-100 w-100"
                    data-aos="image-reveal"
                    data-aos-duration="700">
              <Image filename={el.file}/>
            </div>
            </div>
            )
              
            })}
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default Works
