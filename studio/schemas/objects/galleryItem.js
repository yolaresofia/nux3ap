import React from 'react'

export default {
	name: 'galleryItem',
	title: 'Gallery Item',
	type: 'object',
	fields: [
	 
		{
			name: 'title',
			title: 'title',
			type: 'string',
		},
		{
			name: 'image',
			title: 'image',
			type: 'image',
		} 
	],
	preview: {
		select: {
			title: 'title',
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
