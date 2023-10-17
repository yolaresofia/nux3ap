<template>
    <div class="iframe-container relative md:hidden" @click="onClick">
        <div class="absolute w-screen h-[300px]"> </div>
        <ClientOnly>
            <vue-vimeo-player ref="video" player-width="430" player-height="auto"
                :video-id="src.split('https://player.vimeo.com/video/')[1].split('?')[0]" :options="optionsVid" />
        </ClientOnly>
    </div>

    <iframe class="hidden md:block" title="vimeo-player" id="vimeo" v-if="isVimeo" :src="src + '&autoplay=1&muted=1&loop=1'"
        allow="autoplay" muted playsinline loop="1" autoplay="1" frameborder="0" allowfullscreen></iframe>
</template>

<script setup>
import { vueVimeoPlayer } from 'vue-vimeo-player'
const optionsVid = useState('optionsVid', () => {
    return {
        muted: true,
        loop: true,
        autoplay: true,
        controls: false,
        playerWidth: '100vw',
        playerHeight: '100vh',
    }
})
defineProps({
    src: {
        type: String,
        required: true,
    },
    hidePause: {
        type: Boolean,
        default: false,
    },
    isVimeo: {
        type: Boolean,
        default: false,
    },
})

const video = ref(null)
const indexClick = useState('indexClick', () => 0)
const onClick = () => {

    if (video.value) {
        if (indexClick.value === 0) {
            video.value.unmute()
            indexClick.value = 1
            return
        }
        if (indexClick.value === 1) {
            video.value.play()
            indexClick.value = 2
            return
        }
        if (indexClick.value === 2) {
            video.value.pause()
            indexClick.value = 1
            return
        }
    }
}

</script>

<style scoped>
@media (max-width: 768px) {

    .iframe-container {
        width: 100vw !important;
        transform: translateX(-20px);
    }
}

#vimeo {
    height: 100vh;
    width: 100vw;
}

video {
    max-width: 100vw;
    max-height: 100vh;
    object-fit: cover;
}
</style>
