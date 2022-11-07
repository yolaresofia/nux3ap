<template>
    <article :class="['gallery | relative', returnThemeClass(true, 'purple', mainTheme)]">
        <section class="images-section | absolute px-4 bottom-[10rem] h-screen w-full md:transform md:-translate-x-4 opacity-0" ref="imagesContainer">
            <figure v-for="(element, index) in sortedCollection" :key="element._key" :data-index="index" class="img | overflow-hidden absolute">
                <SanityImage :asset-id="element.mainMedia.image.asset._ref" class="object-cover h-full w-full" />
            </figure>
        </section>
        <div>
            <OrderBtn @click="sorted = !sorted" classNames="pt-18 pl-4" />

            <section class="text-yellow leading-9 px-4 flex flex-col md:h-[70vh] md:overflow-scroll pb-24 md:pt-6">
                <NuxtLink :to="'projects/' + element.slug.current" v-for="(element, index) in sortedCollection" :key="element._key" class="block">
                    <h2
                        :class="['inline-block md:text-5xl text-2_5xl leading-[28px] md:leading-[26px] cursor-pointer', returnThemeClass(false, 'yellow', mainTheme)]"
                        @mouseenter="mouseEnter(index, element)"
                    >
                        {{ element.title }}
                    </h2>
                </NuxtLink>
            </section>
        </div>
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
const sorted = useState('sorted', () => false)

const sanity = useSanity()
const query = groq` {
  "projects": *[_type == "project"]| order(date desc),
}`
const { data: collection } = await useAsyncData('gallery', async () => sanity.fetch(query))

const sortedCollection = computed(() => {
    const abcProjects = [...collection.value.projects]
    if (sorted.value) return abcProjects.sort((a, b) => a.title.localeCompare(b.title))

    return collection.value.projects
})

const imagesContainer = ref(null)

const OFFSET = 50
const SCALE = 0.04

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)

    checkMobile()
    window.addEventListener('resize', resize)

    setTimeout(() => {
        gsap.to(imagesContainer.value, { opacity: 1, duration: 0.2, delay: 0.35 })

        const images = selectAll('figure')
        images.forEach((img, index) => renderImage(img, index, false, true))

        initScrollTrigger()
    }, 100)
})

const mouseEnter = (index, element) => {
    activeProject.value = collection.value.projects.findIndex((img) => img.title === element.title)
}

const renderImage = (el, index, setIndex = true) => {
    gsap.killTweensOf(el)
    const isFirst = el.dataset.index == 0

    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.8 } })

    if (isFirst && direction === 1) {
        tl.to(el, { bottom: -250 })
        tl.to(el, { zIndex: collection.value.projects.length - index }, '<')

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
            zIndex: collection.value.projects.length - index,
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
        if (!isMobile.value) st.disable()
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
        const newIndex = collection.value.projects.length - i - 1
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
