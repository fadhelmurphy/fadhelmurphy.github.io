import React,{useRef,useEffect} from "react"
import { useStaticQuery, graphql } from "gatsby"
import {TimelineLite,Power3} from 'gsap' 
import $ from "jquery"
import Img from "gatsby-image"
import { Link } from "gatsby"


const AboutBlurb = () => {
  const data = useStaticQuery(graphql`
    query {
      flower: file(relativePath: { eq: "flower-mouth.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      fist: file(relativePath: { eq: "fist.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  let app = useRef(null)
  let images = useRef(null)
  let content = useRef(null)

  let tl = new TimelineLite()
  useEffect(()=>{
    //images var
    const right = images.firstElementChild
    const left = images.lastElementChild
    //contents var
    const title = content.children[0].children[0].children[0]
    const text = content.children[1]


      tl.to(app,0,{css:{visibility:'visible'}})
      tl.to(content,0,{css:{visibility:'visible'}})
        //Images animation
      tl.from(right,1.2,{y:1280,ease:Power3.easeOut}, 'Start')
      .from(right.firstElementChild,2,{scale:1.6,ease:Power3.easeOut},.2)
      .from(left,1.2,{y:1280,ease:Power3.easeOut},.2)
      .from(left.firstElementChild,2,{scale:1.6,ease:Power3.easeOut},.2)
    //console.log(title)
      //content animation
      tl.staggerFrom([title ], 1, {
        y: 44,
        ease:Power3.easeOut,
        delay:.8
      },.15, 'Start')
      .from(text,1, {y: 20, opacity: 0, ease: Power3.easeOut}, 1.4)
  }, [tl])
  return (
    <div className="about-blurb"  ref={el => app = el}>
      <div className="container">
        <div className="inner-blurb">
          <div className="content"  ref={el => content = el}>
            <h1>
              <div className="line-wrap">
                <div className="line-wrap-inner">
                  About
                </div>
              </div>
            </h1>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using ‘Content here,
              content here’, making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for ‘lorem ipsum’ will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
            <div className="btn-row">
              <Link to="/work">View Series</Link>
            </div>
          </div>
          <div className="images" ref={el => images = el}>
            <div className="top-right">
              <Img fluid={data.fist.childImageSharp.fluid} />
            </div>
            <div className="bottom-left">
              <Img fluid={data.flower.childImageSharp.fluid} />
            </div>
          </div>
        </div>
      </div>
      <div className="black-box"></div>
      <div className="black-box overlay"></div>
    </div>
  )
}

export default AboutBlurb