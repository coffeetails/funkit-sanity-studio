import {defineField, defineType} from 'sanity'

export const locationType = defineType({
  name: 'location',
  title: 'Lokal',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Platsnamn',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
        title: 'Address',
        name: 'address',
        type: 'object',
        fields: [
            {
                name: 'street', 
                type: 'string', 
                title: 'Gatunamn',
                validation: (rule) => rule.required(),
            },
            {
                name: 'zipcode', 
                type: 'number', 
                title: 'Postnummer',
                validation: (rule) => rule
                    .positive()
                    .integer()
                    .required()
                    .error("Måste vara ett positivt heltal"),
            },
            {
                name: 'city', 
                type: 'string', 
                title: 'Stad',
                validation: (rule) => rule.required(),
            }
        ]
      }),
    defineField({
        name: 'details',
        title: 'Detaljer',
        type: 'text',
        description: 'Kort information om lokalen t.ex. vart entrén är, vilken våning det är på, parkering etc.',
        rows: 3,
    })
  ],
})