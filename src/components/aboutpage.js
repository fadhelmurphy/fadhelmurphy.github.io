import React from "react"
import { Controller, Scene } from 'react-scrollmagic';
import { Tween } from 'react-gsap';
import { Row, Col } from "reactstrap";


const AboutPage = () => {

  return (
    <div className="about-blurb" >
            <Controller>
      <Scene
        triggerElement=".about-blurb"
        duration={300}
      >
          {(progress) => (
              <>
      <div className="container">
        <div className="inner-blurb">
          <Row>
            <Col md="6">
          <div className="content">
            <h1>
              <div className="line-wrap">
              <Tween        
              staggerFrom={{
                y: 44,
                ease:'Power3.easeOut',
                delay:.8
              }}
              totalProgress={progress}
              paused
            >
                <div className="line-wrap-inner">
                  About
                </div>
                </Tween>
              </div>
            </h1>
            <Tween        
              from={{y: 20, opacity: 0, ease: 'Power3.easeOut'}}
              totalProgress={progress}
              paused
            >
            <p>
              Hello,I'm Fadhel from Jakarta,Indonesia. 
              Javascript Developer and Machine Learning enthusiast
            </p>
            </Tween>
          </div>
            </Col>
            <Col md="6">
          <div className="images">
          <h1>
              <div className="line-wrap">
              <Tween        
              staggerFrom={{
                y: -44,
                ease:'Power3.easeOut',
                delay:.8
              }}
              totalProgress={progress}
              paused
            >
                <div className="line-wrap-inner">
                  Contact
                </div>
                </Tween>
              </div>
            </h1><br/>
              <Tween        
              from={{
                x: '-50%',
                opacity:0,
                delay:.8,
                ease:'Power3.easeOut',
              }}
              totalProgress={progress}
              paused
            >
              <div className="contact-list">
              <h6>Email</h6>fadhelijlalfalah@gmail.com
              </div>
              <div className="contact-list">
              <h6>Instagram</h6>Instagram.com/lehdafijlal
              </div>
              <div className="contact-list">
              <h6>Github</h6>Github.com/fadhelmurphy
              </div>
              </Tween>
          </div>
          </Col>
          </Row>
        </div>
      </div>
      <div className="black-box"></div>
      </>
          )}
      </Scene>
      </Controller>
    </div>
  )
}

export default AboutPage