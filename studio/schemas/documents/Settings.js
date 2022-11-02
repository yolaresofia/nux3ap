export default {
    name: 'settings',
    title: 'Settings',
    type: 'document',
    __experimental_actions: ['update', 'publish', 'create', 'delete'],
    fields: [
        {
            name: 'isUnderConstruction',
            title: 'is Under Construction',
            type: 'boolean',
        },
        {
            name: 'titulo',
            title: 'title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'description',
            type: 'string',
        },
        {
            title: 'Circle Logo',
            name: 'circleLogo',
            type: 'image',
        },
        {
            title: 'Logo',
            name: 'logo',
            type: 'image',
        },
        {
            title: 'contact',
            name: 'contact',
            type: 'button',
        },
        {
            title: 'instagram',
            name: 'instagram',
            type: 'button',
        },
    ],
}
