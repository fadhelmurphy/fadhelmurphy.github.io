import { getImage } from 'astro:assets'
import type { SliderDataType } from './types/logo.type'
import personalWebImgpng from '@/Assets/img/home/project/personal-web.png'
import istihImgpng from '@/Assets/img/home/project/istih.png'
import enoImgpng from '@/Assets/img/home/project/eno.png'
import kemenkesImgpng from '@/Assets/img/home/project/kemenkes.png'
import bisacpnsImgpng from '@/Assets/img/home/project/bisacpns-2020.png'
import spin from '@/Assets/img/home/project/spin.png'

// Preload images before exporting getPortoList
const images = {
  personalWebImg: await getImage({ src: personalWebImgpng, format: 'webp' }),
  spinImg: await getImage({ src: spin, format: 'webp' }),
  istihImg: await getImage({ src: istihImgpng, format: 'webp' }),
  enoImg: await getImage({ src: enoImgpng, format: 'webp' }),
  kemenkesImg: await getImage({ src: kemenkesImgpng, format: 'webp' }),
  bisacpnsImg: await getImage({ src: bisacpnsImgpng, format: 'webp' })
}

export function getPortoList (): SliderDataType[] {
  return [
    {
      title: 'My Personal Web',
      desc: 'Build with Tailwind, Astro, and Aos.js',
      image: images.personalWebImg.src,
      linkObj: {
        link: '/',
        text: 'Case Study'
      }
    },
    {
      title: 'Sistem Perwilayahan Industri Nasional',
      desc: 'Tech Stack: <br/> PM2, Next.js, Antd, Leaflet',
      image: images.spinImg.src,
      linkObj: {
        link: '/',
        text: 'Case Study'
      }
    },
    {
      title: 'Indonesian Smart Textile Hub Industry',
      desc: 'Tech Stack: <br/> Next.js, React.js, Redux, Redux-saga',
      image: images.istihImg.src,
      linkObj: {
        link: '/',
        text: 'Case Study'
      }
    },
    {
      title: 'ENO | Venture Mind Labs X Tujju',
      desc: 'Tech Stack: <br/> React, SWR, Chakra UI and Zustand',
      image: images.enoImg.src,
      linkObj: {
        link: '/',
        text: 'Case Study'
      }
    },
    {
      title: 'Dashboard Keluarga Sehat',
      desc: 'Tech Stack: <br/> Next.Js, Bootstrap 5, HighChart, and React Context',
      image: images.kemenkesImg.src,
      linkObj: {
        link: '/',
        text: 'Case Study'
      }
    },
    {
      title: 'BisaCPNS',
      desc: 'Tech Stack: <br/> bootstrap and aos.js',
      image: images.bisacpnsImg.src,
      linkObj: {
        link: '/',
        text: 'Case Study'
      }
    }
  ]
}
