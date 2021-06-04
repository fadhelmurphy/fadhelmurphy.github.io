
import PropTypes from "prop-types"
import React from "react"
import { Helmet } from "react-helmet"
import {Col} from "reactstrap"
const Header = ({ siteTitle, postInfo }) => {
  if (postInfo) {
    var { postTitle, postDate } = postInfo
    siteTitle = postTitle
  }
  return (
    <>

      <header
        className="masthead"
        // style={{
        //   backgroundImage: `url(${Image})`,
        // }}
      >
        <div class="container">
          <div class="row justify-content-center px-3" style={{minHeight:'50vw'}}>
            <Col className="mr-auto align-self-lg-center">
              <div class="site-heading align-self-lg-center py-5">
                <h1 style={{
                  position:'absolute',
                  left:'-15%',
                  top:'-15%',
                  fontSize:'20vw',
                  WebkitTextFillColor:'white',
                  WebkitTextStroke:'2px #d7eee1b3'
                }}>
                      {siteTitle}
                </h1>
                {!postDate?
                <div className="line-wrap h-75">
                <h4
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-once="true"
                className="mx-2 my-3">
                  Hello, I'm 
                </h4>
                </div>
              :null}
                <h1>
                  <div className="line-wrap h-75">
                    <div
                      className="line-wrap-inner"
                      data-aos="fade-up"
                      data-aos-duration="600"
                      data-aos-once="true"
                    >
                      {siteTitle}
                    </div>
                  </div>
                </h1>
                {postDate ? (
                  <div class="subheading">
                  <h3
                    data-aos="zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-duration="700">
                <div class="reveal-holder" data-aos="reveal-item">
          <div class="reveal-block left" data-aos="reveal-left"></div>
                  {postDate}
                  </div>
                  </h3>
                  </div>
                ) : (
                  <>
                    <div class="subheading">
                      <h3
                        data-aos="zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-duration="800">
                    <div class="reveal-holder" data-aos="reveal-item">
              <div class="reveal-block left" data-aos="reveal-left"></div>
                      An
                      </div>
                      </h3>
                      <h3
                        data-aos="zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-duration="1000">
                    <div class="reveal-holder" data-aos="reveal-item">
              <div class="reveal-block left" data-aos="reveal-left"></div>
                      Ordinary
                      </div>
                      </h3>
                      <h3
                        data-aos="zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-duration="1200">
                    <div class="reveal-holder" data-aos="reveal-item">
              <div class="reveal-block left" data-aos="reveal-left"></div>
                      Developer
                      </div>
                      </h3>
                    </div>
                  </>
                )}
              </div>
            </Col>
          </div>
          
        </div>
      </header>
    </>
  )
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

// Header.defaultProps = {
//   siteTitle: ``,
// }

export default Header
