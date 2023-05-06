import personalWebImgpng from "@PubAssets/home/project/personal-web.png";
import istihImgpng from "@PubAssets/home/project/istih.png";
import enoImgpng from "@PubAssets/home/project/eno.png";
import kemenkesImgpng from "@PubAssets/home/project/kemenkes.png";
import { SliderDataType } from "./types/logo.type";

export const portoList: SliderDataType[] = [
  {
    title: "My Personal Web (Sept 2020)", 
    desc: "Build with Gatsby.js,bootstrap, and Aos.js", 
    image: personalWebImgpng.src, 
    linkObj: {
      link: "/",
      text: "DETAIL"
    }
  },
  {
    title: "ISTIH (Indonesian Smart Textile Hub Industry) (Dec 2020-Feb 2021)", 
    desc: "Next.js, React.js, Redux, Redux-saga", 
    image: istihImgpng.src, 
    linkObj: {
      link: "/",
      text: "DETAIL"
    }
  },
  {
    title: "ENO | Venture Mind Labs X Tujju", 
    desc: "Build with React, SWR, Chakra UI and Zustand", 
    image: enoImgpng.src, 
    linkObj: {
      link: "/",
      text: "DETAIL"
    }
  },
  {
    title: "Dashboard Keluarga Sehat (Nov 2021)", 
    desc: "Build with Next.Js, Bootstrap 5, HighChart, and React Context", 
    image: kemenkesImgpng.src, 
    linkObj: {
      link: "/",
      text: "DETAIL"
    }
  },
] 