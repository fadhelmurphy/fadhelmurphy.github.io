import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

import image from '@astrojs/image'
import { prefix } from './consts/config'

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
    // Choose from Shiki's built-in themes (or add your own)
    // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'one-dark-pro',
      // Enable word wrap to prevent horizontal scrolling
      wrap: true
    }
  },
  integrations: [mdx(), tailwind(), react(), image()],
  // site: `http://localhost:3000${prefix}`,
  base: prefix, // base prefix
  assetsPrefix: prefix // asset prefix
  // publicDir: prefix,
  // build: {
  //   assetsPrefix: prefix
  // },
  // output: 'server',
})
