import React from 'react'
export default {
	name: 'media',
	title: 'Media',
	type: 'object',
	fields: [
		{
			name: 'isVideo',
			title: 'Do you want to add a Video',
			type: 'boolean',
		},
		{
			name: 'image',
			title: 'Add Image',
			type: 'image',
			hidden: ({ parent }) => parent?.isVideo,
		},
		{
			name: 'video',
			title: 'Add Video',
			type: 'file',
			hidden: ({ parent }) => !parent?.isVideo,
		},
		{
			name: 'videoThumbnail',
			title: 'Add Video Thumbnail',
			type: 'image',
			hidden: ({ parent }) => !parent?.isVideo,
		},
	],
	preview: {
		select: {
			imageUrl: 'image.asset.url',
			thumbnailImageUrl: 'videoThumbnail.asset.url',
		},
		prepare(value) {
			const { imageUrl, thumbnailImageUrl } = value

			return {
				title: 'Dashboard Media',
				media: <img src={imageUrl ? imageUrl : thumbnailImageUrl} alt={`img`} />,
			}
		},
	},
}
