<template>
    <section class="w-full">
        <div class="flex" ref="wrapper">
            <!-- // clone last 3 items to the end -->
            <ProjectSlide :item="obj?.res[0]?.secondSlider[obj?.res[0]?.secondSlider?.length - 3]?.asset?._ref" />
            <ProjectSlide :item="obj?.res[0]?.secondSlider[obj?.res[0]?.secondSlider?.length - 2]?.asset?._ref" />
            <ProjectSlide :item="obj?.res[0]?.secondSlider[obj?.res[0]?.secondSlider?.length - 1]?.asset?._ref" />

            <!-- // actual items -->
            <ProjectSlide v-for="image in obj?.res[0]?.secondSlider" :key="image?.id" :item="image?.asset?._ref" />

            <!-- // clone first 3 items to the end -->
            <ProjectSlide :item="obj?.res[0]?.secondSlider[0]?.asset?._ref" />
            <ProjectSlide :item="obj?.res[0]?.secondSlider[1]?.asset?._ref" />
            <ProjectSlide :item="obj?.res[0]?.secondSlider[2]?.asset?._ref" />
        </div>

        <div class="flex justify-between items-center py-6">
            <button class="w-[38px] group" @click="prevSlide(obj?.res[0]?.secondSlider?.length)">
                <svg class="w-full h-full -scale-x-100 group-hover:-translate-x-1 duration-150" enable-background="new 0 0 44.15 58.29" viewBox="0 0 44.15 58.29" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m24.12 50.97-26.87-26.56 26.87-26.56 11.78 11.64-15.09 14.92 15.09 14.92z"
                        :fill="mainTheme !== 'black' ? '#f7db0f' : '#fff'"
                        transform="matrix(-1 0 0 -1 38.651 53.118)"
                    />
                </svg>
            </button>
            <p class="uppercase sans-serif text-xs">explore</p>
            <button class="w-[38px] group" @click="nextSlide(obj?.res[0]?.secondSlider?.length)">
                <svg class="w-full h-full group-hover:translate-x-1 duration-150" enable-background="new 0 0 44.15 58.29" viewBox="0 0 44.15 58.29" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m24.12 50.97-26.87-26.56 26.87-26.56 11.78 11.64-15.09 14.92 15.09 14.92z"
                        :fill="mainTheme !== 'black' ? '#f7db0f' : '#fff'"
                        transform="matrix(-1 0 0 -1 38.651 53.118)"
                    />
                </svg>
            </button>
        </div>
    </section>
</template>

<script setup>
import { returnThemeClass, urlFor } from '~/mixins/general'
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
const mainTheme = useState('mainTheme')

const props = defineProps({
    obj: {
        type: Object,
        default: () => {},
    },
    largeSlide: {
        type: Boolean,
        default: false,
    },
})

const wrapper = ref(null)

const width = useState('width', () => 0)
const initialPos = useState('initialPos', () => 0)
const activeSlide = useState('activeSlide', () => 0)

onMounted(() => {
    gsap.registerPlugin(Observer)
    setInitialSliderPos()
    initObserver()

    window.addEventListener('resize', resize)
})

const setSize = () => {
    width.value = document.querySelector('[data-slide="false"]')?.offsetWidth + 0.5

    initialPos.value = width.value * 3 * -1
}

const setInitialSliderPos = () => {
    setSize()

    gsap.set(wrapper.value, { x: initialPos.value })
}

const resize = () => {
    setSize()

    gsap.set(wrapper.value, { x: initialPos.value - width.value * activeSlide.value })
}

const nextSlide = (length) => {
    if (activeSlide.value === length) activeSlide.value = 0
    if (activeSlide.value !== length) activeSlide.value += 1
    handleSlide({
        wrapper: wrapper.value,
        pos: initialPos.value,
        width: width.value,
        slide: activeSlide.value,
        length,
        multiply: 0,
        setSlide: () => (activeSlide.value = this.multiply),
    })
}

const prevSlide = (length) => {
    if (activeSlide.value === -3) activeSlide.value = length - 3
    if (activeSlide.value !== -3) activeSlide.value -= 1
    handleSlide({
        wrapper: wrapper.value,
        pos: initialPos.value,
        width: width.value,
        slide: activeSlide.value,
        length: -3,
        multiply: 2,
        setSlide: () => (activeSlideLarge.value = this.multiply),
    })
}

const handleSlide = (options) => {
    gsap.to(options.wrapper, {
        x: options.pos - options.width * options.slide,
        ease: 'power4.out',
        duration: 0.2,
        onComplete: () => {
            if (options.slide === options.length) {
                gsap.set(options.wrapper, { x: options.pos - options.width * options.multiply })
                options.setSlide
            }
        },
    })
}

let observer

const initObserver = () => {
    const threshold = 2

    observer = Observer.create({
        target: wrapper.value,
        type: 'touch,pointer',
        onDragEnd: ({ deltaX }) => {
            if (!(deltaX < threshold * -1 || deltaX > threshold)) return // determine whether drag or click

            if (deltaX > 0) prevSlide(props.obj.res[0].secondSlider.length)
            if (deltaX < 0) nextSlide(props.obj.res[0].secondSlider.length)
        },
    })
}

onUnmounted(() => {
    observer.kill()
})
</script>
