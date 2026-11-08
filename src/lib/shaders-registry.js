// Slim stand-in for the `shaders` package registry: only the components the About page uses.
// The package's own registry statically imports all 200+ shaders (~2.7 MB); astro.config aliases it here.
import { componentDefinition as FractalNoise } from 'shaders/core/FractalNoise'
import { componentDefinition as ContourLines } from 'shaders/core/ContourLines'
import { componentDefinition as CursorRipples } from 'shaders/core/CursorRipples'
import { componentDefinition as FilmGrain } from 'shaders/core/FilmGrain'
import { componentDefinition as FlowingGradient } from 'shaders/core/FlowingGradient'
import { componentDefinition as LightLeak } from 'shaders/core/LightLeak'
import { componentDefinition as ImageTexture } from 'shaders/core/ImageTexture'

const defs = { FractalNoise, ContourLines, CursorRipples, FilmGrain, FlowingGradient, LightLeak, ImageTexture }
const shaderRegistry = {}
for (const [fileName, def] of Object.entries(defs)) {
  const propsMetadata = {}
  for (const [k, v] of Object.entries(def.props || {})) propsMetadata[k] = { ui: v.ui, default: v.default, description: v.description }
  shaderRegistry[def.name] = { name: def.name, fileName, category: def.category || 'Uncategorized', definition: def, propsMetadata }
}
const getAllShaders = () => Object.values(shaderRegistry)
const getShaderByName = (name) => shaderRegistry[name]
const getShadersByCategory = (c) => getAllShaders().filter((s) => s.category === c)
const getShaderCategories = () => [...new Set(getAllShaders().map((s) => s.category))].sort()

export { shaderRegistry, getAllShaders, getShaderByName, getShadersByCategory, getShaderCategories }
export { shaderRegistry as a, getShadersByCategory as i, getShaderByName as n, getShaderCategories as r, getAllShaders as t }
