export default {
	name: 'about',
	title: 'About',
	type: 'document',
	fields: [
		{
			name: 'header',
			title: 'Header',
			type: 'text',
		},
		{
			name: 'authors',
			title: 'Authors',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'name',
							title: 'Name',
							type: 'string',
						},
						{
							name: 'description',
							title: 'Description',
							type: 'text',
						},
					],
				},
			],
		},
		{
			name: 'clients',
			title: 'Clients',
			type: 'blockContent',
		},
		{
			name: 'services',
			title: 'Services',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'name',
							title: 'Name',
							type: 'string',
						},
						{
							name: 'image',
							title: 'image',
							type: 'image',
						},
					],
				},
			],
		},
		{
			name: 'awards',
			title: 'Awards',
			type: 'blockContent',
		},
	],
}
