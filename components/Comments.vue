<template>
    <div v-if="showComments" class="fixed z-50 w-[30rem] bottom-4 right-4">
        <div class="flex">
            <div class="text-2xl fixed bottom-4 right-8 cursor-pointer">
                <div>
                    <span v-if="hasNewComments">🆕</span>
                </div>
                <div>
                    <span v-if="hasNewComments" @click="stackComments">⬇️</span>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="text-sm p-10 rounded-xl bg-black mt-3 fadeInComment font-mono grid text-white" v-for="comment in commentArr" :key="comment">
                    <span class="font-mono">From IG </span> <span class="font-mono">{{ comment?.user }} just commented on WOMB post </span> <span class="font-mono">{{ comment?.title }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from '~/store/store'

const store = useStore()
const currentComment = useState('currentComment', () => store.comments[0])
const index = useState('index', () => 0)
const commentArr = useState('commentArr', () => [])
const showComments = useState('showComments', () => false)
const hasNewComments = useState('hasNewComments', () => false)

let rand = Math.floor(Math.random() * 8 + 5) //Generate Random number between 5 - 10
if (store.comments.length > 1) {
    showComments.value = true

    setInterval(() => {
        rand = Math.floor(Math.random() * 8 + 5)
    }, 5000)
    setInterval(() => {
        currentComment.value = store.comments[index.value]
        if (index.value > 20) {
            showComments.value = false
        }
        if (index.value === store.comments.length - 1) {
            index.value = 0
        } else {
            index.value++
        }
        commentArr.value.push(store.comments[index.value])
        if (commentArr.value.length > 3) {
            commentArr.value.shift()
        }
        if (!hasNewComments.value && showComments.value) {
            hasNewComments.value = true
        }
    }, rand * 1000)
}
const stackComments = () => { 
    hasNewComments.value = false
    console.log('stack comments')
 }
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
        opacity: 0.93;
        transform: translateY(0);
    }
}
</style>
