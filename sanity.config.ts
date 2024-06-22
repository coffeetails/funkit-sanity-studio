import {defineConfig, isDev} from 'sanity'
import {visionTool} from '@sanity/vision'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'
import {structure} from "./structure"

const devOnlyPlugins = [getStartedPlugin()]

export default defineConfig({
  name: 'default',
  title: 'Funkit',

  projectId: 'qz5ctn66',
  dataset: 'production',

  plugins: [
    structureTool({structure}), 
    visionTool(), 
    ...(isDev ? devOnlyPlugins : [])],

  schema: {
    types: schemaTypes,
  },
})

