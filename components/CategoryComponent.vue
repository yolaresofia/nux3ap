<template>
    <div :class="['absolute top-4 border border-gray-500 h-[13px] w-[13px] rounded-full', returnCategoryClass(title)]" :style="{ left: 14 + i * 7.5 + 'px' }"></div>
</template>

<script setup>

import { returnCategoryClass  } from '~/mixins/general'


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
