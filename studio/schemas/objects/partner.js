import React from 'react'

export default {
	name: 'partner',
	title: 'Partner Item',
	type: 'object',
	fields: [
		{
			name: 'name',
			title: 'name',
			type: 'string',
		},
		{
			name: 'jobDescription',
			title: 'jobDescription',
			type: 'string',
		},
		{
			name: 'text',
			title: 'text',
			type: 'text',
		},
		{
			name: 'image',
			title: 'image',
			type: 'image',
		},
	],
	preview: {
		select: {
			title: 'name',
			imageUrl: 'image.asset.url',
		},
		prepare(selection) {
			const { title } = selection
			const { imageUrl } = selection

			return {
				title: `${title}`,
				media: <img src={imageUrl} alt={`img`} />,
			}
		},
	},
}
