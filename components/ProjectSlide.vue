<template>
    <div class="pr-2 md:p-4 aspect-[4/5] flex-none" :class="[large ? 'mobile-width md:w-1/2' : 'mobile-width md:w-1/3']" :data-slide="Boolean(large)">
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

<style scoped>
@media (max-width: 760px) {
    .mobile-width {
        width: 97.5%;
    }
}
</style>