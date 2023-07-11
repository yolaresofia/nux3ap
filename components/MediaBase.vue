<template>
    <div :class="[isCentered && isMobile ? 'h-screen' : '']">
        <div :class="[isCentered ? 'fixed  w-full z-[65]' : '']">
            <div v-if="isCentered" class="w-full fixed bg-black opacity-70 h-[200vh] -top-[40vh]"></div>
            <div v-if="src?.indexOf('jpg') === -1" class="relative w-full h-full">
                <!-- play button -->
                <div v-if="!hidePause" :class="[isCentered ? 'fixed-center' : 'center', 'group']">
                    <button :class="['z-50', isRotated ? 'rotate-90' : 'rotate-0']" @click="play">
                        <svg id="Layer_1" fill="white" xmlns="http://www.w3.org/2000/svg" class="w-20 lg:w-40" viewBox="0 0 200 200">
                            <g id="Group_102">
                                <g class="opacity-0 group-hover:opacity-100">
                                    <rect fill="white" v-show="!paused && !isMobile" id="Rectangle_104" class="cls-1" x="65.31" y="56.04" width="32" height="91" rx="2" ry="2" />
                                    <rect fill="white" v-show="!paused && !isMobile" id="Rectangle_105" class="cls-1" x="105.31" y="56.04" width="32" height="91" rx="3" ry="3" />
                                </g>
                                <path
                                    class=""
                                    v-show="paused"
                                    d="M134,98.27c.96,.55,1.29,1.77,.73,2.73-.18,.31-.43,.56-.73,.73l-65.99,38.04c-.96,.55-2.18,.22-2.73-.73-.18-.3-.27-.65-.27-1V61.96c0-1.1,.89-2,2-2,.35,0,.7,.09,1,.27l65.99,38.04Z"
                                />
                            </g>
                        </svg>
                    </button>
                </div>
                <!-- full screen⁄ -->
                <div v-if="!isMobile" class="absolute z-50 w-5 lg:w-20 lg:bottom-[30px] bottom-4 right-4 cursor-pointer" @click="toggleFullScreen">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 50">
                        <g id="Group_108" data-name="Group 108" transform="translate(-1095 -799)">
                            <rect id="Rectangle_188" data-name="Rectangle 188" width="16" height="50" transform="translate(1095 799)" fill="#fff" />
                            <rect id="Rectangle_189" data-name="Rectangle 189" width="16" height="50" transform="translate(1159 799)" fill="#fff" />
                            <rect id="Rectangle_190" data-name="Rectangle 190" width="16" height="32" transform="translate(1127 799) rotate(90)" fill="#fff" />
                            <rect id="Rectangle_193" data-name="Rectangle 193" width="16" height="32" transform="translate(1127 833) rotate(90)" fill="#fff" />
                            <rect id="Rectangle_191" data-name="Rectangle 191" width="16" height="32" transform="translate(1175 799) rotate(90)" fill="#fff" />
                            <rect id="Rectangle_192" data-name="Rectangle 192" width="16" height="32" transform="translate(1175 833) rotate(90)" fill="#fff" />
                        </g>
                    </svg>
                </div>
                <!-- rotate -->
                <div v-if="isMobile && !isRotated && isCentered" class="absolute z-50 w-[3.4rem] lg:w-40 top-[85px] lg:right-[3px] right-[15px]" @click="rotate">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.92 58.29">
                        <g>
                            <path
                                class="st0 fill-white"
                                d="M21.21,40.88l3.44,1.43c0.14,0.06,0.11,0.27-0.05,0.28c-4.59,0.39-9.28-1.51-12.26-5.46
		c-2.73-3.63-3.51-8.35-2.09-12.67c0.02-0.08-0.01-0.16-0.09-0.18l-5.99-2.04c-0.08-0.03-0.16,0.02-0.19,0.09
		c-2.12,6.39-0.98,13.4,3.07,18.77c4.02,5.33,10.16,8.14,16.37,8.14c1.27,0,2.54-0.12,3.8-0.36c0.11-0.02,0.21,0.09,0.16,0.2
		l-1.41,3.37c-0.03,0.07,0,0.16,0.08,0.19l5.84,2.43c0.07,0.03,0.16,0,0.19-0.08l5.9-14.16c0.03-0.07,0-0.16-0.08-0.19l-14.16-5.9
		c-0.07-0.03-0.16,0-0.19,0.08l-2.43,5.84C21.1,40.76,21.13,40.85,21.21,40.88z"
                            />
                            <path
                                class="st0 fill-white"
                                d="M38.86,17.17c-3.29-4.37-8.08-7.19-13.49-7.95c-2.25-0.32-4.5-0.26-6.67,0.15c-0.11,0.02-0.21-0.09-0.16-0.2
		l1.4-3.36c0.03-0.07,0-0.16-0.08-0.19l-5.84-2.43c-0.07-0.03-0.16,0-0.19,0.08l-5.9,14.16c-0.03,0.07,0,0.16,0.08,0.19l14.16,5.9
		c0.07,0.03,0.16,0,0.19-0.08l2.43-5.84c0.03-0.07,0-0.16-0.08-0.19l-3.46-1.44c-0.14-0.06-0.11-0.27,0.05-0.28
		c1.04-0.09,2.09-0.07,3.15,0.08c3.66,0.52,6.9,2.43,9.13,5.38c2.73,3.63,3.51,8.35,2.09,12.67c-0.02,0.08,0.01,0.16,0.09,0.18
		l5.99,2.04c0.08,0.03,0.16-0.02,0.19-0.09C44.05,29.56,42.9,22.55,38.86,17.17z"
                            />
                        </g>
                        <g id="Path_55" transform="translate(38.651 53.118) rotate(180)">
                            <path id="Path_55-2" class="st0 fill-white" d="M-29.24,50.97l-26.87-26.56l26.87-26.56l11.78,11.64l-15.09,14.92l15.09,14.92L-29.24,50.97z" />
                        </g>
                    </svg>
                </div>
                <!-- close -->
                <div v-if="isCentered" :class="[isRotated ? 'fixed bottom-[15px] -right-[10px]' : '-top-4 -right-[20px] absolute', ' z-[180] w-30 lg:w-40 lg:right-[3px] ']" @click="close">
                    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                        <path
                            class="cls-1 fill-white"
                            d="M137.08,70.67l-12.61-12.61c-.82-.82-2.15-.82-2.96,0l-20.63,20.63c-.82,.82-2.15,.82-2.96,0l-20.63-20.63c-.82-.82-2.15-.82-2.96,0l-12.61,12.61c-.82,.82-.82,2.15,0,2.96l20.63,20.63c.82,.82,.82,2.15,0,2.96l-20.63,20.63c-.82,.82-.82,2.15,0,2.96l12.61,12.61c.82,.82,2.15,.82,2.96,0l20.63-20.63c.82-.82,2.15-.82,2.96,0l20.63,20.63c.82,.82,2.15,.82,2.96,0l12.61-12.61c.82-.82,.82-2.15,0-2.96l-20.63-20.63c-.82-.82-.82-2.15,0-2.96l20.63-20.63c.82-.82,.82-2.15,0-2.96Z"
                        />
                    </svg>
                </div>

                <video
                    :class="[
                        !isCentered && !isRotated
                            ? 'w-full'
                            : isRotated && isCentered && !isMobile
                            ? 'fixedVideo'
                            : !isRotated && isCentered && isMobile
                            ? 'fixed-center'
                            : isRotated && isCentered && isMobile
                            ? 'rotate'
                            : 'fixedVideo',
                    ]"
                    ref="video"
                    playsinline
                    :src="src"
                    loop
                    autoplay
                    @click="pause"
                    @canplay="updatePaused"
                    @playing="updatePaused"
                    @pause="updatePaused"
                    :type="src.includes('mp4') ? 'video/mp4' : 'video/webm'"
                ></video>
                <div v-show="isRotated && isMobile && isCentered && paused" class="w-full rotate-bar h-2 bg-gray-200 rounded-full opacity-60">
                    <div id="progress" class="bg-gray-600 h-3 rounded-full" style="width: 45%"></div>
                </div>
            </div>
            <div v-else>
                <img class="w-full" :src="src" />
            </div>
        </div>
    </div>
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
})

const isMobile = useState('isMobile', () => false)
const isCentered = useState('isCentered', () => false)
const isRotated = useState('isRotated', () => false)
onMounted(() => {
    if (window.innerWidth < 768) {
        isMobile.value = true
        const video = select('video')
        video.ontimeupdate = function () {
            const percent = (video.currentTime / video.duration) * 100
            select('#progress').style.width = `${percent}%`
        }
    }
})

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
}

video {
    max-width: 100vw;
    max-height: 100vh;
    object-fit: cover;
}
</style>
