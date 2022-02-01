import { Container, Row, Col, Image, React } from "./index"

export const BlogPageHeader = () => 
{
    const siteTitle = "Blog"
return (
    <>
    <header
    className="masthead"
    // style={{
    //   backgroundImage: `url(${Image})`,
    // }}
  >
    <div class="w-100 w-md-75 mx-auto">
      <div
        class="row justify-content-center px-3"
        style={{ minHeight: "30vw" }}
      >
        <Col className="mr-auto align-self-lg-center">
          <div class="site-heading align-self-lg-center py-5">
            <h1
              style={{
                position: "absolute",
                left: "-15%",
                top: "-15%",
                fontSize: "25vw",
                WebkitTextFillColor: "white",
                WebkitTextStroke: "2px #d7eee1b3",
              }}
            >
              {"Article"}
            </h1>
            <h1 className="font-weight-normal">
              <div className="line-wrap h-25">
                <div
                  className="line-wrap-inner"
                  data-aos="fade-up"
                  data-aos-duration="400"
                  data-aos-once="true"
                  style={{
                      fontSize:"12vw"
                  }}
                >
                  {siteTitle}
                </div>
              </div>
            </h1>
          </div>
        </Col>
      </div>
    </div>
  </header>
  </>
)}