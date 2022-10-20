export default {
	name: 'partners',
	title: 'Partners',
	type: 'document',
	__experimental_actions: ['update', 'publish', 'create', 'delete'],
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			title: 'Collection',
			name: 'collection',
			type: 'array',
			of: [{ type: 'partner' }],
		},
	],
}

