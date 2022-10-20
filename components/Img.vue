
<template>
    <!-- //!how to use -->
    <!-- <Img asset="https://cdn.sanity.io/images/q5syy0z1/production/e7787fad262a5c2079af83958f893a52e5be6f62-1538x1013.jpg alt="Description" /> -->

    <img
        class="lazyload"
        :class="[
            {
                portrait: Number(dimensions.width) < Number(dimensions.height),
                landscape: Number(dimensions.width) > Number(dimensions.height),
            },
            classNames,
        ]"
        :height="dimensions.height"
        :width="dimensions.width"
        :src="lazySrc"
        :data-src="src"
        :data-srcset="srcSet"
        data-sizes="auto"
        :alt="alt"
    />
</template>

<script setup>
import 'lazysizes'
import { urlFor } from '~/mixins/general'

const props = defineProps({
    asset: {
        type: String,
        default: '',
    },
    alt: {
        type: String,
        default: 'Meaningful Image Description',
    },
    classNames: {
        type: String,
        default: '',
    },
})

const lazySrc = computed(() => {
    return urlFor(props.asset).width(100).blur(50).url()
})

const src = computed(() => {
    return urlFor(props.asset).auto('format').url()
})

const srcSet = computed(() => {
    const WIDTHS = [600, 1200, 2400]

    const srcSet = WIDTHS.map((width) => {
        return `${urlFor(props.asset).width(width).auto('format').fit('max').url()} ${width}w`
    })

    return srcSet.join(',')
})

const dimensions = computed(() => {
    const dimensions = props.asset.split('-')[1].split('x')
    const width = dimensions[0]
    const height = dimensions[1].split('.')[0]

    return { width, height }
})
</script>

<style scoped>
img {
    @apply w-full h-full object-cover;
}
</style>