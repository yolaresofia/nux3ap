<template>
    <div
        v-if="isColorOpen"
        :class="['text-white flex flex-col z-[60] w-[220px] h-[275px] fixed-center py-4 px-4 rounded-[32px]', mainTheme === 'black' ? 'bg-black' : returnThemeClass(true, 'purple', mainTheme)]"
    >
        <div class="absolute right-[5px] top-0">
            <button @click="closeBanner" class="px-2 py-1 font-sans mx-1 text-white">x</button>
        </div>
        <p class="text-[32px] helvetica-heavy text-center h-6">Choose</p>
        <p class="text-[32px] helvetica-heavy text-center">your mood*</p>
        <p class="font-mono text-[10px]">You can find the option again at the bottom of the page</p>
        <div class="flex py-1 font-sans m-auto space-x-3">
            <p class="text-5xl">☁️</p>
            <p class="text-[35px] relative bottom-[5px]">🌈</p>
        </div>
        <p class="helvetica-bold text-[12px] text-center">*B&W for Cloud emoji Colourful for Rainbow emoji</p>
    </div>
</template>

<script setup>
import { returnThemeClass } from '~/mixins/general'
const mainTheme = useState('mainTheme')
const isColorOpen = useState('isColorOpen', () => true)

const closeBanner = () => {
    isColorOpen.value = false
}
</script>
<style scoped>
.fixed-center {
    position: fixed;
    max-width: 100vw !important;
    z-index: 51;
    left: 50%;
    top: 50% !important;
    transform: translate(-50%, -50%);
}
</style>
