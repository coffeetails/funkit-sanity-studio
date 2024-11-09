import { defineField, defineType, SanityDocument } from 'sanity';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export const updatesType = defineType({
    name: 'updates',
    title: 'Uppdateringar',
    type: 'document',
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({ type: "updates", newItemPosition: "before" }),
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
            updated: '_updatedAt',
            id: '_id' 
        },
        prepare({title, updated, id}) {
            let draft = false;
            if(id.slice(0,6) == "drafts") {
                draft = true;
            }
            
            return {
                title: title,
                subtitle: `${parseDate(updated)} ${draft ? "✏️ Utkast" : "📄 Publicerad"}`
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
