<template>
    <div v-if="commentArr" class="fixed z-50 w-[30rem] bottom-4 right-4 ">
        <div class="text-sm p-10 rounded-xl bg-black mt-3 fadeInComment font-mono grid text-white" v-for="comment in commentArr" :key="comment.id"> <span class="font-mono">From IG </span> <span class="font-mono">{{ comment.user }} just commented on WOMB post </span>  <span class="font-mono">{{ comment.title }}</span> </div>
    </div>
</template>

<script setup>
import { useStore } from '~/store/store'

const store = useStore()
const currentComment = useState('currentComment', () => store.comments[0])
const index = useState('index', () => 0)
const commentArr = useState('commentArr', () => [])
setInterval(() => {
    currentComment.value = store.comments[index.value]
    if (index.value === store.comments.length - 1) {
        index.value = 0
    } else {
        index.value++
    }
    commentArr.value.push(store.comments[index.value])
    if (commentArr.value.length > 3) {
        commentArr.value.shift()
    }
}, 5000)
</script>
<style>
.fadeInComment {
    animation: fadeIn ease 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}
@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(10px);
    }
    100% {
        opacity: .93;
        transform: translateY(0);
    }
}
</style>