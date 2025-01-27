import {defineField, defineType, PreviewProps} from 'sanity';
import { Icon } from '@iconify/react';
import { RedirectLinkInput } from './components/RedirectLink';

export const settingsType = defineType({
    name: 'settings',
    title: 'Inställningar',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Hemsidans titel',
            type: 'string',
            initialValue: "Inställningar",
            hidden: true,
        }),
        defineField({
            name: 'thumbnailImage',
            title: 'Maskot',
            type: 'image',
            validation: (rule) => rule.required(),
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'socialmedialinks',
            title: 'Sociala medier',
            description: 'Länkar till sociala medier som syns längst ner i menyn på hemsidan',
            type: 'array',
            of: [{
                title: 'Social media länk',
                type: 'object',
                fields: [
                    {
                        title: 'Social media',
                        name: 'title',
                        type: 'string',
                        description: "Namnet på sociala medien som ska länkas till. Detta blir också en del av omdirigeringslänken",
                        validation: (rule) => rule.required(),
                        components: {
                            input: RedirectLinkInput,
                        }
                    },
                    {
                        title: 'Länk',
                        name: 'link',
                        type: 'string',
                        description: "Länken till sociala mediet, det är hit både ikonen i menyn och omdirigeringen kommer leda",
                        validation: (rule) => rule.required(),
                    },
                    {
                        name: 'myIcon',
                        title: 'Ikon',
                        type: 'icon',
                        description: "Välj ikon som ska synas i menyn",
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