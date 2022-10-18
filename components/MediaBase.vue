<template>
    <div>
        <div v-if="src.indexOf('jpg') === -1" class="w-full h-full relative">
            <button class="center z-50 text-8xl" v-if="!hidePause" v-show="paused" @click="play">
                <svg id="Layer_1" fill="white" xmlns="http://www.w3.org/2000/svg" class="w-40" viewBox="0 0 200 200">
                    <g id="Group_102">
                        <rect fill="white" id="Rectangle_104" class="cls-1" x="65.31" y="56.04" width="32" height="91" rx="2" ry="2" />
                        <rect fill="white" id="Rectangle_105" class="cls-1" x="105.31" y="56.04" width="32" height="91" rx="3" ry="3" />
                    </g>
                </svg>
            </button>
            <video class="w-full" :src="src" muted autoplay loop @click="pause" @canplay="updatePaused" @playing="updatePaused" @pause="updatePaused"></video>
        </div>
        <div v-else>
            <img class="w-full" :src="src" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // eslint-disable-next-line vue/require-default-prop
        src: String,
        hidePause: Boolean,
    },
    data() {
        return {
            // playing: true,
            paused: false,
        }
    },
    computed: {
        playing() {
            return !this.paused
        },
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
}
</script>

<style></style>
