import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'mediaAppearance',
    title: 'Media Appearance',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'outlet',
            title: 'Outlet / Publisher',
            type: 'string',
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'datetime',
            options: { dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm', calendarTodayLabel: 'Today' },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'url',
            title: 'URL',
            type: 'url',
            validation: (Rule) => Rule.uri({ allowRelative: false }),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'News', value: 'news' },
                    { title: 'Interview', value: 'interview' },
                    { title: 'Podcast', value: 'podcast' },
                    { title: 'Video', value: 'video' },
                    { title: 'Article', value: 'article' },
                ],
                layout: 'radio',
            },
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
            ],
        }),
    ],
    preview: {
        select: { title: 'title', subtitle: 'outlet', media: 'image' },
    },
})


