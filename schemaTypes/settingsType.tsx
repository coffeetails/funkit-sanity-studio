import {defineField, defineType, PreviewProps} from 'sanity';
import { Icon } from '@iconify/react';

export const settingsType = defineType({
    name: 'settings',
    title: 'Inställningar',
    type: 'document',
    groups: [
        {name: 'metadata', title: 'Metadata'},
        {name: 'pageSettings', title: 'Sidinställningar'},
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Hemsidans titel',
            type: 'string',
            initialValue: "Inställningar",
            hidden: true,
            group: ['metadata', 'pageSettings'],
        }),
        defineField({
            name: 'name',
            title: 'Hemsidans titel',
            type: 'string',
            validation: (rule) => rule.required(),
            group: ['metadata'],
        }),
        defineField({
            name: 'description',
            title: 'Beskrivning',
            type: 'text',
            description: 'En kort beskrivning av föreningen och hemsidan.',
            rows: 4,
            group: ['metadata'],
        }),
        defineField({
            name: 'domain',
            title: 'Domännamn',
            description: 'Exempel: google.com eller solaris.kaffekod.nu',
            type: 'string',
            group: ['metadata'],
        }),
        defineField({
            name: 'themeColor',
            title: 'Accentfärg',
            type: 'color',
            validation: (rule) => rule.required(),
            group: ['metadata'],
        }),
        defineField({
            name: 'thumbnailImage',
            title: 'Maskot',
            type: 'image',
            validation: (rule) => rule.required(),
            options: {
                hotspot: true,
            },
            group: ['metadata', 'pageSettings'],
        }),
        defineField({
            name: 'thumbnailBig',
            title: 'Stor thumbnail',
            type: 'boolean',
            validation: (rule) => rule.required(),
            group: ['metadata'],
        }),
        defineField({
            name: 'twittername',
            title: 'Twitter / X användarnamn',
            description: "Om ni inte har twitterkonto så ska detta fält lämnas tomt",
            type: 'string',
            group: ['metadata'],
        }),
        defineField({
            name: 'socialmedialinks',
            title: 'Sociala medier',
            description: 'Länkar till sociala medier som syns längst ner i menyn på hemsidan',
            type: 'array',
            group: ['pageSettings'],
            of: [{
                title: 'Social media länk',
                type: 'object',
                fields: [
                    {
                        title: 'Social media',
                        name: 'title',
                        type: 'string',
                        validation: (rule) => rule.required(),
                    },
                    {
                        title: 'Länk',
                        name: 'link',
                        type: 'string',
                        validation: (rule) => rule.required(),
                    },
                    {
                        name: 'myIcon',
                        title: 'Ikon',
                        type: 'icon',
                        validation: (rule) => rule.required(),
                    },
                ],
                preview: {
                    select: {
                        title: 'title',
                        link: 'link',
                        myIcon: 'myIcon',
                    },
                    prepare({title, link, myIcon}) {
                        
                        return {
                            title: title ? title : "Tom",
                            subtitle: link ? link : "",
                            media: myIcon ? <Icon icon={myIcon.name as string} style={{ fontSize: '48px' }} /> : "",
                        }
                    },
                },

            }],
            options: {
                layout: 'list',
                sortable: true,
            },
        }),
    ],
})