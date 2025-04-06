import { defineConfig, passthroughImageService } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import { prefix } from './consts/config'
import remarkToc from 'remark-toc'
import rehypeMinifyHtml from 'rehype-preset-minify'
import sitemap from '@astrojs/sitemap';
import 'dotenv/config';

console.log('[DEBUG] site:', process.env.PUBLIC_ROOT_DOMAIN);
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
  }), tailwind(), react({ babel: { plugins: [['styled-jsx/babel', { optimizeForSpeed: true }]] } }),
  sitemap()
],
  image: {
    service: passthroughImageService()
  },
  // site: `http://localhost:3000${prefix}`,
  compressHTML: true,
  output: 'static',
  base: prefix,
  site: "https://fadhelmurphy.github.io",
  // base prefix
  assetsPrefix: prefix // asset prefix
  // publicDir: prefix,
  // build: {
  //   assetsPrefix: prefix
  // },
})
