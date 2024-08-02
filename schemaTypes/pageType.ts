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
        // defineField({
        //     name: 'pagerelations',
        //     title: 'Sidlänkar',
        //     type: 'object',
        //     fields: [
        //         {
        //             name: 'parentpage',
        //             title: 'Ska denna sidan ha en egen meny?',
        //             type: 'boolean'
        //         },{
        //             name: "childpage",
        //             title: "Sidor i menyn",
        //             type: "reference",
        //             to: [{ type: "page" }],
        //             hidden: ({value, document}) => !value && document?.parentpage === false,
        //             validation: (rule) => 
        //                 rule.custom((value, context) => {
        //                     if(value && context?.document?.parentpage === false) {
        //                         return "Only in-person events can have a venue";
        //                     }
        //                     return true;
        //                 }),
        //         }
        //     ]
        // }),
        defineField({
            name: 'parentpage',
            title: 'Ska denna sidan ha en egen meny?',
            type: 'boolean'
        }),
        defineField({
            name: 'childpage',
            title: 'Sidor i menyn',
            type: 'array',
            of: [{ 
                type: 'reference', 
                to: [{ type: 'page' }]
            }],
            hidden: ({value, document}) => !value && document?.parentpage === false,
        }),
        // defineField({
        //     name: "childpage",
        //     title: "Sidor i menyn",
        //     type: "reference",
        //     to: [{ type: "page" }],
        //     hidden: ({value, document}) => !value && document?.parentpage === false,
        // }),
        defineField({
            name: 'content',
            title: 'Innehåll', 
            type: 'array', 
            of: [{type: 'block'}],
            description: 'Sidans innehåll. Obs, det är för närvarande en bug (aug 2024) som gör att det inte går att copy-pastea i firefox.',
        }),
    ],
})