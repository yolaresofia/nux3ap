export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: { type: 'category' },
                },
            ],
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
            },
        },
        {
            name: 'date',
            title: 'Date',
            type: 'date',
        },
        {
            name: 'subtitle',
            title: 'Subtitle',
            type: 'blockContent',
        },
        {
            name: 'videoUrl',
            title: 'Video Url',
            type: 'string',
        },
        {
            type: 'image',
            name: 'mainImage',
            title: 'Main Image',
        },
        {
            type: 'media',
            name: 'mainMedia',
            title: 'Main Media',
        },
        {
            name: 'video',
            title: 'Video',
            type: 'file',
        },
        {
            name: 'information',
            title: 'Summary',
            type: 'blockContent',
        },
        {
            name: 'mainInformation',
            title: 'Content',
            type: 'blockContent',
        },
        {
            name: 'mainSlider',
            title: 'Main Slider',
            type: 'array',
            of: [
                {
                    name: 'image',
                    title: 'Add Image',
                    type: 'image',
                },
            ],
        },
        {
            name: 'author',
            title: 'Author',
            type: 'string',
        },
        {
            name: 'quote',
            title: 'Quote',
            type: 'text',
        },
        {
            name: 'quoteAuthor',
            title: 'Quote Author',
            type: 'string',
        },
        {
            name: 'secondSlider',
            title: 'Second Slider',
            type: 'array',
            of: [
                {
                    name: 'image',
                    title: 'Add Image',
                    type: 'image',
                },
            ],
        },
    ],
}
