export default {
	name: 'gallery',
	title: 'Gallery',
	type: 'document',
	__experimental_actions: ['update', 'publish', 'create', 'delete'],
	fields: [
		{
			title: 'Collection',
			name: 'collection',
			type: 'array',
			of: [{ type: 'galleryItem' }],
		},
	],
}
