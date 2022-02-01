import { Container, Row, Col, Image, assets, React } from "./index"

export const AboutPageHeader = () => {
    const {useEffect} = React

    
  useEffect(() => {
    let elements = document.querySelectorAll(".word")
    for (let i = 0, l = elements.length; i < l; i++) {
      let str = elements[i].textContent
      elements[i].innerHTML = ""
      let dur = 400
      for (let j = 0, ll = str.length; j < ll; j++) {
        let spn = document.createElement("span")
        elements[i].appendChild(spn)
        spn.textContent = str[j]
        // j % 2
        //   ? spn.setAttribute("data-aos", "titleup")
        //   : spn.setAttribute("data-aos", "titledown")
        // if (spn.textContent !== " ")
        dur = dur + 100
        spn.setAttribute("data-aos", "titledown")
        spn.setAttribute("data-aos-duration", dur)
        spn.setAttribute("data-aos-once", "true")
      }
    }
  })
    return (
    
    <div className="w-100 w-md-75 mx-auto pt-5 mt-5">
    <Row className="p-3 p-md-5 pb-md-0" >
      <Col
        style={{
          position: "absolute",
          top: "0",
          right: "0",
        }}
      >
        <h1
          style={{
            fontSize: "20vw",
            fontWeight: "600",
            color: "#d7eee1b3",
            letterSpacing: "1rem",
            WebkitTextFillColor: "white",
            WebkitTextStroke: "2px #d7eee1b3",
          }}
        >
          Who?
        </h1>
      </Col>
      <Col>
            <h1>
              
        <div className="line-wrap h-25 overflow-hidden">
        <div
          className="word line-wrap-inner"
          style={{
            fontSize:"7vw"
          }}
        >
         Fadhel&nbsp;Ijlal&nbsp;Falah
        </div>
          </div>
            </h1>
      </Col>
    </Row>
  </div>
)}