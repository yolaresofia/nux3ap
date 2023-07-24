<template>
    <NuxtLink :to="'projects/' + project?.slug?.current" class="flex-col my-4 mx-2 fadeIn">
        <div :id="project._id">
        </div>
        <div class="flex transition-all duration-300 transform hover:scale-[0.99] aspect-square overflow-hidden lg:aspect-[5/4] w-full h-[329px] lg:h-auto lg:max-h-[96vh] bg-cover bg-center rounded-[34px] relative border border-gray-900"
            :style="{ backgroundImage: project?.mainMedia?.isVideo ? '' : 'url(' + urlFor(project?.mainMedia?.image?.asset?._ref) + ')' }"
            :id="project._id">
            <div class="video-background" v-if="project.videoUrl">
                <!-- <iframe title="vimeo-player" class="rounded-[34px] h-full w-full object-cover"
                    :src="project.videoUrl + autoplayFile + '&muted=1&loop=1'" loading="lazy" allow="autoplay" muted
                    playsinline loop="1" autoplay="1" frameborder="0" allowfullscreen></iframe> -->
                <ClientOnly>
                    <vue-vimeo-player ref="videoRef" @ready="onReady"
                        :video-id="project.videoUrl.split('https://player.vimeo.com/video/')[1].split('?')[0]"
                        :options="options" />
                </ClientOnly>
            </div>
            <video v-else-if="project?.mainVideo" playsinline autoplay muted loop class="rounded-[34px] h-full w-full">
                <source :src="project?.mainVideo"
                    :type="project?.mainVideo.includes(' mp4') ? 'video/mp4' : 'video/webm'" />
            </video>
            <div v-if="showCategories">
                <CategoryComponent v-for="(category, i) in project?.categories" :key="category.id" :title="category.title"
                    :i="i" />
            </div>
        </div>
        <div class="flex flex-col md:space-y-1 space-y-2">
            <div v-if="showCategories" class="flex space-x-3 md:pt-3 pt-4">
                <div class="flex">
                    <h4 v-for="(category, i) in project?.categories" :key="category.id"
                        :class="['font-mono text-xs uppercase', returnThemeClass(false, 'lime', mainTheme)]">
                        <span v-if="i > 0">,</span> {{ category.title }}
                    </h4>
                </div>
            </div>
            <h1
                :class="['font-black pt-4  text-2xl md:text-[28px] leading-none text-left helvetica-bold', returnThemeClass(false, 'brown', mainTheme)]">
                {{ project?.title }}
            </h1>
            <div class="leading-[20px] helvetica-heavy pt-2">
                <SanityContent :blocks="project?.information" />
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
import { vueVimeoPlayer } from 'vue-vimeo-player'

import { returnThemeClass, urlFor } from '~/mixins/general'
const mainTheme = useState('mainTheme')
const autoplayFile = useState('autoplayFile', () => '')
const videoRef = ref(null)
onMounted(() => {
    if (window) {
        if (window.innerWidth > 700) {
            autoplayFile.value = '&autoplay=1'
        }
    }
})
const options = useState('options', () => {
    return {
        muted: true,
        loop: true,
    }
})
const randomNum = useState('randomNum', () => Math.floor(Math.random() * 1000))
const onReady = () => {
    // const player = refs['vimeo-player']
    // setTimeout(() => {
    //     videoRef.value.play()
    // }, randomNum * 40);
}
const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
    showCategories: {
        type: Boolean,
        default: false,
    },
})
onMounted(() => {
    let displayEntry = (entry) => (entry.isIntersecting ? videoRef.value.play() : null)
    let obs = new IntersectionObserver((ents) => ents.forEach((ent) => displayEntry(ent)))
    let trg = document.getElementById(props.project._id)
    obs.observe(trg)
})
</script>

<style>
.video-background {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 34px !important;
}

.video-background iframe {
    position: absolute;
    border-radius: 34px !important;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 140%;
    transform: translate(-50%, -50%);
}

/* @media (max-width: 768px) {
    .video-background iframe {
        position: absolute;
        border-radius: 34px !important;
        top: 50%;
        left: 60%;
        width: 200%;
        height: 140%;
        transform: translate(-50%, -50%);
    }
} */
</style>
