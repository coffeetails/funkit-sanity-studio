import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

export const sponsorType = defineType({
    name: 'sponsor',
    title: 'Sponsor',
    type: 'document',
    orderings: [orderRankOrdering],

    fields: [
        orderRankField({ type: "sponsor" }),
        defineField({
            name: 'name',
            title: 'Sponsornamn',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'link',
            title: 'Länk till sponsorns sida',
            type: 'url',
        }),
        defineField({
            name: "image",
            title: "Logga",
            type: "image",
            validation: (rule) => rule.required(),
            options: {
                hotspot: true,
            },
            fields: [{
                name: 'alt',
                type: 'string',
                title: 'Alternativ text för skärmläsare',
            }],
        }),
        defineField({
            name: 'details',
            title: 'Beskrivning',
            type: 'text',
            description: 'Vem är sponsorn och vad har dom sponsrat med?',
            rows: 3,
        })
    ],
})