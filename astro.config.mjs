import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import { prefix } from './consts/config'
import remarkToc from 'remark-toc'
import rehypeMinifyHtml from 'rehype-preset-minify'

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
  server: { port: 3000, host: true },
  integrations: [mdx({
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'dracula' },
    remarkPlugins: [remarkToc],
    rehypePlugins: [rehypeMinifyHtml],
    remarkRehype: { footnoteLabel: 'Footnotes' },
    gfm: true
  }), tailwind(), react()],
  // site: `http://localhost:3000${prefix}`,
  output: 'static',
  base: prefix,
  // base prefix
  assetsPrefix: prefix // asset prefix
  // publicDir: prefix,
  // build: {
  //   assetsPrefix: prefix
  // },
})
