<template>
    <NuxtLink :to="'projects/' + project.slug.current" class="flex-1 flex-col  m-4 fadeIn">
        <div
            class="flex transition-all duration-300 transform hover:scale-[0.99] aspect-square lg:aspect-[5/4] w-full h-[350px] lg:h-auto lg:max-h-[600px] bg-cover bg-center rounded-3xl relative border border-gray-900"
            :style="{ backgroundImage: project.mainMedia.isVideo ? '' : 'url(' + urlFor(project.mainMedia.image.asset._ref) + ')' }"
        >
            <video v-if="project.mainVideo" playsinline autoplay muted loop class="rounded-3xl h-full">
                <source :src="project.mainVideo" type="video/mp4" />
            </video>
            <div v-if="showCategories">
                <CategoryComponent v-for="(category, i) in project.categories" :key="category.id" :title="category.title" :i="i" />
            </div>
        </div>
        <div class="flex flex-col md:space-y-3 space-y-2">
            <h1 :class="['font-black md:py-4 pt-4 text-2xl leading-none text-left', returnThemeClass(false, 'brown', mainTheme)]">{{ project.title }}</h1>
            <div class="flex space-x-3">
                <div v-if="showCategories" class="flex">
                    <h4 v-for="(category, i) in project.categories" :key="category.id" :class="['font-mono text-xs uppercase', returnThemeClass(false, 'lime', mainTheme)]">
                        <span v-if="i > 0">,</span> {{ category.title }}
                    </h4>
                </div>
            </div>
            <div class="leading-[20px]">
                <SanityContent :blocks="project.information" />
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
import { returnThemeClass, urlFor } from '~/mixins/general'
const mainTheme = useState('mainTheme')

defineProps({
    project: {
        type: Object,
        required: true,
    },
    showCategories: {
        type: Boolean,
        default: false,
    },
})
</script>

<style></style>
