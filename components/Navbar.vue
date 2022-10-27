<template>
    <nav
        :style="{
            backdropFilter: toggle ? ' blur(10px)' : '',
            filter: toggle && 'brightness(150%);',
        }"
        :class="['fixed top-0 z-[60] flex flex-wrap justify-between items-center w-full py-1']"
    >
        <div class="flex items-center flex-shrink-0 mr-6 ml-2 h-10 mx-1 md:my-4 my-0">
            <NuxtLink to="/">
                <img :src="settings.logo" alt="" :class="[mainTheme === 'black' && 'invert', `${toggle && 'hidden'} w-30 `]" />
            </NuxtLink>
        </div>
        <div :class="[toggle ? 'white' : 'black', 'relative top-[-38px]']">
            <div class="block lg:hidden cursor-pointer">
                <input type="checkbox" id="overlay-input" />
                <label for="overlay-input" @click="toggleNav" id="overlay-button" class="absolute">
                    <span :class="[mainTheme === 'black' ? 'white' : 'black']"></span>
                </label>
                <title>WOMB</title>
            </div>
        </div>
        <div class="pr-20 md:pr-0 absolute left-[50%] lg:static">
            <ProjectsSwitcher v-if="route.path === '/gallery' || route.path === '/projects'" />
        </div>

        <div :class="[toggle ? 'h-screen' : 'h-0', 'z-[60] w-full flex lg:items-center lg:w-auto items-center']" id="nav-content">
            <ul
                id="link-list"
                :class="[
                    linkse ? 'opacity-100' : 'opacity-0 hidden',
                    'pt-4 lg:pt-0 lg:opacity-100 list-reset lg:flex justify-end flex-1 items-center md:uppercase lg:text-xs text-5xl lg:text-center text-left text-white lg:text-black ',
                ]"
            >
                <div class="grid lg:flex">
                    <li class="text-center md:text-left px-8 md:px-0">
                        <NuxtLink to="/gallery" class="inline-block md:py-2 py-1 no-underline transition-all w-full duration-200 lg:mx-2 hover:text-green">
                            <div class="flex flex-col md:w-28 group text-center md:text-left">
                                <span :class="['md:mr-auto   md:text-white text-[2.5rem] md:text-xs md:bg-transparent pt-4 pb-4 md:pt-0 md:pb-0 rounded-lg', returnNavColors('projects')]"
                                    >Projects</span
                                >
                                <h4 class="text-xxs hidden group-hover:text-white md:flex text-gray-700">A vast range of projects</h4>
                            </div>
                        </NuxtLink>
                    </li>
                    <li class="text-center md:text-left px-8 md:px-0">
                        <NuxtLink to="/partners" class="inline-block md:py-2 py-1 no-underline w-full transition-all duration-200 lg:mx-2 hover:text-green">
                            <div class="flex flex-col group text-center md:text-left">
                                <span :class="['md:mr-auto md:text-white text-[2.5rem] md:text-xs md:bg-transparent pt-4 pb-4 md:pt-0 md:pb-0 rounded-lg', returnNavColors('partners')]">Partners</span>
                                <h4 class="text-xxs hidden group-hover:text-white md:flex text-gray-700 w-28">Our diverse</h4>
                                <h4 class="text-xxs hidden group-hover:text-white md:flex text-gray-700">network of collaborators</h4>
                            </div>
                        </NuxtLink>
                    </li>
                    <li class="text-center md:text-left px-8 md:px-0">
                        <NuxtLink to="/about" class="inline-block md:py-2 py-1 no-underline w-full transition-all duration-200 lg:mx-2 hover:text-green">
                            <div class="flex flex-col group text-center md:text-left">
                                <span :class="['md:mr-auto md:text-white text-[2.5rem] md:text-xs md:bg-transparent pt-4 pb-4 md:pt-0 md:pb-0 rounded-lg', returnNavColors('about')]">About</span>
                                <h4 class="text-xxs hidden group-hover:text-white md:flex text-gray-700 w-28">Learn more</h4>
                                <h4 class="text-xxs hidden group-hover:text-white md:flex text-gray-700">about our process</h4>
                            </div>
                        </NuxtLink>
                    </li>
                </div>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import { useStore } from '~/store/store'
let { settings } = useStore()
const mainTheme = useState('mainTheme')
let toggle = ref(false)
let linkse = ref(false)
const route = useRoute()
onMounted(() => {
    if (process.client) {
        window.innerWidth < 1000 && clickAndClose()
    }
})
const toggleNav = () => {
    toggle.value = !toggle.value
    linkse.value ? (linkse.value = !linkse.value) : (linkse.value = !linkse.value)
}
const clickAndClose = () => {
    let lis = document.getElementsByTagName('li')
    let burger = document.getElementById('overlay-button')
    ;[...lis].forEach((x) =>
        x.addEventListener('click', () => {
            burger.click()
        })
    )
}
const returnNavColors = (routeNav) => {
    const primaryColors = {
        projects: 'bg-purple text-yellow',
        about: 'bg-pink text-green',
        partners: 'bg-orange text-blue',
    }
    return mainTheme.value === 'black' ? 'bg-white text-black' : primaryColors[routeNav]
}
</script>

<style>
h4 {
    line-height: 1.1;
}

.invert {
    filter: invert(1);
}

.text-xxs {
    font-size: 0.5rem;
}

nav {
    transition: all 0.08s;
    position: fixed;
    top: 0;
}

@media (max-width: 768px) {
    nav * {
        font-family: 'Helveticabold';
    }
}

@media (min-width: 768px) {
    nav * {
        font-family: 'Soehne';
    }
}

#overlay-button {
    position: absolute;
    top: 1.6em;
    right: 0.8em;
    z-index: 5;
    cursor: pointer;
    user-select: none;
}

#overlay-button .white {
    height: 3px;
    width: 35px;
    background-color: white;
    position: relative;
    display: block;
    transition: all 0.2s ease-in-out;
}

#overlay-button .white:before,
#overlay-button .white:after {
    height: 3px;
    width: 35px;
    background-color: white;
    position: absolute;
    content: '';
    transition: all 0.2s ease-in-out;
}

#overlay-button .black {
    height: 3px;
    width: 35px;
    background-color: #000;
    position: relative;
    display: block;
    transition: all 0.2s ease-in-out;
}

#overlay-button .black:before,
#overlay-button .black:after {
    height: 3px;
    width: 35px;
    background-color: rgb(255, 255, 255);
    position: absolute;
    content: '';
    transition: all 0.2s ease-in-out;
}

#overlay-button span:before {
    top: 10px;
    visibility: visible;
}

#overlay-button span:after {
    top: 19px;
    visibility: visible;
}

#overlay-button span:before,
#overlay-button span:after {
    height: 5px;
    width: 35px;
    position: absolute;
    background-color: inherit;
    content: '';
    transition: all 0.2s ease-in-out;
}

input[type='checkbox'] {
    display: none;
}

input[type='checkbox']:checked ~ #overlay {
    visibility: visible;
}

input[type='checkbox']:checked ~ #overlay-button:hover span,
input[type='checkbox']:checked ~ #overlay-button span {
    background: transparent;
}

input[type='checkbox']:checked ~ #overlay-button span:before {
    transform: rotate(35deg) translate(4px, -2px);
    opacity: 1;
}

input[type='checkbox']:checked ~ #overlay-button span:after {
    transform: rotate(-35deg) translate(9px, -5px);
}
</style>
