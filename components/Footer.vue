<template>
    <footer :class="[returnThemeClassFooter(true), 'w-full pb-4 px-2 relative bottom-[1px]']">
        <div class="flex justify-between w-full">
            <div class="flex flex-col-reverse md:flex-row justify-between md:w-full">
                <img
                    :class="[mainTheme !== 'black' ? returnFooterLogoColors() : 'invert', 'w-[90px] md:w-60 relative top-[35px] md:top-0']"
                    :src="settings.circleLogo"
                    @mouseenter="onEnter"
                    @mouseleave="onLeave"
                    ref="logoimg"
                />
                <div class="flex items-end relative top-[85px] lg:top-0" @click="moveTo()" @mouseenter="onEnterTop" @mouseleave="onLeaveTop" ref="topbtn">
                    <img :class="[mainTheme !== 'black' && 'invert', 'md:w-28 w-20 pr-4 cursor-pointer']" src="~/assets/images/back-to-top.svg" alt="back-to-top" />
                </div>
            </div>
            <div class="flex mt-auto">
                <div class="flex flex-col space-y-2 items-end">
                    <img :src="settings.logo" :class="[mainTheme === 'black' && 'invert', 'h-auto w-28 md:w-44']" />
                    <span class="ml-auto text-4xl text-white cursor-pointer" @click="changeTheme">{{ mainTheme === 'black' ? '🌈' : '☁️' }}</span>
                    <ButtonBase :url="settings.contact.link" :btncolors="returnFooterButtonColors(true)"> {{ settings.contact.text }}</ButtonBase>
                    <ButtonBase :url="settings.instagram.link" :btncolors="returnFooterButtonColors(false)"> {{ settings.instagram.text }}</ButtonBase>
                </div>
            </div>
        </div>
        <div class="flex w-full flex-col text-right md:flex-row md:justify-between text-xxsm py-3">
            <h4 class="font-mono">WOMB PRODUCTION COMPANY 2022 ®</h4>
            <h4 class="font-mono">PRIVACY POLICY / FAQ / TERMS & CONDITIONS</h4>
        </div>
    </footer>
</template>

<script setup>
import { gsap } from 'gsap'
import { useStore } from '~/store/store'
const { settings } = useStore()
const mainTheme = useState('mainTheme')
const route = useRoute()
const path = ref(route.path)
const moveTo = () => {
    window.scrollTo(0, 0)
}

watch(
    route,
    (to) => {
        path.value = to.path
        if (path.value.length > 12) {
            path.value = 'projectPage'
        }
    },
    { flush: 'pre', immediate: true, deep: true }
)
const returnFooterLogoColors = () => {
    const primaryColors = {
        '/': 'logo-lime',
        '/about': 'logo-darkyellow',
        '/partners': 'logo-fuchsia',
        '/projects': 'logo-fuchsia',
        projectPage: 'logo-fuchsia',
        '/gallery': 'logo-lightpurple',
    }

    return mainTheme.value === 'black' ? 'bg-white text-black' : primaryColors[path.value]
}
const returnFooterButtonColors = (isPrimary) => {

  
    const primaryColors = {
        '/': 'bg-brown text-lime',
        '/about': 'bg-cyan text-darkpurple',
        '/partners': 'bg-green text-cyan',
        '/projects': 'bg-darkgray text-white',
        projectPage: 'bg-darkgray text-white',
        '/gallery': 'bg-yellow text-black',
    }
    if (isPrimary || !isPrimary && path.value !== '/partners') {
        return mainTheme.value === 'black' ? 'bg-white text-black' : primaryColors[path.value]
    }
    else {
        return mainTheme.value === 'black' ? 'bg-white text-black' : 'bg-blue text-green'
    }
    
}
const returnThemeClassFooter = (isBackground, color) => {
    const colors = {
        '/': 'primaryYellow',
        '/about': 'pink',
        '/partners': 'orange',
        '/projects': 'purple',
        projectPage: 'lime',
        '/gallery': 'purple',
    }

    if (isBackground) {
        return mainTheme.value === 'black' ? 'bg-black text-white' : `bg-${colors[path.value]}`
    } else {
        return mainTheme.value === 'black' ? 'text-white' : `text-${color}`
    }
}
const changeTheme = () => {
    mainTheme.value === 'black' ? (mainTheme.value = 'white') : (mainTheme.value = 'black')
}
const logoimg = ref(null)
const topbtn = ref(null)

const onEnter = () => {
    gsap.killTweensOf(logoimg.value)
    gsap.to(logoimg.value, {
        rotate: gsap.utils.random(-360, 360),
        duration: 0.8,
        ease: 'expo.out',
    })
}
const onLeave = () => {
    gsap.killTweensOf(logoimg.value)
    gsap.to(logoimg.value, {
        rotate: 0,
        duration: 1,
        ease: 'expo.out',
    })
}

const onEnterTop = () => {
    gsap.to(topbtn.value, {
        y: -10,
        duration: 0.3,
        ease: 'poewr4.out',
    })
}

const onLeaveTop = () => {
    gsap.to(topbtn.value, {
        y: 0,
        duration: 0.3,
        ease: 'bounce',
    })
}
</script>

<style>
/*
    bg-primaryYellow
    bg-orange
    bg-pink
    bg-mint
    bg-green
    bg-teal
    bg-blue 
    bg-yellow
    bg-darkyellow 
    bg-purple
    bg-darkpurple
    bg-orange 
    bg-brown
    bg-lime
    text-primaryYellow
    text-orange
    text-pink
    text-mint
    text-green
    text-teal
    text-blue
    text-yellow
    text-newyellow
    text-darkyellow
    text-purple
    text-darkpurple
    text-orange
    text-brown
    bg-darkblue
    text-darkblue
    bg-cyan bg-magenta
    text-magenta
    text-lime
    bg-midblue
    text-midblue
*/
.logo-fuchsia {
    filter: invert(19%) sepia(98%) saturate(2877%) hue-rotate(291deg) brightness(112%) contrast(136%);
}
.logo-lime {
    filter: invert(47%) sepia(19%) saturate(5911%) hue-rotate(81deg) brightness(115%) contrast(92%);
}
.logo-darkyellow {
    filter: invert(58%) sepia(4%) saturate(4174%) hue-rotate(15deg) brightness(97%) contrast(80%);
}
.logo-lightpurple {
    filter: invert(47%) sepia(26%) saturate(328%) hue-rotate(288deg) brightness(95%) contrast(91%);
}
.text-xxsm {
    font-size: 0.7rem;
}
@media (min-width: 1024px) {
    .text-xxsm {
        font-size: 0.8rem;
    }
}
</style>
