<template>
    <article :class="['gallery | relative', returnThemeClass(true, 'purple', mainTheme)]">
        <TransitionGroup tag="section" class="absolute px-4 bottom-[10rem] h-screen w-full md:transform md:-translate-x-4 pointer-events-none z-[-1]">
            <figure
                v-for="(element, i) in imagesCollection"
                :key="element"
                :data-index="i"
                class="img | overflow-hidden absolute duration-300 ease-out"
                :style="{ bottom: `${i * 50}px`, right: `${i * 50}px`, transform: `scale(${1 - i * 0.04})`, zIndex: `${collection.projects.length - i}` }"
            >
                <SanityImage :asset-id="element.mainMedia.image.asset._ref" class="object-cover h-full w-full" />
            </figure>
        </TransitionGroup>
        <div>
            <OrderBtn @click="reversed = !reversed" classNames="pt-18 pl-4" />

            <section class="text-yellow leading-9 px-4 flex flex-col md:h-[70vh] md:overflow-scroll pb-24 md:pt-6">
                <NuxtLink :to="'projects/' + element.slug.current" v-for="element in sortedCollection" :key="element._key" class="block">
                    <h2
                        :class="['inline-block md:text-5xl text-2_5xl helvetica-heavy leading-[28px] md:leading-[26px] cursor-pointer', returnThemeClass(false, 'yellow', mainTheme)]"
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
import { returnThemeClass, selectAll, select } from '~/mixins/general'
import move from 'lodash-move'
const mainTheme = useState('mainTheme')

const isMobile = useState('isMobile', () => false)
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

    listBtn?.addEventListener('click', () => {
        sorted.value = !sorted.value
    })

    gsap.registerPlugin(ScrollTrigger)

    checkMobile()
    window.addEventListener('resize', resize)

    setTimeout(() => {
        initScrollTrigger()
    }, 100)
})

onUnmounted(() => {
    window.removeEventListener('resize', resize)
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
