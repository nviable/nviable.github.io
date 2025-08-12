import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'publication',
    title: 'Publication',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'authors',
            title: 'Authors',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'number',
        }),
        defineField({
            name: 'venue',
            title: 'Venue',
            type: 'string',
        }),
        defineField({
            name: 'url',
            title: 'URL',
            type: 'url',
        }),
        defineField({
            name: 'pdfUrl',
            title: 'PDF URL',
            type: 'url',
        }),
        defineField({
            name: 'citationCount',
            title: 'Citations',
            type: 'number',
        }),
        defineField({
            name: 'abstract',
            title: 'Abstract',
            type: 'text',
        }),
        defineField({
            name: 'bibtex',
            title: 'BibTeX',
            type: 'text',
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'venue',
        },
    },
})


