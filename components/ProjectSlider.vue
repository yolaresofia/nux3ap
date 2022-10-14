<template>
    <section class="w-full">
        <div class="flex" ref="wrapper">
            <!-- // clone last 3 items to the end -->
            <ProjectSlide :item="obj.res[0].secondSlider[obj.res[0].secondSlider.length - 3].asset._ref" />
            <ProjectSlide :item="obj.res[0].secondSlider[obj.res[0].secondSlider.length - 2].asset._ref" />
            <ProjectSlide :item="obj.res[0].secondSlider[obj.res[0].secondSlider.length - 1].asset._ref" />

            <!-- // actual items -->
            <ProjectSlide v-for="image in obj.res[0].secondSlider" :key="image.id" :item="image.asset._ref" />

            <!-- // clone first 3 items to the end -->
            <ProjectSlide :item="obj.res[0].secondSlider[0].asset._ref" />
            <ProjectSlide :item="obj.res[0].secondSlider[1].asset._ref" />
            <ProjectSlide :item="obj.res[0].secondSlider[2].asset._ref" />
        </div>

        <!-- //TODO replace arrows -->
        <div class="flex justify-between items-center py-6">
            <button class="heading-4" @click="prevSlide(obj.res[0].secondSlider.length)">←</button>
            <p class="uppercase sans-serif text-xs">explore</p>
            <button class="heading-4" @click="nextSlide(obj.res[0].secondSlider.length)">→</button>
        </div>

        <div class="flex" ref="wrapperLarge">
            <!-- // clone last 2 items to the end -->
            <ProjectSlide :large="true" :item="obj.res[0].secondSlider[obj.res[0].secondSlider.length - 2].asset._ref" />
            <ProjectSlide :large="true" :item="obj.res[0].secondSlider[obj.res[0].secondSlider.length - 1].asset._ref" />

            <!-- // actual items -->
            <ProjectSlide :large="true" v-for="image in obj.res[0].secondSlider" :key="image.id" :item="image.asset._ref" />

            <!-- // clone first 2 items to the end -->
            <ProjectSlide :large="true" :item="obj.res[0].secondSlider[0].asset._ref" />
            <ProjectSlide :large="true" :item="obj.res[0].secondSlider[1].asset._ref" />
        </div>
    </section>
</template>



<script setup>
import { urlFor } from '~/mixins/general'
import { gsap } from 'gsap'

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
const wrapperLarge = ref(null)

const width = useState('width', () => 0)
const widthLarge = useState('widthLarge', () => 0)
const initialPos = useState('initialPos', () => 0)
const initialPosLarge = useState('initialPosLarge', () => 0)
const activeSlide = useState('activeSlide', () => 0)
const activeSlideLarge = useState('activeSlideLarge', () => 0)

onMounted(() => {
    setInitialSliderPos()

    window.addEventListener('resize', resize)
})

const setSize = () => {
    width.value = document.querySelector('[data-slide="false"]').offsetWidth
    widthLarge.value = document.querySelector('[data-slide="true"]').offsetWidth

    initialPos.value = width.value * 3 * -1 - 1
    initialPosLarge.value = widthLarge.value * 2 * -1 - 1
}

const setInitialSliderPos = () => {
    setSize()

    gsap.set(wrapper.value, { x: initialPos.value })
    gsap.set(wrapperLarge.value, { x: initialPosLarge.value })
}

const resize = () => {
    setSize()

    gsap.set(wrapper.value, { x: initialPos.value - width.value * activeSlide.value })
    gsap.set(wrapperLarge.value, { x: initialPosLarge.value - widthLarge.value * activeSlideLarge.value })
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

    if (activeSlideLarge.value === length) activeSlideLarge.value = 0
    if (activeSlideLarge.value !== length) activeSlideLarge.value += 1
    handleSlide({
        wrapper: wrapperLarge.value,
        pos: initialPosLarge.value,
        width: widthLarge.value,
        slide: activeSlideLarge.value,
        length,
        multiply: 0,
        setSlide: () => (activeSlideLarge.value = this.multiply),
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

    if (activeSlideLarge.value === -2) activeSlideLarge.value = length - 2
    if (activeSlideLarge.value !== -2) activeSlideLarge.value -= 1
    handleSlide({
        wrapper: wrapperLarge.value,
        pos: initialPosLarge.value,
        width: widthLarge.value,
        slide: activeSlideLarge.value,
        length: -2,
        multiply: 3,
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
</script>