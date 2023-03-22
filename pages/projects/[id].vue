<template>
    <div :class="[returnThemeClass(true, 'lime', mainTheme), 'min-h-screen']">
        <MediaBase :src="post?.res[0]?.video?.url" />
        <div class="md:p-4 p-2">
            <h1 class="md:text-9xl text-[2rem] helvetica-bold">{{ post?.res[0]?.title }}</h1>
            <div class="md:w-3/4 sans-serif text-[10px] md:text-xs">
                <SanityContent :blocks="post?.res[0]?.subtitle" />
            </div>
            <div class="flex justify-between items-center md:py-7 py-2">
                <div class="flex space-x-1 items-center h-10">
                    <div class="flex relative pl-10 pb-12">
                        <CategoryComponent v-for="(category, i) in post?.res[0]?.categories" :key="category?.id" :title="category?.title" :i="i" />
                    </div>
                    <h2 v-for="category in post?.res[0]?.categories" :key="category?.id" :class="[returnThemeClass(false, 'white', mainTheme), 'font-mono text-[10px] pl-2 md:text-xs uppercase']">
                        {{ category?.title }}
                    </h2>
                </div>
                <div>
                    <h4 :class="[returnThemeClass(false, 'white', mainTheme), 'font-mono text-[10px] md:text-xs uppercase']">{{ post?.res[0]?.date }}</h4>
                </div>
            </div>
            <div class="md:grid md:grid-cols-2 flex flex-col">
                <div :class="[returnThemeClass(false, 'darkblue', mainTheme), 'md:pr-10 formattedRichText helvetica-bold text-xl md:text-2xl md:!leading-6 !leading-none']">
                    <SanityContent :blocks="post?.res[0]?.mainInformation" />
                </div>
                <div class="md:hidden block soehne text-xs">
                    <h3>Text by {{ post?.res[0]?.author }}</h3>
                </div>
                <div v-if="post?.res[0]?.mainSlider">
                    <div
                        @click="nextSlide(post?.res[0]?.mainSlider?.length)"
                        class="flex h-[467px] mt-5 md:mt-1 lg:h-[800px] bg-cover bg-center rounded-[34px]"
                        :style="{
                            backgroundImage: 'url(' + post?.res[0]?.mainSlider[phIndex]?.asset?.url + ')',
                        }"
                    ></div>
                </div>
            </div>
            <div class="md:grid md:grid-cols-2 sans-serif text-xs">
                <div class="hidden md:block">
                    <h4>Text by {{ post?.res[0]?.author }}</h4>
                </div>
                <div class="flex justify-between w-full py-2" v-if="post?.res[0]?.mainSlider">
                    <div>{{ phIndex + 1 }} of {{ post?.res[0]?.mainSlider?.length }}</div>
                    <div @click="nextSlide(post?.res[0]?.mainSlider?.length)" class="cursor-pointer">slide</div>
                </div>
            </div>
            <div class="flex flex-col md:py-32 py-20">
                <h1 :class="[returnThemeClass(false, 'yellow', mainTheme), 'md:text-6xl helvetica-heavy text-[39px] pb-7 leading-8 text-center']">
                    {{ post?.res[0]?.quote }}
                </h1>
                <h4 class="m-auto sans-serif text-xs">
                    {{ post?.res[0]?.quoteAuthor }}
                </h4>
            </div>

            <ProjectSlider :obj="post" v-if="post?.res[0]?.secondSlider" />

            <div class="flex flex-col md:flex-row md:flex-wrap">
                <div class="pb-2 md:p-4 md:w-1/2" v-for="image in post?.res[0]?.secondSlider" :key="image?.id">
                    <div
                        class="flex h-[120] bg-cover bg-center rounded-[34px]"
                        :style="{
                            backgroundImage: 'url(' + urlFor(image?.asset?._ref) + ')',
                        }"
                    ></div>
                </div>
            </div>

            <div class="flex w-full flex-col">
                <Pill text="SIMILAR" />
                <div class="flex md:grid md:grid-cols-3 flex-col w-full">
                    <NuxtLink v-for="project in post?.similarProjects?.splice(0, 3)" :key="project?.id" :to="'/projects/' + project?.slug?.current" class="flex-1 flex-col my-4 md:mx-2 fadeIn">
                        <div class="flex h-80 bg-cover bg-center rounded-[34px] relative" :style="{ backgroundImage: 'url(' + urlFor(project?.mainMedia?.image?.asset?._ref) + ')' }">
                            <CategoryComponent v-for="(category, i) in project?.categories" :key="category?.id" :title="category?.title" :i="i" />
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
        mode: 'default',
        appear: true,
    },
})
const mainTheme = useState('mainTheme')
const route = useRoute()
const { id } = route.params
const sanity = useSanity()
const phIndex = useState('phIndex', () => 0)
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
    if (phIndex.value < length - 1) {
        phIndex.value++
    } else {
        phIndex.value = 0
    }
}
</script>

<style scoped>
.formattedRichText {
    padding-bottom: 10px;
}

.sans-serif,
.sans-serif * {
    font-family: sans-serif;
}
</style>
