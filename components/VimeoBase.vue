<template>
    <iframe title="vimeo-player" id="vimeo" v-if="isVimeo" :src="src + '&autoplay=1&muted=1&loop=1'" :class="[
        !isCentered && !isRotated
            ? 'w-full'
            : isRotated && isCentered && !isMobile
                ? 'fixedVideo'
                : !isRotated && isCentered && isMobile
                    ? 'fixed-center'
                    : isRotated && isCentered && isMobile
                        ? 'rotate'
                        : 'fixedVideo',
    ]" allow="autoplay" muted playsinline loop="1" autoplay="1" frameborder="0" allowfullscreen></iframe>
</template>

<script setup>
import { select } from '~~/mixins/general'

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

const isMobile = useState('isMobile', () => false)
const isCentered = useState('isCentered', () => false)
const isRotated = useState('isRotated', () => false)


const rotate = () => {
    isRotated.value = true
    document.body.style.overflow = 'hidden'
    document.addEventListener('touchmove', preventDefault, { passive: false })
}

const preventDefault = (e) => {
    e.preventDefault()
}
const toggleFullScreen = () => {
    if (!isCentered.value) {
        isCentered.value = true
    } else {
        isCentered.value = false
    }
    video.value.play()
}
const close = () => {
    isCentered.value = false
    isRotated.value = false
    video.value.pause()
    document.body.style.overflow = 'auto'
    document.removeEventListener('touchmove', preventDefault, { passive: false })
}

const paused = ref(true)
const video = ref(null)
const play = () => {
    center()
    video.value?.paused ? video.value.play() : video.value.pause()
}
const center = () => {
    if (!isMobile.value || isCentered.value) {
        return
    }
    isCentered.value = !isCentered.value
}
const pause = () => {
    video.value?.paused ? video.value.play() : video.value.pause()
}
const updatePaused = () => {
    paused.value = video.value?.paused
}
</script>

<style scoped>
.fixedVideo {
    position: fixed;
    top: 56%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 93%;
    height: 85%;
    border-radius: 20px;
}

.fixed-center {
    position: fixed;
    max-width: 100vw !important;
    z-index: 51;
    left: 50%;
    top: 56%;
    transform: translate(-50%, -50%);
}

.rotate {
    transform: rotate(90deg);
    position: fixed;
    width: 100vh;
    height: 100vw;
    transform-origin: bottom left;
    margin-top: -100vw;
    object-fit: cover;
}

.rotate-bar {
    transform: rotate(90deg);
    position: fixed;
    width: 89vh;
    height: 3vw;
    transform-origin: bottom left;
    margin-left: 2vh;
    margin-top: 4vw;
}

#progress {
    transition: width 0.5s;
}

@media (max-width: 768px) {
    #vimeo {
        height: auto !important;
        width: 100vw;
    }

    .fixedVideo {
        height: 25%;
        width: 96%;
        top: 50%;
    }

    .fixed-center {
        position: fixed;
        z-index: 51;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    video {
        max-width: none !important;
    }

    #vimeo {
        height: auto !important;
        min-height: 28vh;
        width: 100vw;
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
