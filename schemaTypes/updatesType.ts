import { defineField, defineType, SanityDocument } from 'sanity';

export const updatesType = defineType({
    name: 'updates',
    title: 'Uppdateringar',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Rubrik',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            // hidden: ({document}) => !document?.name,
            validation: (rule) => rule
                .required()
                .error("required to generate a page on the website"),
            options: {
                source: 'title',
                slugify: input => input 
                    .slice(0, 200)
                    .toLowerCase()
                    .replaceAll(/\s+/g, '-')
                    .replaceAll(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=]/g, '')
                    .replaceAll(/-{2,}/g, '')
                    .replaceAll(/[æÆ]/g, 'ae')
                    .replaceAll(/[åÅäÄ]/g, 'a')
                    .replaceAll(/[öÖøØ]/g, 'o')
            },
        }),
        {
            name: 'images',
            title: 'Bilder',
            type: 'array',
            description: "EJ IMPLEMENTERAD",
            of: [
                defineField({
                    name: 'image',
                    title: 'Bild',
                    type: 'image',
                    options: {hotspot: true},
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternativ text för skärmläsare',
                        },
                        {
                            name: 'positionHorizontal',
                            title: 'Horizontal position',
                            type: 'array',
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
                        {
                            name: 'positionVertical',
                            title: 'Vertikal position',
                            type: 'array',
                            of: [{type: "string"}],
                            options: {
                                list: [
                                    {title: "Högst upp", value: "top"},
                                    {title: "Mitten", value: "middle"},
                                    {title: "Längst ner", value: "bottom"},
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
    ],
    preview: {
        select: {
            title: 'title',
            created: '_createdAt',
        },
        prepare({title, created}) {

            return {
                title: title,
                subtitle: `Publicerad: ${parseDate(created)}`
            }
        },
    },
})

function parseDate(rawDate: string | number | Date) {
    let date = new Date(rawDate);
    let displayDate = `${date.getFullYear()}-${('0' + date.getMonth()).slice(-2)}-${('0' + date.getDate()).slice(-2)} kl${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
    return displayDate;
}

function get(doc: SanityDocument, arg1: string) {
    throw new Error('Function not implemented.')
}
