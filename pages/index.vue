<template>
    <div :class="[returnThemeClass(true, 'primaryYellow', mainTheme)]">
        <div class="flex flex-col">
            <div class="static lg:h-[69vh] overflow-hidden">
                <video playsinline autoplay muted loop id="bgvideo" class="w-screen">
                    <source :src="page.section1.blocks.video" type="video/mp4" />
                </video>
            </div>
            <div class="flex flex-1 h-full">
                <p :class="['md:p-4 p-4 heading-2', returnThemeClass(false, 'brown', mainTheme)]">{{ page.section1.blocks.header }}</p>
            </div>
        </div>
        <!-- section 2 -->

        <div class="parent2 w-full px-2 py-2">
            <ProjectComponent v-for="project in page.section2.projects" :key="project.id" :project="project" />
        </div>

        <!-- section 3 -->
        <div class="flex flex-col px-2 py-4">
            <h1 :class="['heading-3 px-2', returnThemeClass(false, 'blue', mainTheme)]">
                {{ page.section3.blocks.header }}
            </h1>
            <div class="parent w-full">
                <ProjectComponent v-for="project in page.section3.projects" :key="project.id" :project="project" showCategories />
            </div>
        </div>
        <!-- section 4 -->
        <div class="flex flex-col py-4">
            <div class="flex w-full">
                <ProjectComponent v-for="project in page.section4.projects" :key="project.id" :project="project" />
            </div>
        </div>
        <h1 :class="['heading-3 text-center pb-20 pt-10 md:pb-2 px-1', returnThemeClass(false, 'blue', mainTheme)]">
            {{ page.section4.blocks.subHeader }}
        </h1>
        <Comments />
    </div>
</template>

<script setup>
import { returnThemeClass } from '~/mixins/general'
import { useStore } from '~/store/store'
const showComments = useState('showComments', () => true)

definePageMeta({
    pageTransition: {
        mode: 'default',
        appear: true,
    },
})
const store = useStore()

const query = groq`{
"section1":*[_type=="home"][0]{blocks[0]{...,"video":media.video.asset->url}},
"section2":*[_type=="home"][0]{"collection":blocks[1].collection, "projects":blocks[1].projects[]->{...,"mainVideo":mainMedia.video.asset->url}},
"section3":*[_type=="home"][0]{blocks[2]}{...,"projects": blocks.projects[]->{...,categories[]->,"mainVideo":mainMedia.video.asset->url}},
"section4":*[_type=="home"][0]{blocks[3]}{...,"projects": blocks.projects[]->{...,categories[]->,"mainVideo":mainMedia.video.asset->url}}}
`
const mainTheme = useState('mainTheme')

const sanity = useSanity()

const { data: page } = await useAsyncData('index', async () => sanity.fetch(query))

const clientSB = useSupabaseClient()

const { data } = await clientSB.from('lastcheck').select('*').order('created_at', { ascending: false })

const HOUR = 1000 * 60 * 60
const anHourAgo = Date.now() - HOUR
const lastCheck = new Date(data[0].created_at) < new Date(anHourAgo)

if (lastCheck) {
    const { data: comments } = await useFetch('/api/igcomments')

    try {
        if (comments._rawValue.data.length) {
            await clientSB.from('comment').delete().neq('id', 0)
            comments._rawValue.data.forEach(async (item) => {
                await clientSB.from('comment').upsert({
                    title: item.text,
                    user: item.user,
                    timestamp: item.timestamp,
                })
            })
            await clientSB.from('lastcheck').upsert({
                check: true,
            })
        } else {
        }
    } catch (error) {}
}
await useAsyncData('comment', async () => {
    const { data } = await clientSB.from('comment').select('*').order('timestamp', { ascending: false })
    store.comments = data
    return data
})
</script>

<style lang="postcss">
video {
    object-fit: cover;
}
.parent,
.parent2 {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    & > a {
        margin: 10px;
    }
}

.parent a {
    flex: 1 1 380px;
}
.parent2 a {
    flex: 1 1 490px;
}
</style>
