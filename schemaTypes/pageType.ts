import { defineField, defineArrayMember, defineType, SanityDocument } from 'sanity'
import { GetSlugSource } from './components/GetSlugSource'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export const pageType = defineType({
    name: 'page',
    title: 'Sida',
    type: 'document',
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({ type: "page" }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'parentPage',
            title: 'Översida',
            description: "Vilken sida ska denna synas som menyval hos? Glöm inte att uppdatera slugen",
            type: 'reference', 
            to: [{ type: 'page' }],
            options: {
                disableNew: true,
            }
        }),
        defineField({
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            description: 'Stämmer slugen med menyn sidan finns hos?',
            options: {
                // TODO: When it works, why error, hmmm?
                source: GetSlugSource,
                slugify: input => input,
            },
            validation: (rule) => rule.required(),
        }),
        {
            name: 'imagesTop',
            title: 'Bilder',
            type: 'array',
            description: "Lägg till bilder som du vill ska visas på toppen av innehållet",
            of: [
                defineField({
                    name: 'image',
                    title: 'Bild',
                    type: 'image',
                    options: {hotspot: true},
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alternativ text för skärmläsare',
                            type: 'string',
                        },
                        {
                            name: 'position',
                            title: 'Position',
                            type: 'array',
                            description: "Välj bilden/ernas position, om du väljer till höger eller vänster så tar den ca halva bredden, väljer du centrerad så tar den hela bredden och hamnar över dom mindre bilderna, om du väljer att ha både och.",
                            of: [{type: "string"}],
                            options: {
                                list: [
                                    {title: "Till höger", value: "right"},
                                    {title: "Till vänster", value: "left"},
                                    {title: "Centrerad", value: "center"}
                                ]
                            },
                            validation: (rule) => rule.max(1),
                        },
                    ],
                }),
            ],
            options: {
                layout: 'grid',
            },
        },
        defineField({
            name: 'content',
            title: 'Innehåll', 
            type: 'array', 
            of: [{type: 'block'}],
            description: 'Sidans innehåll. Obs, det är för närvarande en bug (aug 2024) som gör att det inte går att copy-pastea i firefox.',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'pageBuilder',
            title: 'Artist Alley',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [
                        {type: 'artistAlley'}
                        // etc...
                    ]
                }
            ],
        }),
        {
            name: 'imagesBottom',
            title: 'Bilder',
            type: 'array',
            description: "Lägg till bilder som du vill ska visas på botten av innehållet",
            of: [
                defineField({
                    name: 'image',
                    title: 'Bild',
                    type: 'image',
                    options: {hotspot: true},
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alternativ text för skärmläsare',
                            type: 'string',
                        },
                    ],
                }),
            ],
            options: {
                layout: 'grid',
            },
        },
    ],
    preview: {
        select: {
            title: 'title',
            parentPage: 'parentPage.title',
        },
        prepare({title, parentPage}) {
        
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
