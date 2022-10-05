export default {
	name: 'secondSection',
	title: 'Second Section',
	type: 'array',
	of: [
		{
			type: 'object',
			name: 'articles',
			title: 'Article Collection',
			fields: [
				{
					name: 'header',
					title: 'Header',
					type: 'text',
				},
				{
					name: 'text',
					title: 'Text',
					type: 'text',
				},
				{
					name: 'image',
					title: 'Image',
					type: 'image',
				},
			],
		},
	],
	preview: {
		prepare() {
			return {
				title: `Second Section`,
			}
		},
	},
}
