import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

export const nonprofitOrganizationType = defineType({
    name: 'nonprofitOrganization',
    title: 'Förening',
    type: 'document',
    orderings: [orderRankOrdering],

    fields: [
        orderRankField({ type: "nonprofitOrganization" }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Bild',
            type: 'image',
            options: {hotspot: true},
        }),
        defineField({
            name: 'alt',
            title: 'Alternativ bild-text för skärmläsare',
            type: 'string',
        }),
        defineField({
            name: 'links',
            title: 'Föreningens sidor',
            type: 'array',
            of: [
                defineField({
                    name: 'link',
                    title: 'Länk',
                    type: 'url'
                }),
            ]
        }),
        defineField({
            name: 'description',
            title: 'Beskrivning',
            type: 'text',
        })
    ],
})