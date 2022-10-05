import React from 'react'

export default {
	name: 'hero',
	title: 'hero',
	type: 'object',
	fields: [
		{
			name: 'background',
			title: 'Background',
			type: 'image',
		},
		{
			name: 'title',
			title: 'title',
			type: 'string',
		},
		{
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		},
		{
			name: 'button',
			title: 'button',
			type: 'object',
			fields: [
				{
					name: 'title',
					title: 'title',
					type: 'string',
				},
				{
					name: 'link',
					title: 'link',
					type: 'string',
				},
			],
		},
	],
	preview: {
		select: {
			title: 'title.en',

			imageUrl: 'background.asset.url',
		},
		prepare(selection) {
			const { title } = selection
			const { imageUrl } = selection

			return {
				title: ` Hero - ${title}`,
				media: <img src={imageUrl} alt={`img`} />,
			}
		},
	},
}
