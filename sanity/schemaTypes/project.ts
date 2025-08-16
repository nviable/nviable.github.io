import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'body',
            title: 'Full Description',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Rich text content with formatting options',
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        }),
        defineField({
            name: 'startDate',
            title: 'Start Date',
            type: 'date',
        }),
        defineField({
            name: 'endDate',
            title: 'End Date',
            type: 'date',
        }),
        defineField({
            name: 'image',
            title: 'Project Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
            ],
        }),
        defineField({
            name: 'url',
            title: 'External Link',
            type: 'url',
            validation: (Rule) => Rule.uri({ allowRelative: false }),
        })
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'shortDescription',
            media: 'image',
        },
    },
})
