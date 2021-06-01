
import PropTypes from "prop-types"
import React from "react"
import { Helmet } from "react-helmet"
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
          <div class="row justify-content-center px-5 pt-5">
            <div class="mr-auto align-self-lg-center">
              <div class="site-heading my-5 py-5">
                <h1 style={{
                  position:'absolute',
                  left:'0%',
                  top:'15%',
                  fontSize:'20vw',
                  WebkitTextFillColor:'white',
                  WebkitTextStroke:'2px #d7eee1b3'
                }}>
                      {siteTitle}
                </h1>
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
                    <p
                    data-aos="fade-up"
                    data-aos-duration="700"
                    data-aos-once="true"
                    className="mt-0">
                      Hello, I'm Fadhel. App developer from Jakarta.
                    </p>
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
            </div>
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
