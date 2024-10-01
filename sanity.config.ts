import {defineConfig, isDev} from 'sanity';
import {visionTool} from '@sanity/vision';
import {structureTool} from 'sanity/structure';
import {schemaTypes} from './schemaTypes';
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial';
import {structure} from './structure';
import {defaultDocumentNode} from './structure/defaultDocumentNode';
import {colorInput} from '@sanity/color-input';
import { iconify } from 'sanity-plugin-iconify';

const devOnlyPlugins = [getStartedPlugin()]

export default defineConfig({
    name: 'default',
    title: 'Funkit',

    projectId: 'qz5ctn66',
    dataset: 'production',

    plugins: [
        structureTool({structure, defaultDocumentNode}), 
        visionTool(), 
        colorInput(),
        iconify({
            // Optional configuration
        
            // Filter icons by collection for all Icon fields (this field has typed autocomplete ✨)
            // Defaults to empty array (all collections)
            collections: ['mingcute'],
        
            // Shows the selected icon name and collection underneath the icon picker
            // Defaults to false
            showName: true,
        }),
        ...(isDev ? devOnlyPlugins : [])],

    schema: {
        types: schemaTypes,
    },
})

