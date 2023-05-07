import personalWebImgpng from "@PubAssets/home/project/personal-web.png";
import istihImgpng from "@PubAssets/home/project/istih.png";
import enoImgpng from "@PubAssets/home/project/eno.png";
import kemenkesImgpng from "@PubAssets/home/project/kemenkes.png";
import bisacpnsImgpng from "@PubAssets/home/project/bisacpns-2020.png";
import votingImgpng from "@PubAssets/home/project/dashboard-desktop.png";
import { SliderDataType } from "./types/logo.type";

export const portoList: SliderDataType[] = [
  {
    title: "My Personal Web (Sept 2020)", 
    desc: "Build with Gatsby.js,bootstrap, and Aos.js", 
    image: personalWebImgpng.src, 
    linkObj: {
      link: "/",
      text: "Case Study"
    }
  },
  {
    title: "ISTIH (Indonesian Smart Textile Hub Industry) (Dec 2020-Feb 2021)", 
    desc: "Next.js, React.js, Redux, Redux-saga", 
    image: istihImgpng.src, 
    linkObj: {
      link: "/",
      text: "Case Study"
    }
  },
  {
    title: "ENO | Venture Mind Labs X Tujju", 
    desc: "Build with React, SWR, Chakra UI and Zustand", 
    image: enoImgpng.src, 
    linkObj: {
      link: "/",
      text: "Case Study"
    }
  },
  {
    title: "Dashboard Keluarga Sehat (Nov 2021)", 
    desc: "Build with Next.Js, Bootstrap 5, HighChart, and React Context", 
    image: kemenkesImgpng.src, 
    linkObj: {
      link: "/",
      text: "Case Study"
    }
  },
  {
    title: "BisaCPNS (May 2020)", 
    desc: "Implementing design to code with bootstrap and aos.js", 
    image: bisacpnsImgpng.src, 
    linkObj: {
      link: "/",
      text: "Case Study"
    }
  },
  {
    title: "Vote App-2 (Sept 2021)", 
    desc: "Build with React.js, antd, context state management and Laravel. Created by me and Yazid", 
    image: votingImgpng.src, 
    linkObj: {
      link: "/",
      text: "Case Study"
    }
  },
] 