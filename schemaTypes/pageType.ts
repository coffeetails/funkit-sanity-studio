import { defineField, defineType, SanityDocument } from 'sanity'
import { GetSlugSource } from './components/GetSlugSource'

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
                // TODO: When it works, why error, hmmm?
                source: GetSlugSource,
                slugify: input => input,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'parentPage',
            title: 'Översida',
            description: "Vilken sida ska denna synas som menyval hos?",
            type: 'reference', 
            to: [{ type: 'page' }],
            options: {
                disableNew: true,
            }
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
    preview: {
        select: {
            title: 'title',
            parentPage: 'parentPage.title',
        },
        prepare({title, parentPage}) {
           console.log("parentPage", parentPage);
           
        
            return {
                title: title,
                subtitle: parentPage ? `Meny under ${parentPage}` : ``
            }
        },
    },
})

function get(doc: SanityDocument, arg1: string) {
    throw new Error('Function not implemented.')
}
