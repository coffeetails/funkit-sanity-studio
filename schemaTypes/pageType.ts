import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Sida',
  type: 'document',
  fields: [
        defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        }),
        defineField({
            name: 'parentpage',
            title: 'Ska denna sidan ha undersidor?',
            type: 'boolean'
        }),
        defineField({
            name: 'subpages',
            title: 'Under-sidor',
            type: 'string',
            description: 'vilka sidor som ska höra ihop och synas i menyn.',
        }),
        defineField({
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 200, // will be ignored if slugify is set
                slugify: input => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .slice(0, 200)
            },
        }),
        defineField({
            name: 'content',
            title: 'Innehåll', 
            type: 'array', 
            of: [{type: 'block'}],
            description: 'Sidans innehåll. Obs, det är för närvarande en bug (aug 2024) som gör att det inte går att copy-pastea i firefox.',
        }),
    ],
})