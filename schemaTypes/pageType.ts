import { defineField, defineType, SanityClient, SanityDocument, useClient } from 'sanity'
import { parentSlugify } from './components/ParentSlugify'
import { MyCustomStringInput } from './components/MyCustomStringInput'

export const pageType = defineType({
    name: 'page',
    title: 'Sida',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                maxLength: 200, // will be ignored if slugify is set
                source: async (document, {getClient}) => {
                    console.log("document", document);
                    
                    const {
                      parentPage: {_ref},
                      title,
                    } = document;
                    const client = getClient({apiVersion: '2024-08-19'});
                    const parentSlug = await client.fetch(`*[_id == $id][0].slug.current`, {id: _ref});
                    // return [parentSlug, slugify(title, {lower: true})];
                    return [parentSlug, title];
                  },
                  slugify: (source) => source.join('/')
                // source: 'title',
                // slugify: parentSlugify,
                // slugify: input => input
                //     .slice(0, 200)
                //     .toLowerCase()
                //     .replaceAll(/\s+/g, '-')
                //     .replaceAll(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=]/g, '')
                //     .replaceAll(/-{2,}/g, '')
                //     .replaceAll(/[æÆ]/g, 'ae')
                //     .replaceAll(/[åÅäÄ]/g, 'a')
                //     .replaceAll(/[öÖøØ]/g, 'o')
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'parentPage',
            title: 'Parent page',
            type: 'reference', 
            to: [{ type: 'page' }]
        }),
        defineField({
            name: 'isParentPage',
            title: 'Ska denna sidan ha en egen meny?',
            type: 'boolean',
            initialValue: true,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'childpage',
            title: 'Sidor i menyn',
            type: 'array',
            of: [{ 
                type: 'reference', 
                to: [{ type: 'page' }]
            }],
            hidden: ({value, document}) => !value && document?.isParentPage === false,
        }),
        defineField({
            name: 'content',
            title: 'Innehåll', 
            type: 'array', 
            of: [{type: 'block'}],
            description: 'Sidans innehåll. Obs, det är för närvarande en bug (aug 2024) som gör att det inte går att copy-pastea i firefox.',
            validation: (rule) => rule.required(),
        }),
    ],
})

function get(doc: SanityDocument, arg1: string) {
    throw new Error('Function not implemented.')
}
