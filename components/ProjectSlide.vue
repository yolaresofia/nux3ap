<template>
    <div class="p-4 flex-none" :class="[large ? 'w-1/2' : 'w-1/3']" :data-slide="Boolean(large)">
        <div
            class="flex h-120 bg-cover bg-center rounded-3xl"
            :style="{
                backgroundImage: 'url(' + urlFor(item) + ')',
            }"
        ></div>
    </div>
</template>

<script setup>
import { urlFor } from '~/mixins/general'

defineProps({
    item: {
        type: String,
        default: () => {},
    },
    large: {
        type: Boolean,
        default: false,
    },
})
</script>