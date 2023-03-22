export default {
	name: 'home',
	title: 'Home',
	type: 'document',
	// __experimental_actions: ['update', 'publish', 'create', 'delete'],
	fields: [
		{
			title: 'Blocks',
			name: 'blocks',
			type: 'array',
			of: [
				{
					name: 'firstSection',
					title: 'First Section',
					type: 'object',
					fields: [
						{
							type: 'media',
							name: 'media',
							title: 'Media',
						},
						{
							name: 'header',
							title: 'Header',
							type: 'blockContent',
						},
					],
					preview: {
						prepare() {
							return {
								title: `First Section`,
							}
						},
					},
				},
				{
					name: 'secondSection',
					title: 'Second Section',
					type: 'object',
					fields: [
						{
							name: 'projects',
							title: 'Projects',
							type: 'array',
							of: [
								{
									type: 'reference',
									to: [{ type: 'project' }],
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
				},
				{
					name: 'thirdSection',
					title: 'Third Section',
					type: 'object',
					fields: [
						{
							name: 'header',
							title: 'Header',
							type: 'string',
						},
						{
							name: 'projects',
							title: 'Projects',
							type: 'array',
							of: [
								{
									type: 'reference',
									to: [{ type: 'project' }],
								},
							],
						},
					],
					preview: {
						prepare() {
							return {
								title: `Third Section`,
							}
						},
					},
				},
				{
					name: 'fourthSection',
					title: 'Fourth Section',
					type: 'object',
					fields: [
						{
							name: 'projects',
							title: 'Projects',
							type: 'array',
							of: [
								{
									type: 'reference',
									to: [{ type: 'project' }],
								},
							],
						},
						{
							name: 'subHeader',
							title: 'Sub Header',
							type: 'string',
						},
					],
					preview: {
						prepare() {
							return {
								title: `Fourth Section`,
							}
						},
					},
				},
			],
		},
	],
}
