<template>
    <button class="arrows | pb-4 group" :class="[classNames]" @click="$emit('close')">
        <svg height="100" viewBox="0 0 127 100" width="127" :fill="arrowsColor()">
            <g transform="translate(0 10)">
                <path class="duration-150 group-hover:translate-y-2" d="m126.14 35.42-21.65 21.65v-55.93h-13.93v35.14 20.75l-21.66-21.61-.07 19.31 28.78 28.79 28.63-28.81z" />
                <path class="duration-150 group-hover:-translate-y-2" d="m0 28.8.1 19.3 21.65-21.65v55.93h13.93v-55.9l21.66 21.61.08-19.31-28.79-28.78z" />
            </g>
        </svg>
    </button>
</template>

<script setup>
const mainTheme = useState('mainTheme')

defineProps({
    classNames: String,
})

const arrowsColor = () => {
    return mainTheme.value === 'black' ? 'white' : 'black'
}
</script>

<style scoped>
.arrows {
    width: 75px;
}

.arrows svg {
    width: 100%;
    height: 100%;
}
</style>