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
import partners from './documents/Partners'
import About from './documents/About'
import category from './objects/category'
import partner from './objects/partner'

export default createSchema({
	name: 'default',
	types: schemaTypes.concat([hero, media, button, About, project, category, secondSection, galleryItem, partners, partner, gallery, home, settings, blockContent]),
})
