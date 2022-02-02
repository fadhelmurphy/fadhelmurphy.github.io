import { Container,Col, Row, Image, assets, React } from "./index"

export const WebList = () => (
        <>
        <div className="web-section py-3 position-relative" style={{
          background:"#fff"
        }}>
            <div className="my-5 justify-content-center px-3 position-absolute appdevtext"
            >
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
        <div className="line-wrap h-25 overflow-hidden">
                <h1
                  data-aos="fade-up"
                  data-aos-duration="600"
                  className="line-wrap-inner"
                  style={{ fontWeight: 600}}
                >
                  App
                </h1>
                </div>
        <div className="line-wrap h-25 overflow-hidden">
                <h1
                  data-aos="fade-up"
                  data-aos-duration="600"
                  className="line-wrap-inner custom-border-bottom"
                  style={{ fontWeight: 600 }}
                >
                  Development
                </h1>
                </div>
              </div>                                                                                          
              <div className="my-5 justify-content-between px-3 mx-auto w-100 w-md-75 row">
                {assets.web.map((el,i) => {
                  const isEven = (i+1)%2==0
                  return (
                    <Col xs="12" md="6" className="webelement pr-md-5" 
                    >
                      <div className={"flex-row mr-lg-0 mx-auto " + el.className[1]}>
                        <div
                          class="overflow-hidden"
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
                      <div className={"flex-row mr-lg-0 mx-auto " + el.className[1]}>
                        <div
                          class="overflow-hidden"
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
                            style={{
                              background:"#7bc678"
                            }}
                          >
                            <Image style={{
                              transform:"scale(0.8)",
                              borderRadius:"15px",
                              alignSelf:"center"
                            }} filename={el.file} />
                          </div>
                        </div>
                      </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={
                          "flex-row align-self-center ml-lg-0 py-4 mb-3 mx-auto " + el.className[0]
                        }
                      >
                        <div className="line-wrap h-25 overflow-hidden">
                        <h4 className="line-wrap-inner text-capitalize"
                        data-aos="up-skew"
                        data-aos-duration="500">{el.judul}</h4>
                        </div>
                        <div className="line-wrap h-25 overflow-hidden">
                        <h5 className="line-wrap-inner mt-0 mb-3 font-weight-normal"
                        style={{
                          opacity:"0.75"
                        }}
                        data-aos="up-skew"
                        data-aos-duration="600"
                        >{el.desc}</h5>
                        </div>
                        <div className="flex flex-row">
                        <a
                        className="font-weight-bold align-self-center"
                          href={el.link}
                          target="_blank"
                        data-aos="fade-up"
                        data-aos-duration="800"
                          style={{
                            alignItems: "center",
                            display: "inline-flex",
                          }}
                        >
                          {"Detail →"}
                        </a>
        
                        </div>
                      </div>
                    </Col>
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
        
              </div>
              
        </div>
        {/* <div className="border-bottom mt-n5 pb-5">
    <Container>
      <Row
        className="text-center justify-content-between"
        data-aos="fade-up"
      >
        <Col md="12" className="text-center text-break align-self-center">
          <p>
            <a
              class="btn btn-outline-secondary border text-capitalize"
              href="#"
              role="button"
              style={{ borderRadius: "30px" }}
            >
              All work →
            </a>
          </p>
        </Col>
      </Row>
    </Container>
        </div> */}
        </>
    )