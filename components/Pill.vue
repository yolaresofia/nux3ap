<template>
    <div class="flex justify-center py-12">
        <h5 :class="['text-center px-5 text-3_5xl pt-5 pb-2 m-auto rounded-full leading-none uppercase', color ? 'bg-darkyellow text-sharppurple' : 'bg-white text-black']">
            {{ text }}
        </h5>
    </div>
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
