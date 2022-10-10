<template>
    <article :class="['gallery | relative', returnThemeClass(true, 'purple', mainTheme)]">
        <!-- //TODO reference projects -->
        <section class="text-yellow leading-9 pt-28 px-4 flex flex-col">
            <div v-for="(element, index) in collection.collection" :key="element._key">
                <h2 class="inline-block text-4xl cursor-pointer" @mouseenter="mouseEnter(index, element)">
                    {{ element.title }}
                </h2>
            </div>
        </section>

        <section class="images-section | absolute px-4 bottom-16 h-screen w-full md:transform md:-translate-x-4">
            <figure v-for="(element, index) in collection.collection" :key="element._key" :data-index="index" class="img | overflow-hidden absolute">
                <SanityImage :asset-id="element.image.asset._ref" class="object-cover h-full w-full" />
                <figcaption class="text-white absolute inset-0">{{ element.title }}</figcaption>
            </figure>
        </section>
    </article>
</template>

<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { returnThemeClass, selectAll, getNextSiblings, getPreviousSiblings } from '~/mixins/general'

const mainTheme = useState('mainTheme')
const isMobile = useState('isMobile', () => false)
const activeProject = useState('activeProject', () => 0)
const direction = useState('direction', () => 0)

const sanity = useSanity()
const query = groq`*[_type=="gallery"][0]`
const { data: collection } = await useAsyncData('about', async () => sanity.fetch(query))

onMounted(() => {
    console.log(`the component is now mounted.`)
    gsap.registerPlugin(ScrollTrigger)

    checkMobile()
    window.addEventListener('resize', resize)

    const images = selectAll('figure')
    images.forEach((img, index) => renderImage(img, index, false, true))

    initScrollTrigger()
})
const OFFSET = computed(() => {
    if (isMobile) return 40
    return 90
})
const SCALE = computed(() => {
    if (isMobile) return 0.1
    return 0.06
})
const mouseEnter = (index, element) => {
    activeProject.value = collection.value.collection.findIndex((img) => img.title === element.title)
}
const renderImage = (el, index, setIndex = true) => {

    gsap.killTweensOf(el)
    const isFirst = el.dataset.index == 0

    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.8 } })
    if (isFirst && direction === 1) {
        tl.to(el, { bottom: -250 })
        tl.to(el, { zIndex: collection.value.collection.length - index }, '<')

        tl.to(
            el,
            {
                bottom: index * OFFSET,
                right: index * OFFSET,
                scale: 1 - index * SCALE,
                onComplete: () => {
                    if (setIndex) el.setAttribute('data-index', index)
                },
            },
            '<20%'
        )
    } else {
        tl.to(el, {
            bottom: index * OFFSET,
            right: index * OFFSET,
            scale: 1 - index * SCALE,
            zIndex: collection.value.collection.length - index,
            onComplete: () => {
                if (setIndex) el.setAttribute('data-index', index)
            },
        })
    }
}
const initScrollTrigger = () => {
    const headlines = selectAll('h2')

    headlines.forEach((headline, i) => {
        const st = ScrollTrigger.create({
            trigger: headline,
            start: 'top top',
            onToggle: ({ isActive, direction }) => {
                direction = direction
                if (isActive) activeProject.value = i
            },
        })

        if (!isMobile) st.disable()
    })
}
const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
}
const resize = () => {
    checkMobile()
    ScrollTrigger.getAll().forEach((st) => st.kill())
    initScrollTrigger()
}
watch(activeProject, () => {
    const images = selectAll('figure')
    const activeImage = images[activeProject.value]

    const isSecondImage = Number(activeImage.dataset.index) === 1

    gsap.killTweensOf(activeImage)

    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.4 } })

    if (!isSecondImage) tl.to(activeImage, { bottom: -200 })
    tl.set(activeImage, { zIndex: images.length - 0 }, isSecondImage ? '' : '<20%')
    tl.to(activeImage, { bottom: 0 * OFFSET }, '<')
    tl.to(
        activeImage,
        {
            right: 0 * OFFSET,
            scale: 1 - 0 * SCALE,
            onComplete: () => {
                activeImage.setAttribute('data-index', 0)
            },
        },
        '<'
    )

    getNextSiblings(activeImage, '[data-index]').forEach((el, i) => {
        const newIndex = i + 1
        renderImage(el, newIndex)
    })

    getPreviousSiblings(activeImage, '[data-index]').forEach((el, i) => {
        const newIndex = collection.value.collection.length - i - 1
        renderImage(el, newIndex)
    })
})
</script>

<style scoped>
.gallery {
    min-height: 100vh;
    isolation: isolate;
}

.images-section {
    z-index: -1;
}

figure {
    aspect-ratio: 4 / 2.5;
    width: calc(100vw - 3rem);
    border-radius: 37px;
    left: 1.5rem;
}

@media (min-width: 768px) {
    figure {
        width: 50vw;
        left: inherit;
        right: 1.5rem;
    }
}
</style>
