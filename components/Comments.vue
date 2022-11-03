<template>
    <section>
        <Transition name="close-btn">
            <button
                v-if="open && !closeStack && !isCaughtUp"
                class="duration-150 fixed text-right font-mono text-sm text-black uppercase md:right-4 right-8 pr-4 z-[60]"
                :class="{ 'bottom-[170px]': commentArr.length === 1, 'bottom-[320px] md:bottom-[320px]': commentArr.length === 2, 'bottom-[430px] md:bottom-[360px]': commentArr.length >= 3 }"
                @click="closeStack = true"
                data-close-btn
            >
                Close
            </button>
        </Transition>

        <TransitionGroup
            v-if="commentArr.length > 0"
            tag="div"
            name="commentsContainer"
            class="fixed px-4 md:px-0 md:right-8 flex flex-col-reverse w-full md:w-[30rem]"
            :class="{ 'cursor-pointer z-40 bottom-4': !open, 'h-[420px] md:h-[350px] z-50 overflow-y-scroll bottom-0': open }"
            :css="false"
            @enter="onEnter"
            @click="open = true"
            data-comments-container
            @scroll="handleContainerScroll"
        >
            <div
                class="text-white sans-serif text-sm rounded-lg bg-lightblack p-2 w-full md:w-[30rem] origin-center mt-3 bottom-[150px] right-4 md:bottom-4 md:right-8"
                :class="{ 'comment-width | fixed': !openFinished, 'static opacity-0': openFinished, hidden: closeStack || isCaughtUp, 'mb-3': 0 === i && openFinished }"
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
        </TransitionGroup>

        <Transition :css="false" @enter="onDots" @leave="onDotsLeave">
            <button v-if="closeStack" @click="closeStack = false" class="fixed bottom-4 right-4 md:right-8 translate-y-[200%] flex space-x-2 bg-lightblack p-3 px-4 rounded-full z-[60]">
                <span class="inline-block opacity-0 w-[12px] h-[12px] rounded-full bg-white"></span>
                <span class="inline-block opacity-0 w-[12px] h-[12px] rounded-full bg-white"></span>
                <span class="inline-block opacity-0 w-[12px] h-[12px] rounded-full bg-white"></span>
            </button>
        </Transition>

        <div v-if="isCaughtUp" class="fixed bottom-4 right-4 md:right-8 flex space-x-2 z-50">
            <p class="bg-lightblack pt-2 pb-1 px-3 rounded-full">👍</p>
            <p class="bg-lightblack pt-2 pb-1 px-3 rounded-full">You're all caught up!</p>
        </div>
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
const isCaughtUp = useState('isCaughtUp', () => false)

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

const handleContainerScroll = (e) => {
    if (closeStack.value) return

    if (select('[data-comments-container]').scrollTop === 0) {
        setTimeout(() => {
            isCaughtUp.value = true
            open.value = true
        }, 500)
    }
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
        // if (commentArr.value.length > 3) {
        //     commentArr.value.shift()
        // }
        if (!hasNewComments.value && showComments.value) {
            hasNewComments.value = true
        }
    }, rand * 500)
}

onUnmounted(() => {
    clearInterval(intervalC)
})

const scrollCommentsToTop = () => {
    setTimeout(() => {
        select('[data-index="1"]').scrollIntoView({ block: 'end' })
    }, 10)
}

watch(commentArr.value, () => {
    isCaughtUp.value = false

    if (!open.value) {
        const comments = selectAll('[data-comment]')

        comments.forEach((comment, i) => {
            gsap.to(comment, { scale: 1 - comment.dataset.index * 0.04, y: comment.dataset.index * -20 })
        })
    } else {
        scrollCommentsToTop()
    }
})

watch(openFinished, () => {
    const comments = selectAll('[data-comment]')
    comments.forEach((comment) => gsap.to(comment, { opacity: 1, duration: 0.2 }))
    scrollCommentsToTop()
})

watch(closeStack, () => {
    scrollCommentsToTop()
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
            // y: (Number(comment.dataset.index) - 1) * (comment.offsetHeight + MARGIN) * -1,
            opacity: 0,
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
.close-btn-enter-active {
    @apply delay-200;
}

.close-btn-enter-from,
.close-btn-leave-to {
    opacity: 0;
}

@media (max-width: 768px) {
    .comment-width {
        width: calc(100% - 2rem);
    }
}
</style>