<template>
    <a :href="url" class="w-full">
        <button
            :class="[
                'rounded-lg border px-7 pb-1 pt-2 text-2_5xl hover:scale-90 scaleUp w-full',
                typeBtn == 'primary' ? 'bg-primaryGreen text-white' : typeBtn == 'secondary' ? 'bg-primaryBlue' : typeBtn == 'empty' ? 'bg-transparent border-2 border-black' : 'text-black bg-white',
            ]"
        >
            <h4 class="mx-auto" style="width: max-content">
                <slot class="text-4xl w-full"></slot>
            </h4>
        </button>
    </a>
</template>

<script>
export default {
    props: {
        typeBtn: {
            type: String,
            required: true,
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
