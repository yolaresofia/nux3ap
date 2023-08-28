<template>
    <article :class="['p-2 md:p-4 pt-24 md:pt-48', returnThemeClass(true, 'purple', mainTheme)]">
        <OrderBtn @click="sorted = !sorted" classNames="md:hidden" />

        <section class="grid grid-cols-2 gap-x-2 gap-y-4 md:gap-y-2 md:grid-cols-3">
            <NuxtLink :to="'projects/' + project?.slug?.current" v-for="project in sortedCollection" :key="project?._id"
                class="hover:scale-[0.99] duration-300 relative group">
                <figure class="overflow-hidden">
                    <SanityImage v-if="project?.mainImage" :asset-id="project?.mainImage?.asset?._ref"
                        class="object-cover h-full w-full" />
                    <div class="absolute bottom-0 w-full bg-white rounded-b-xl hidden md:group-hover:flex">

                        <h2
                            :class="['leading-4 helvetica-heavy m-auto text-2xl py-5 !text-black', returnThemeClass(false, 'yellow', mainTheme)]">
                            {{
                                project?.title }}</h2>
                    </div>
                </figure>

                <h2 :class="['leading-4 helvetica-heavy pt-2 md:hidden', returnThemeClass(false, 'yellow', mainTheme)]">{{
                    project?.title }}</h2>
            </NuxtLink>
        </section>

        <h1 :class="['heading-2 text-center py-24', returnThemeClass(false, 'yellow', mainTheme)]">
            {{ page?.section4?.blocks?.subHeader }}
        </h1>
    </article>
</template>

<script setup>
import { returnThemeClass, select } from '~/mixins/general'

const mainTheme = useState('mainTheme')
definePageMeta({
    pageTransition: {
        mode: 'default',
        appear: true,
    },
})
const sanity = useSanity()
const query = groq` {
  "projects": *[_type == "project"],
  "section4":*[_type=="home"][0]{
    blocks[3]
   },
}`

const { data: page } = await useAsyncData('projectIndex', async () => sanity.fetch(query))

const sortedCollection = computed(() => {
    const abcProjects = [...page.value.projects]
    if (sorted.value) return abcProjects.sort((a, b) => a.title.localeCompare(b.title))

    return page.value.projects
})

const sorted = useState('sorted', () => false)

onMounted(() => {
    const listBtn = select('[data-gallery-list-btn]')
    listBtn?.addEventListener('click', onListBtnClick)
})

const onListBtnClick = () => {
    return (sorted.value = !sorted.value)
}

onUnmounted(() => {
    const listBtn = select('[data-gallery-list-btn]')
    listBtn?.removeEventListener('click', onListBtnClick)
})
</script>

<style scoped>
.order-btn {
    width: 50px;
}

.order-btn svg {
    width: 100%;
    height: 100%;
}

figure {
    border-radius: 16px;
    aspect-ratio: 1;
    border: 1px solid var(--darkgray);
}

@media (min-width: 786px) {
    figure {
        aspect-ratio: 442 / 323;
    }
}

@supports not (aspect-ratio: 3 / 2) {
    figure {
        height: 30vh;
    }
}
</style>
