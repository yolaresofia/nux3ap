<template>
    <section>
        <TransitionGroup
            v-if="commentArr.length > 0"
            tag="div"
            name="commentsContainer"
            class="fixed bottom-4 px-4 md:px-0 md:right-8 flex flex-col-reverse w-full md:w-[30rem]"
            :class="{ 'cursor-pointer z-40': !open, 'z-50': open }"
            :css="false"
            @enter="onEnter"
            @click="open = true"
            data-comments-container
        >
            <div
                class="text-white sans-serif text-sm rounded-lg bg-lightblack p-2 w-full md:w-[30rem] origin-center mt-3 bottom-[150px] right-4 md:bottom-4 md:right-8"
                :class="{ 'comment-width | fixed': !openFinished, static: openFinished, hidden: closeStack }"
                v-for="(comment, i) in commentArr"
                :key="comment"
                data-comment
                :data-index="(i - commentArr.length) * -1"
            >
                <p>From IG</p>
                <p>{{ comment?.user }} just commented on WOMB's post:</p>
                <p class="pb-10">{{ comment?.title }}</p>
                <p class="text-darkgray" :class="{ 'opacity-0': commentArr.length === 1 || open }">
                    {{ commentArr.length - 1 }} {{ commentArr.length === 2 ? 'more notification' : 'more notifications' }}
                </p>
            </div>
            <button v-if="open && !closeStack" class="text-right font-mono text-sm text-black uppercase" @click="closeStack = true">Close</button>
        </TransitionGroup>

        <Transition :css="false" @enter="onDots" @leave="onDotsLeave">
            <button v-if="closeStack" @click="closeStack = false" class="fixed bottom-4 right-4 md:right-8 translate-y-[200%] flex space-x-2 bg-lightblack p-3 px-4 rounded-full z-50">
                <span class="inline-block opacity-0 w-[12px] h-[12px] rounded-full bg-white"></span>
                <span class="inline-block opacity-0 w-[12px] h-[12px] rounded-full bg-white"></span>
                <span class="inline-block opacity-0 w-[12px] h-[12px] rounded-full bg-white"></span>
            </button>
        </Transition>
    </section>
</template>

<script setup>
import { useStore } from '~/store/store'
import { select, selectAll } from '~~/mixins/general'
import { gsap } from 'gsap'

const store = useStore()
const currentComment = useState('currentComment', () => store.comments[0])
const index = useState('index', () => 0)
const open = useState('open', () => false)
const openFinished = useState('openFinished', () => false)
const closeStack = useState('closeStack', () => false)
const commentArr = useState('commentArr', () => [])
const showComments = useState('showComments', () => false)
const hasNewComments = useState('hasNewComments', () => false)

const onEnter = (el, done) => {
    gsap.fromTo(
        el,
        {
            opacity: 0,
            y: open.value ? -40 : 40,
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
    }, rand * 500)
}
onUnmounted(() => {
    clearInterval(intervalC)
})
watch(commentArr.value, () => {
    if (open.value) return

    const comments = selectAll('[data-comment]')

    comments.forEach((comment, i) => {
        gsap.to(comment, { scale: 1 - comment.dataset.index * 0.04, y: comment.dataset.index * -20 })
    })
})

watch(open, () => {
    let mm = gsap.matchMedia()

    if (!open.value) return

    const commentContainer = select('[data-comments-container]')
    const comments = selectAll('[data-comment]')
    const MARGIN = 12

    mm.add('(max-width: 768px)', () => {
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
                openFinished.value = true
            },
        })
    })
})

const stackComments = () => {
    hasNewComments.value = false
    console.log('stack comments')
}

watch(store, () => {
    if (store.cookieBannerClosed) {
        let mm = gsap.matchMedia()

        const commentContainer = select('[data-comments-container]')

        mm.add('(max-width: 768px)', () => {
            gsap.to(commentContainer, { y: 150, duration: 0.2 })
        })
    }
})
</script>

<style scoped>
@media (max-width: 768px) {
    .comment-width {
        width: calc(100% - 2rem);
    }
}
</style>