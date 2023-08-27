import { SliderDataType } from "Consts/types/logo.type";
import webpackImgpng from "@PubAssets/home/stack-slider/webpack.png";
import nextjsImgpng from "@PubAssets/home/stack-slider/nextjs-icon.png";
import gatsbyImgpng from "@PubAssets/home/stack-slider/gatsby-icon.png";
import flutterImgpng from "@PubAssets/home/stack-slider/flutter.png";
import tensorflowImgpng from "@PubAssets/home/stack-slider/tensorflow-logo.png";
import mysqlImgpng from "@PubAssets/home/stack-slider/mysql.png";
import laravelImgpng from "@PubAssets/home/stack-slider/laravel.png";

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

export const TopHeaderMenuConst: SliderDataType[] = [
  {
    text: "Instagram",
    href: "https://instagram.com/berseberangan",
    icon: `
    <svg class="h-7 w-7 text-red-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="4" width="16" height="16" rx="4" />  <circle cx="12" cy="12" r="3" />  <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" /></svg>
    `,
  },
  {
    text: "Linkedin",
    href: "https://linkedin.com/fadhelijlalfalah",
    icon: `<svg class="h-7 w-7 text-red-500"  width="24" height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />  <rect x="2" y="9" width="4" height="12" />  <circle cx="4" cy="4" r="2" /></svg>`,
  },
];
