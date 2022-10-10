<template>
    <div :class="[returnThemeClass(true, 'lime', mainTheme), 'min-h-screen']">
        <div v-if="post.res[0].video" class="w-full">
            <video class="w-full" :src="post.res[0].video.url" muted autoplay loop></video>
        </div>
        <MediaBase :src="post.res[0].video.url" />
        <div class="p-4 space-y-4">
            <h1 class="text-9xl helvetica-bold">{{ post.res[0].title }}</h1>
            <div class="w-3/4 sans-serif text-xs">
                <SanityContent :blocks="post.res[0].subtitle" />
            </div>
            <div class="flex justify-between items-center">
                <div class="flex space-x-1 items-center h-10">
                    <div class="flex relative pl-10 pb-12">
                        <CategoryComponent v-for="(category, i) in post.res[0].categories" :key="category.id" :title="category.title" :i="i" />
                    </div>
                    <h4 v-for="category in post.res[0].categories" :key="category.id" :class="[returnThemeClass(false, 'white', mainTheme), 'font-mono text-xs uppercase']">
                        {{ category.title }}
                    </h4>
                </div>
                <div>
                    <h4 :class="[returnThemeClass(false, 'white', mainTheme), 'font-mono text-xs uppercase']">22.03.2021</h4>
                </div>
            </div>
            <div class="grid grid-cols-2">
                <div :class="[returnThemeClass(false, 'darkblue', mainTheme), 'md:pr-10']">
                    <SanityContent :blocks="post.res[0].information" />
                </div>
                <div v-if="post.res[0].mainSlider">
                    <div
                        class="flex h-120 bg-cover bg-center rounded-3xl"
                        :style="{
                            backgroundImage: 'url(' + post.res[0].mainSlider[index].asset.url + ')',
                        }"
                    ></div>
                </div>
            </div>
            <div class="grid grid-cols-2 sans-serif text-xs">
                <div>
                    <h4>Text by {{ post.res[0].author }}</h4>
                </div>
                <div class="flex justify-between w-full" v-if="post.res[0].mainSlider">
                    <div>{{ index + 1 }} of {{ post.res[0].mainSlider.length }}</div>
                    <div @click="nextSlide(post.res[0].mainSlider.length)" class="cursor-pointer">slide</div>
                </div>
            </div>
            <div class="flex flex-col">
                <h1 :class="[returnThemeClass(false, 'yellow', mainTheme), 'heading-2 py-20  text-center']">
                    {{ post.res[0].quote }}
                </h1>
                <h4 class="m-auto sans-serif text-xs">
                    {{ post.res[0].quoteAuthor }}
                </h4>
            </div>
            <div class="flex flex-wrap items-center justify-center">
                <div v-for="image in post.res[0].secondSlider" :key="image.id" class="w-1/3 p-4">
                    <div
                        class="flex h-120 bg-cover bg-center rounded-3xl"
                        :style="{
                            backgroundImage: 'url(' + urlFor(image.asset._ref) + ')',
                        }"
                    ></div>
                </div>
            </div>
            <div class="flex w-full flex-col">
                <div class="flex justify-center xl:justify-between m-auto py-12">
                    <h1 class="text-center px-6 py-4 rounded-full bg-white text-black">SIMILAR</h1>
                </div>
                <div class="flex w-full">
                    <NuxtLink v-for="project in post.similarProjects" :key="project.id" :to="'/projects/' + project.slug.current" class="flex-1 flex-col m-4 fadeIn">
                        <div class="flex h-80 bg-cover bg-center rounded-3xl relative" :style="{ backgroundImage: 'url(' + urlFor(project.mainMedia.image.asset._ref) + ')' }">
                            <CategoryComponent v-for="(category, i) in project.categories" :key="category.id" :title="category.title" :i="i" />
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { returnThemeClass, urlFor } from '~/mixins/general'
definePageMeta({
  pageTransition: {
    mode: "default",
    appear: true,
  },
});
const mainTheme = useState('mainTheme')
const route = useRoute()
const { id } = route.params
const sanity = useSanity()
const index = useState('index', () => 0)
const query = groq`
            *[slug.current=="${id}"]{...,categories[]->{...,"similar":*[_type=="project" && references(^._id)]{...,categories[]->}},
            "video": video.asset->,mainSlider[]{asset->{url}}}`

const { data: post } = await useAsyncData(id, async () => {
    const res = await sanity.fetch(query)
    const filteredProjects = res[0].categories.map((category) => category.similar).flat()
    let similarProjects = [],
        ids = []

    filteredProjects.forEach((element) => {
        const isDuplicate = ids.includes(element._id)
        if (!isDuplicate) {
            similarProjects.push(element)
            ids.push(element._id)
            return true
        }
        return false
    })
    return { res: res, similarProjects }
})
const nextSlide = (length) => {
    if (index.value < length - 1) {
        index.value++
    } else {
        index.value = 0
    }
}
</script>

<style>
.sans-serif,
.sans-serif * {
    font-family: sans-serif;
}
</style>
