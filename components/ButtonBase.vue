<template>
    <a :href="url" class="w-full">
        <button :class="['rounded-lg border px-7 pb-2 pt-3 text-2_5xl scaleUp w-full border-none', btncolors]">
            <h4 class="mx-auto" style="width: max-content">
                <slot class="text-4xl w-full"></slot>
            </h4>
        </button>
    </a>
</template>

<script>
export default {
    props: {
        btncolors: {
            type: String,
            required: false,
            default: 'nonEmpty',
        },
        url: {
            type: String,
            default: '',
        },
    },
}
</script>

<style scoped>
.max-content  {
    width: max-content;
}
</style>
