<template>
    <div v-if="showComments">
        <div class="flex">
            <div class="text-2xl fixed bottom-4 right-8 md:right-16 cursor-pointer z-50">
                <!-- <div>
                    <span v-if="hasNewComments">🆕</span>
                </div>
                <div>
                    <span v-if="hasNewComments" @click="stackComments">⬇️</span>
                </div> -->

                <Transition :css="false" @enter="onDots" @leave="onDotsLeave">
                    <button v-if="closeStack" @click="closeStack = false" class="translate-y-[200%] flex space-x-2 bg-lightblack p-3 px-4 rounded-full">
                        <span class="inline-block opacity-0 w-[12px] h-[12px] rounded-full bg-white"></span>
                        <span class="inline-block opacity-0 w-[12px] h-[12px] rounded-full bg-white"></span>
                        <span class="inline-block opacity-0 w-[12px] h-[12px] rounded-full bg-white"></span>
                    </button>
                </Transition>
            </div>

            <!-- setting dynamic min-h since if you scroll to bottom
                 you can't click on the buttons or themeswitcher
                maybe there's a better way?
            -->
            <TransitionGroup
                name="commentsContainer"
                tag="div"
                :class="[
                    'flex flex-col cursor-pointer w-full md:w-[30rem] fixed bottom-4 md:right-0 items-center md:justify-end md:p-4 md:pr-12 md:pb-0',
                    stacked ? 'min-h-[20px] z-50' : 'min-h-[250px] z-40',
                ]"
                @enter="onEnter"
                :css="false"
                @click="stacked = true"
                data-comments-container
            >
                <div
                    v-for="(comment, i) in commentArr"
                    :key="comment"
                    class="comment-width text-sm p-10 rounded-xl bg-lightblack font-mono grid text-white md:w-[30rem] origin-bottom left-4 bottom-[150px] md:bottom-4 md:left-auto md:right-8 mt-3"
                    :class="{ 'comment-width | fixed pointer-events-none': !stackedFinished, 'static md:mr-8': stackedFinished, hidden: closeStack }"
                    data-comment
                    :data-index="(i - commentArr.length) * -1"
                    @click="closeStack = true"
                >
                    <span class="font-mono">From IG </span> <span class="font-mono">{{ comment?.user }} just commented on WOMB post </span> <span class="font-mono">{{ comment?.title }}</span>
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>

<script setup>
import { useStore } from '~/store/store'
import { select, selectAll } from '~~/mixins/general'
import { gsap } from 'gsap'

const store = useStore()
const currentComment = useState('currentComment', () => store.comments[0])
const index = useState('index', () => 0)
const stacked = useState('stacked', () => false)
const stackedFinished = useState('stackedFinished', () => false)
const closeStack = useState('closeStack', () => false)
const commentArr = useState('commentArr', () => [])
const showComments = useState('showComments', () => false)
const hasNewComments = useState('hasNewComments', () => false)

const onEnter = (el, done) => {
    gsap.fromTo(
        el,
        {
            opacity: 0,
            y: 40,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'expo.out',
            onComplete: done,
        }
    )
}

const onDots = (el, done) => {
    const dots = selectAll('span', el)
    dots.forEach((dot, i) => gsap.to(dot, { opacity: 1, delay: i * 0.15 }))

    gsap.to(el, { y: 0, duration: 0.6, ease: 'expo.out', onComplete: done })
}

const onDotsLeave = (el, done) => {
    gsap.to(el, { y: '200%', duration: 0.4, ease: 'power4.out', onComplete: done })
}

let rand = Math.floor(Math.random() * 8 + 5)
let intervalC
if (store.comments.length > 1) {
    showComments.value = true

    setInterval(() => {
        rand = Math.floor(Math.random() * 8 + 5)
    }, 5000)
    intervalC = setInterval(() => {
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
onUnmounted(() => {
    clearInterval(intervalC)
})
watch(commentArr.value, () => {
    if (stacked.value) return

    const comments = selectAll('[data-comment]')

    comments.forEach((comment, i) => {
        gsap.to(comment, { scale: 1 - comment.dataset.index * 0.04, y: comment.dataset.index * -20 })
    })
})

watch(stacked, () => {
    let mm = gsap.matchMedia()

    if (!stacked.value) return

    const commentContainer = select('[data-comments-container]')
    const comments = selectAll('[data-comment]')
    const MARGIN = 12

    mm.add('(max-width: 640px)', () => {
        gsap.to(commentContainer, { y: 150, duration: 0.2 })
    })

    comments.forEach((comment, i) => {
        gsap.to(comment, { y: 0, scale: 1, duration: 0.2 })
        gsap.to(comment, {
            y: (Number(comment.dataset.index) - 1) * (comment.offsetHeight + MARGIN) * -1,
            delay: 0.2,
            ease: 'power4.out',
            duration: 0.6,
            onComplete: () => {
                gsap.set(commentContainer, { y: 0 })
                gsap.set(comment, { bottom: '1rem' })
                comment.removeAttribute('style')
                stackedFinished.value = true
            },
        })
    })
})

const stackComments = () => {
    hasNewComments.value = false
    console.log('stack comments')
}
</script>

<style scoped>
@media (max-width: 640px) {
    .comment-width {
        width: calc(100% - 2rem);
    }
}
</style>