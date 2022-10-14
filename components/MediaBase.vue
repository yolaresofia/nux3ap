<template>
    <div>
        <div v-if="src.indexOf('jpg') === -1" class="w-full relative">
            <button class="center z-50 text-8xl" v-if="!hidePause" v-show="paused" @click="play">𝗹𝗹</button>
            <video class="w-full" :src="src" muted autoplay loop @click="pause" @canplay="updatePaused" @playing="updatePaused" @pause="updatePaused"></video>
            <!-- <button class="center" v-show="paused" @click="play">&#9654;</button> -->
        </div>
        <div v-else>
            <img class="w-full" :src="src" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        src: String,
        hidePause: Boolean,
    },
    data() {
        return {
            // playing: true,
            paused: false,
        }
    },
    methods: {
        updatePaused(event) {
            this.videoElement = event.target
            this.paused = event.target.paused
        },
        play() {
            this.videoElement.play()
        },
        pause() {
            this.videoElement.pause()
        },
    },
    computed: {
        playing() {
            return !this.paused
        },
    },
}
</script>

<style></style>
