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
    }),
    defineField({
        title: 'Address',
        name: 'address',
        type: 'object',
        fields: [
            {
                name: 'street', 
                type: 'string', 
                title: 'Gatunamn'
            },
            {
                name: 'zipcode', 
                type: 'number', 
                title: 'Postnummer',
                validation: (rule) => rule
                    .positive()
                    .integer()
                    .error("Måste vara ett positivt heltal"),
            },
            {
                name: 'city', 
                type: 'string', 
                title: 'Stad'
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