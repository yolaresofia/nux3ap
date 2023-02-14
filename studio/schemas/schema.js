import schemaTypes from 'all:part:@sanity/base/schema-type'
import createSchema from 'part:@sanity/base/schema-creator'
import home from './documents/Home'
import settings from './documents/settings'
import blockContent from './objects/blockContent'
import hero from './objects/hero'
import media from './objects/media'
import secondSection from './objects/secondSection'
import button from './objects/button'
import project from './documents/Project'
import partners from './documents/Partners'
import guide from './documents/Guide'
import About from './documents/About'
import category from './objects/category'
import partner from './objects/partner'

export default createSchema({
    name: 'default',
    types: schemaTypes.concat([hero, guide, media, button, About, project, category, secondSection, partners, partner, home, settings, blockContent]),
})
