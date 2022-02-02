import { Container, Row, Col, Image, React } from "./index"

export const ProjectPageHeader = () => 
{
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
                <h1>
                Commercial & Personal Project
            </h1>
          </div>
        </Col>
      </div>
    </div>
  </header>
  </>
)}