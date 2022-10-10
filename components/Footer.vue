<template>
    <footer :class="[returnThemeClassFooter(true), 'w-full pb-4 px-2 md:px-4']">
        <div class="flex justify-between w-full">
            <div class="flex flex-col-reverse md:flex-row justify-between md:w-full">
                <img :class="[mainTheme === 'black' && 'invert', 'w-24 md:w-60']" :src="settings.circleLogo" />
                <div class="flex items-end" @click="moveTo()">
                    <img class="md:w-28 w-24 pr-4 cursor-pointer" src="~/assets/images/back-to-top.svg" alt="" />
                </div>
            </div>
            <div class="flex mt-auto">
                <div class="flex flex-col space-y-3 items-end">
                    <img :src="settings.logo" :class="[mainTheme === 'black' && 'invert', 'h-auto w-28 md:w-44']" />
                    <span class="ml-auto text-4xl hidden md:block">🌈</span>
                    <!-- <ButtonBase :url="settings.contact.link">
            {{ settings.contact.text }}</ButtonBase
          >
          <ButtonBase :url="settings.instagram.link">
            {{ settings.instagram.text }}</ButtonBase
          > -->
                </div>
            </div>
        </div>
        <div class="flex w-full flex-col text-right md:flex-row md:justify-between text-xs py-3">
            <h4 class="font-mono">WOMB PRODUCTION COMPANY 2022 ®</h4>
            <h4 class="font-mono">PRIVACY POLICY / FAQ / TERMS & CONDITIONS</h4>
        </div>
    </footer>
</template>

<script setup>
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
        if (path.value.indexOf('project') > -1) {
            path.value = 'project'
        }
    },
    { flush: 'pre', immediate: true, deep: true }
)

const returnThemeClassFooter = (isBackground, color) => {
    const colors = {
        '/': 'primaryYellow',
        '/about': 'pink',
        '/partners': 'orange',
        project: 'lime',
        gallery: 'purple',
    }
    if (isBackground) {
        return mainTheme.value === 'black' ? 'bg-black text-white' : `bg-${colors[path.value]}`
    } else {
        return mainTheme.value === 'black' ? 'text-white' : `text-${color}`
    }
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
    text-darkyellow
    text-purple
    text-darkpurple
    text-orange
    text-brown
    bg-darkblue
    text-darkblue
    bg-cyan bg-magenta
*/
</style>
