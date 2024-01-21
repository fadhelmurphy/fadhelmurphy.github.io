import personalWebImgpng from '@/Assets/img/home/project/personal-web.png'
import istihImgpng from '@/Assets/img/home/project/istih.png'
import enoImgpng from '@/Assets/img/home/project/eno.png'
import kemenkesImgpng from '@/Assets/img/home/project/kemenkes.png'
import bisacpnsImgpng from '@/Assets/img/home/project/bisacpns-2020.png'
import spin from '@/Assets/img/home/project/spin.png'
import { type SliderDataType } from './types/logo.type'

export const portoList: SliderDataType[] = [
  {
    title: 'My Personal Web',
    desc: 'Build with Tailwind, Astro, and Aos.js',
    image: personalWebImgpng.src,
    linkObj: {
      link: '/',
      text: 'Case Study'
    }
  },
  {
    title: 'Sistem Perwilayahan Industri Nasional',
    desc: 'Tech Stack: <br/> PM2, Next.js, Antd, Leaflet',
    image: spin.src,
    linkObj: {
      link: '/',
      text: 'Case Study'
    }
  },
  {
    title: 'Indonesian Smart Textile Hub Industry',
    desc: 'Tech Stack: <br/> Next.js, React.js, Redux, Redux-saga',
    image: istihImgpng.src,
    linkObj: {
      link: '/',
      text: 'Case Study'
    }
  },
  {
    title: 'ENO | Venture Mind Labs X Tujju',
    desc: 'Tech Stack: <br/> React, SWR, Chakra UI and Zustand',
    image: enoImgpng.src,
    linkObj: {
      link: '/',
      text: 'Case Study'
    }
  },
  {
    title: 'Dashboard Keluarga Sehat',
    desc: 'Tech Stack: <br/> Next.Js, Bootstrap 5, HighChart, and React Context',
    image: kemenkesImgpng.src,
    linkObj: {
      link: '/',
      text: 'Case Study'
    }
  },
  {
    title: 'BisaCPNS',
    desc: 'Tech Stack: <br/> bootstrap and aos.js',
    image: bisacpnsImgpng.src,
    linkObj: {
      link: '/',
      text: 'Case Study'
    }
  }
]
