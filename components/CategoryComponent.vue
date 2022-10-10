<template>
    <div :class="['absolute top-4 border border-white h-3 w-3 rounded-full', returnCategoryClass(title)]" :style="{ left: 5 + i * 10 + 'px' }"></div>
</template>

<script setup>

import { returnCategoryClass  } from '~/mixins/general'
const mainTheme = useState('mainTheme')

defineProps({
    title: {
        type: String,
        required: true,
    },
    i: {
        type: Number,
        required: true,
    },
})
</script>

<style></style>
