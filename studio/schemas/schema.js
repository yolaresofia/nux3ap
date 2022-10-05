import schemaTypes from 'all:part:@sanity/base/schema-type'
import createSchema from 'part:@sanity/base/schema-creator'
import home from './documents/Home'
import settings from './documents/settings'
import gallery from './documents/gallery'
import blockContent from './objects/blockContent'
import hero from './objects/hero'
import galleryItem from './objects/galleryItem'
import media from './objects/media'
import secondSection from './objects/secondSection'
import button from './objects/button'
import project from './documents/Project'
import category from './objects/category'

export default createSchema({
	name: 'default',
	types: schemaTypes.concat([hero, media, button, project, category, secondSection, galleryItem, gallery, home, settings, blockContent]),
})