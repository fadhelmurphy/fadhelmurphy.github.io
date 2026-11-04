import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://fadhelpop.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  markdown: { shikiConfig: { theme: 'github-dark-dimmed', wrap: true } },
  build: { inlineStylesheets: 'always' },
  vite: { plugins: [tailwindcss()] }
})
