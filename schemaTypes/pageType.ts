import { defineField, defineType, SanityClient, SanityDocument, useClient } from 'sanity'
import { parentSlugify } from './components/ParentSlugify'

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
                source: 'title',
                // source: '_id',
                
                // slugify: parentSlugify,
                slugify: async (input) => {
                    const client = useClient({apiVersion: '2024-01-01'});
                    
                    const query = `*[_type=='movie' && references(^._id)]{ 
                        title,
                        'parentSlug': page->.slug.current,
                    }`;

                    // const document = await client.fetch(query, { id: `**${input}`});
                    const document = await client.fetch(query);
                    console.log("document", document);
                    
                    const {
                        title,
                        parentSlug,
                    } = document;
                    
                    return `${parentSlug}/${title}`
                }
                
                // slugify: input => {
                    
                //     return input
                //     .slice(0, 200)
                //     .toLowerCase()
                //     .replaceAll(/\s+/g, '-')
                //     .replaceAll(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=]/g, '')
                //     .replaceAll(/-{2,}/g, '')
                //     .replaceAll(/[æÆ]/g, 'ae')
                //     .replaceAll(/[åÅäÄ]/g, 'a')
                //     .replaceAll(/[öÖøØ]/g, 'o')
                // }
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'parentReference',
            title: 'isParentPage:',
            // readOnly: true,
            type: 'reference', 
            to: [{ type: 'page' }],
            // initialValue: ,
            hidden: ({value, document}) => {
                console.log("value", value);
                console.log("document", document);
                return false;
            },
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
        // defineField({
        //     name: "childpage",
        //     title: "Sidor i menyn",
        //     type: "reference",
        //     to: [{ type: "page" }],
        //     hidden: ({value, document}) => !value && document?.isParentPage === false,
        // }),
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
