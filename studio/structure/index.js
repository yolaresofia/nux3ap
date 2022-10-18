import S from '@sanity/desk-tool/structure-builder'

const hiddenDocTypes = {
	home: 'Home',
	settings: 'Settings',
	gallery: 'Gallery',
	partners: 'Partners',
	about: 'About',
}

export default () =>
	S.list()
		.title('Content')
		.items([
			...Object.entries(hiddenDocTypes).map(([id, title]) => {
				return S.listItem().title(title).child(S.editor().schemaType(id).documentId(id).title(title))
			}),

			// Add a visual divider (optional)
			S.divider(),

			// List out the rest of the document types, but filter out the config type
			...S.documentTypeListItems().filter((listItem) => !Object.keys(hiddenDocTypes).includes(listItem.getId())),
		])
