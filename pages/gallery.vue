<template>
    <article :class="['gallery | relative', returnThemeClass(true, 'purple', mainTheme)]">
        <TransitionGroup tag="section" class="absolute px-4 bottom-[10rem] h-screen w-full md:transform md:-translate-x-4 pointer-events-none z-[-1]">
            <figure
                v-for="(element, i) in imagesCollection"
                :key="element"
                :data-index="i"
                class="img | absolute duration-300 ease-out bg-center bg-cover bg-no-repeat pointer-events-none overflow-clip mx-auto left-0 right-0"
                :style="{
                    backgroundImage: 'url(' + urlFor(element?.mainImage?.asset?._ref) + ')',
                    bottom: isMobile ? `${i * 50}px` : `${i * 60}px`,
                    right: isMobile ? '' : `${i * 70}px`,
                    width: isMobile ? `calc(85vw * ${1 - i * 0.04})` : isXL ? `calc(40vw * ${1 - i * 0.04})` : `calc(60vw * ${1 - i * 0.04})`,
                    zIndex: `${collection.projects.length - i}`,
                }"
            >
                <!-- <div v-if="element?.mainImage">
                    <SanityImage v-if="element?.mainImage" :asset-id="element?.mainImage?.asset?._ref" class="object-cover h-full w-full" />
                </div>
                <div v-else class="bg-gray-900 h-full w-full"></div> -->
            </figure>
        </TransitionGroup>
        <div>
            <OrderBtn @click="reversed = !reversed" classNames="pt-18 pl-4" />

            <section class="text-yellow leading-9 px-4 flex flex-col md:h-[70vh] md:overflow-scroll pb-24 md:pt-6">
                <NuxtLink :to="'projects/' + element?.slug?.current" v-for="element in sortedCollection" :key="element._key" class="block">
                    <h2
                        :class="['inline-block md:text-5xl text-2_5xl helvetica-heavy leading-[28px] md:leading-[26px] cursor-pointer', returnThemeClass(false, 'newyellow', mainTheme)]"
                        @mouseenter="mouseEnter(element.title)"
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
import { returnThemeClass, selectAll, select, urlFor } from '~/mixins/general'
import move from 'lodash-move'
const mainTheme = useState('mainTheme')

const isMobile = useState('isMobile', () => false)
const isXL = useState('isXL', () => false)
const sorted = useState('sorted', () => false)
const reversed = useState('reversed', () => false)

const sanity = useSanity()
const query = groq` {
    "projects": *[_type == "project"]| order(date desc),
}`
const { data: collection } = await useAsyncData('gallery', async () => sanity.fetch(query))

const sortedCollection = computed(() => {
    if (reversed.value) return collection.value.projects.reverse()

    const abcProjects = [...collection.value.projects]
    if (sorted.value) return abcProjects.sort((a, b) => a.title.localeCompare(b.title))

    return collection.value.projects
})
const imagesCollection = ref(collection.value.projects)

onMounted(() => {
    const listBtn = select('[data-gallery-list-btn]')
    listBtn?.addEventListener('click', onListBtnClick)

    gsap.registerPlugin(ScrollTrigger)

    checkMobile()
    window.addEventListener('resize', resize)

    setTimeout(() => {
        initScrollTrigger()
    }, 100)
})

const onListBtnClick = () => {
    return (sorted.value = !sorted.value)
}

onUnmounted(() => {
    const listBtn = select('[data-gallery-list-btn]')
    listBtn?.removeEventListener('click', onListBtnClick)

    window.removeEventListener('resize', resize)

    ScrollTrigger.getAll().forEach((st) => st.kill())
})

const mouseEnter = (title) => {
    var elementPos = imagesCollection.value
        .map((item) => {
            return item.title
        })
        .indexOf(title)

    imagesCollection.value = move(imagesCollection.value, elementPos, 0)

    if (elementPos === 0) return

    const els = selectAll(`[data-index`)
    const el = select(`[data-index="${elementPos}"]`)

    els.forEach((el) => gsap.killTweensOf(el))
    gsap.fromTo(el, { bottom: -100 }, { bottom: 0 })
}

const initScrollTrigger = () => {
    const headlines = selectAll('h2')

    headlines.forEach((headline, i) => {
        const st = ScrollTrigger.create({
            trigger: headline,
            start: 'top 10%',
            end: 'bottom 10%',
            onToggle: ({ isActive }) => {
                if (isActive) {
                    var elementPos = imagesCollection.value
                        .map((item) => {
                            return item.title
                        })
                        .indexOf(headline.textContent)

                    imagesCollection.value = move(imagesCollection.value, elementPos, 0)

                    if (elementPos === 0) return

                    const els = selectAll(`[data-index`)
                    const el = select(`[data-index="${elementPos}"]`)

                    els.forEach((el) => gsap.killTweensOf(el))
                    gsap.fromTo(el, { bottom: 100 }, { bottom: 0 })
                }
            },
        })

        if (!isMobile.value) st.disable()
    })
}

const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
    isXL.value = window.innerWidth > 1920
}

const resize = () => {
    checkMobile()
    ScrollTrigger.getAll().forEach((st) => st.kill())
    initScrollTrigger()
}
</script>

<style scoped>
.gallery {
    min-height: 100vh;
    isolation: isolate;
}

figure {
    aspect-ratio: 2.1 / 1.5;
    /* height: 30vh; */

    width: calc(100vw - 5rem);
    border-radius: 37px;
    /* left: 1.5rem; */
}

@supports not (aspect-ratio: 3 / 2) {
    figure {
        height: 30vh;
    }

    @media (min-width: 768px) {
        figure {
            height: 50vh;
        }
    }
}

@media (min-width: 768px) {
    figure {
        width: 50vw;
        left: inherit;
        right: 1.5rem;
    }
}
</style>
