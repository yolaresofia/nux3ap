<template>
    <div :class="[isCentered && isMobile ? 'h-screen' : '']">
        <div :class="[isCentered ? 'fixed  w-full z-[65]' : '']">
            <div v-if="isCentered" class="w-full fixed bg-black opacity-70 h-[200vh] -top-[40vh]"></div>
            <div v-if="src.indexOf('jpg') === -1" class="relative w-full h-full">
                <div v-if="!hidePause" :class="[isCentered ? 'fixed-center': 'center','group']">
                    <button class="z-50" @click="play">
                        <svg id="Layer_1" fill="white" xmlns="http://www.w3.org/2000/svg" class="w-20 lg:w-40" viewBox="0 0 200 200">
                            <g id="Group_102">
                                <g class="opacity-0 group-hover:opacity-100">
                                    <rect fill="white" v-show="!paused && !isMobile" id="Rectangle_104" class="cls-1" x="65.31" y="56.04" width="32" height="91" rx="2" ry="2" />
                                    <rect fill="white" v-show="!paused && !isMobile" id="Rectangle_105" class="cls-1" x="105.31" y="56.04" width="32" height="91" rx="3" ry="3" />
                                </g>
                                <path
                                    v-show="paused "
                                    d="M134,98.27c.96,.55,1.29,1.77,.73,2.73-.18,.31-.43,.56-.73,.73l-65.99,38.04c-.96,.55-2.18,.22-2.73-.73-.18-.3-.27-.65-.27-1V61.96c0-1.1,.89-2,2-2,.35,0,.7,.09,1,.27l65.99,38.04Z"
                                />
                            </g>
                        </svg>
                    </button>
                </div>
                <!-- full screen⁄ -->
                <div class="absolute z-50 w-5 lg:w-40 bottom-4 right-4" @click="toggleFullScreen">
                    <svg id="full-screen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                        <path
                            class="cls-1"
                            d="M136.54,94.43v-20.18h-7.18v-10.79h-20.18v10.79h-18.37v-10.79h-20.18v10.79h-7.17v20.18h7.17v10.34h-7.17v20.18h7.17v11.6h20.18v-11.6h18.37v11.6h20.18v-11.6h7.18v-20.18h-7.18v-10.34h7.18Zm-27.36,10.34h-18.37v-10.34h18.37v10.34Z"
                        />
                    </svg>
                </div>
                <!-- close -->
                <div v-if="isCentered" class="absolute z-50 w-30 lg:w-40 -top-4 lg:right-[3px] -right-[20px]" @click="toggleFullScreen">
                    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                        <path
                            class="cls-1 fill-white"
                            d="M137.08,70.67l-12.61-12.61c-.82-.82-2.15-.82-2.96,0l-20.63,20.63c-.82,.82-2.15,.82-2.96,0l-20.63-20.63c-.82-.82-2.15-.82-2.96,0l-12.61,12.61c-.82,.82-.82,2.15,0,2.96l20.63,20.63c.82,.82,.82,2.15,0,2.96l-20.63,20.63c-.82,.82-.82,2.15,0,2.96l12.61,12.61c.82,.82,2.15,.82,2.96,0l20.63-20.63c.82-.82,2.15-.82,2.96,0l20.63,20.63c.82,.82,2.15,.82,2.96,0l12.61-12.61c.82-.82,.82-2.15,0-2.96l-20.63-20.63c-.82-.82-.82-2.15,0-2.96l20.63-20.63c.82-.82,.82-2.15,0-2.96Z"
                        />
                    </svg>
                </div>

                <video
                    :class="[isCentered ? 'fixedVideo' : 'w-full']"
                    ref="video"
                    playsinline
                    :src="src"
                    loop
                    @click="pause"
                    @canplay="updatePaused"
                    @playing="updatePaused"
                    @pause="updatePaused"
                ></video>
            </div>
            <div v-else>
                <img class="w-full" :src="src" />
            </div>
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
// check if is mobile on mounted⁄¡

const isMobile = useState('isMobile', () => false)
const isCentered = useState('isCentered', () => false)
onMounted(() => {
    if (window.innerWidth < 768) {
        isMobile.value = true
    }
})

const toggleFullScreen = () => {
    if (!isCentered.value) {
        isCentered.value = true
    } else {
        isCentered.value = false
    }
    video.value.play()
}

const paused = ref(true)
const video = ref(null)
const play = () => {
    // if (isMobile && !isCentered.value) {
    //     isCentered.value = true
    // } else {
    //     isCentered.value = false
    // }
    video.value.paused ? video.value.play() : video.value.pause()
}
const pause = () => {
    video.value.pause()
}
const updatePaused = () => {
    paused.value = video.value.paused
}
</script>

<style>
.fixedVideo {
    position: fixed;
    top: 56%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 93%;
    height: 85%;
    /* object-fit: cover; */
    border-radius: 20px;
}
.fixed-center {
    position: fixed;
    z-index: 51;
    left: 50%;
    top: 56%;
    transform: translate(-50%, -50%);
}
/* add query for max width 768  */
@media (max-width: 768px) {
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
}
</style>
