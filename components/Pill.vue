<template>
        <h5 :class="['text-center px-5 text-3_5xl pt-5 pb-2 m-auto rounded-full leading-none uppercase my-12 shadow', color ? 'bg-darkyellow text-sharppurple' : 'bg-white text-black']">
            {{ text }}
        </h5>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true,
        },
        color: {
            type: Boolean,
            default: false,
        },
    },
}
</script>
