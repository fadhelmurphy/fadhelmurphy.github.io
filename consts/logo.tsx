import {SliderDataType} from "Consts/types/logo.type";
import webpackImgpng from "../public/home/stack-slider/webpack.png";
import nextjsImgpng from "../public/home/stack-slider/nextjs-icon.png";
import gatsbyImgpng from "../public/home/stack-slider/gatsby-icon.png";
import flutterImgpng from "../public/home/stack-slider/flutter.png";
import tensorflowImgpng from "../public/home/stack-slider/tensorflow-logo.png";
import mysqlImgpng from "../public/home/stack-slider/mysql.png";
import laravelImgpng from "../public/home/stack-slider/laravel.png";

export const SliderData: SliderDataType[] = [
  {
    type: "text",
    text: "React",
  },
  {
    type: "image",
    url: webpackImgpng.src,
    alt: "webpack fadhel",
  },
  {
    type: "image",
    url: nextjsImgpng.src,
    alt: "nextjs fadhel",
  },
  {
    type: "image",
    url: gatsbyImgpng.src,
    alt: "gatsby fadhel",
  },
  {
    type: "image",
    url: flutterImgpng.src,
    alt: "flutter fadhel",
  },
  {
    type: "text",
    text: "MobX",
  },
  {
    type: "text",
    text: "Zustand",
  },
  {
    type: "text",
    text: "Redux",
  },
  {
    type: "image",
    url: tensorflowImgpng.src,
    alt: "tensorflow fadhel",
  },
  {
    type: "text",
    text: "Sklearn",
  },
  {
    type: "text",
    text: "Express.js",
  },
  {
    type: "image",
    url: mysqlImgpng.src,
    alt: "mysql fadhel",
  },
  {
    type: "image",
    url: laravelImgpng.src,
    alt: "laravel fadhel",
  },
  {
    type: "text",
    text: "GraphQL",
  },
  {
    type: "text",
    text: "MongoDB",
  },
];