<template>
    <div>
        <div v-if="src.indexOf('jpg') === -1" class="w-full h-full relative">
            <div v-if="!hidePause" class="group">
                <button class="center z-50 text-8xl" @click="play">
                    <svg id="Layer_1" fill="white" xmlns="http://www.w3.org/2000/svg" class="w-40" viewBox="0 0 200 200">
                        <g id="Group_102">
                            <g class="group-hover:opacity-100 opacity-0">
                                <rect fill="white" v-show="!paused" id="Rectangle_104" class="cls-1" x="65.31" y="56.04" width="32" height="91" rx="2" ry="2" />
                                <rect fill="white" v-show="!paused" id="Rectangle_105" class="cls-1" x="105.31" y="56.04" width="32" height="91" rx="3" ry="3" />
                            </g>
                            <path
                                v-show="paused"
                                d="M134,98.27c.96,.55,1.29,1.77,.73,2.73-.18,.31-.43,.56-.73,.73l-65.99,38.04c-.96,.55-2.18,.22-2.73-.73-.18-.3-.27-.65-.27-1V61.96c0-1.1,.89-2,2-2,.35,0,.7,.09,1,.27l65.99,38.04Z"
                            />
                        </g>
                    </svg>
                </button>
            </div>
            <video class="md:w-full h-[70vh]" ref="video" :src="src" loop @click="pause" @canplay="updatePaused" @playing="updatePaused" @pause="updatePaused"></video>
        </div>
        <div v-else>
            <img class="w-full" :src="src" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    src: {
        type: String,
        required: true,
    },
    hidePause: {
        type: Boolean,
        default: false,
    },
})
const paused = ref(true)
const video = ref(null)
const play = () => {
    video.value.paused ? video.value.play() : video.value.pause()

}
const pause = () => {
    video.value.pause()
}
const updatePaused = () => {
    paused.value = video.value.paused
}
</script>

<style></style>
