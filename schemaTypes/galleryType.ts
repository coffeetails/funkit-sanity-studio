import {defineField, defineType} from 'sanity'

export const galleryType = defineType({
    name: 'gallery',
    title: 'Bild',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Titel',
            type: 'string',
        }),
        defineField({
            name: "image",
            title: "Bild",
            type: "image",
            validation: (rule) => rule.required(),
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'alt',
            type: 'string',
            title: 'Alternativ text för skärmläsare',
        }),
    ],
})