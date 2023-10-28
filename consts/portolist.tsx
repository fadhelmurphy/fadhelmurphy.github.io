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
    title: 'SPIN',
    desc: 'Period: Dec 2022 - Mar 2023. <br/>Tech Stack: PM2, Next.js, Antd, Leaflet',
    image: spin.src,
    linkObj: {
      link: '/',
      text: 'Case Study'
    }
  },
  {
    title: 'ISTIH (Indonesian Smart Textile Hub Industry)',
    desc: 'Period: Dec 2020 - Feb 2021. <br/>Tech Stack: Next.js, React.js, Redux, Redux-saga',
    image: istihImgpng.src,
    linkObj: {
      link: '/',
      text: 'Case Study'
    }
  },
  {
    title: 'ENO | Venture Mind Labs X Tujju',
    desc: 'Period: Mar - May 2022. <br/>Tech Stack: Build with React, SWR, Chakra UI and Zustand',
    image: enoImgpng.src,
    linkObj: {
      link: '/',
      text: 'Case Study'
    }
  },
  {
    title: 'Dashboard Keluarga Sehat',
    desc: 'Period: Nov 2021 - Jan 2022. <br/>Tech Stack: Build with Next.Js, Bootstrap 5, HighChart, and React Context',
    image: kemenkesImgpng.src,
    linkObj: {
      link: '/',
      text: 'Case Study'
    }
  },
  {
    title: 'BisaCPNS',
    desc: 'Period: May 2020. <br/>Implementing design to code with bootstrap and aos.js',
    image: bisacpnsImgpng.src,
    linkObj: {
      link: '/',
      text: 'Case Study'
    }
  }
]
