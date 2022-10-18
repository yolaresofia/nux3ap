<template>
    <article :class="['p-2 md:p-4 pt-24 md:pt-48', returnThemeClass(true, 'purple', mainTheme)]">
        <!-- //TODO replace with svgs -->
        <!-- //TODO add functionality -->
        <button class="order-btn | text-5xl cursor-pointer md:hidden pb-6">
            <svg height="84" viewBox="0 0 127 84" width="127" xmlns="http://www.w3.org/2000/svg">
                <g fill="#231f20">
                    <path d="m126.14 35.42-21.65 21.65v-55.93h-13.93v35.14 20.75l-21.66-21.61-.07 19.31 28.78 28.79 28.63-28.81z" />
                    <path d="m0 28.8.1 19.3 21.65-21.65v55.93h13.93v-55.9l21.66 21.61.08-19.31-28.79-28.78z" />
                </g>
            </svg>
        </button>

        <section class="grid grid-cols-2 gap-x-2 gap-y-4 md:gap-y-2 md:grid-cols-3">
            <NuxtLink :to="'projects/' + project.slug.current" v-for="project in page.projects" :key="project._id">
                <figure class="overflow-hidden">
                    <SanityImage :asset-id="project.mainMedia.image.asset._ref" class="object-cover h-full w-full" />
                </figure>

                <h2 class="text-yellow leading-4 pt-2 md:hidden">{{ project.title }}</h2>
            </NuxtLink>
        </section>

        <h1 :class="['heading-2 text-center py-24', returnThemeClass(false, 'yellow', mainTheme)]">
            {{ page.section4.blocks.subHeader }}
        </h1>
    </article>
</template>

<script setup>
import { returnThemeClass } from '~/mixins/general'

const mainTheme = useState('mainTheme')
definePageMeta({
  pageTransition: {
    mode: "default",
    appear: true,
  },
});
const sanity = useSanity()
const query = groq` {
  "projects": *[_type == "project"],
  "section4":*[_type=="home"][0]{
    blocks[3]
   },
}`

const { data: page } = await useAsyncData('projectIndex', async () => sanity.fetch(query))
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
</style>
