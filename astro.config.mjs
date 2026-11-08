import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

// `shaders` ships a registry that imports every component; swap it for one with only what we use.
const slimRegistry = fileURLToPath(new URL('./src/lib/shaders-registry.js', import.meta.url))
const shadersSlim = {
  name: 'shaders-slim-registry',
  enforce: 'pre',
  resolveId (source, importer) {
    if (!importer || !importer.includes('/node_modules/shaders/dist/')) return null
    if (/(^|\/)registry\.js$/.test(source) || /shaderRegistry-[\w-]+\.js$/.test(source)) return slimRegistry
    return null
  }
}

export default defineConfig({
  site: 'https://fadhelpop.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  markdown: { shikiConfig: { theme: 'github-dark-dimmed', wrap: true } },
  build: { inlineStylesheets: 'always' },
  vite: { plugins: [shadersSlim, tailwindcss()] }
})
