import {defineField, defineType} from 'sanity';
import { CalendarIcon } from '@sanity/icons';

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    {name: "details", title: "Details"},
    {name: "editorial", title: "Editorial"},
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: ["details", "editorial"],
    }),
    defineField({
        name: "slug",
        type: "slug",
        hidden: ({document}) => !document?.name,
        validation: (rule) => rule
            .required()
            .error("required to generate a page on the website"),
        group: "details",
    }),
    defineField({
        name: "eventType",
        type: "string",
        options: {
            list: ["in-person", "virtual"],
            layout: "radio"
        },
        group: "details",
    }),
    defineField({
        name: "date",
        type: "datetime",
        group: "details",
    }),
    defineField({
        name: "doorsOpen",
        description: "Number of minutes before the start time for admission",
        type: "number",
        initialValue: 60,
        group: "details",
    }),
    defineField({
        name: "venue",
        type: "reference",
        to: [{ type: "venue" }],
        readOnly: ({value, document}) => !value && document?.eventType === "virtual",
        validation: (rule) => 
            rule.custom((value, context) => {
                if(value && context?.document?.eventType === "virtual") {
                    return "Only in-person events can have a venue";
                }
                return true;
            }),
        group: "details",
    }),
    defineField({
        name: "headline",
        type: "reference",
        to: [{type: "artist"}],
        group: "details",
    }),
    defineField({
        name: "image",
        type: "image",
        group: "editorial",
    }),
    defineField({
        name: "details",
        type: "array",
        of: [{type: "block"}],
        group: "editorial",
    }),
    defineField({
        name: "tickets",
        type: "url",
        group: "details",
    })
  ],
  preview: {
    select: {
        title: "name",
        subtitle: "headline.name",
        media: "image",
    }
  }
})