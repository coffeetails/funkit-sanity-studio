import { defineField, defineType, SanityClient, SanityDocument, useClient } from 'sanity'
import { parentSlugify, Slugifyer } from './components/Slugifyer'
import { MyCustomStringInput } from './components/MyCustomStringInput'
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
