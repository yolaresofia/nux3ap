<template>
    <nav
        :style="{
            backdropFilter: toggle ? ' blur(10px)' : '',
            filter: toggle && 'brightness(150%);',
        }"
        :class="['fixed top-0 z-10 flex flex-wrap items-center justify-between w-full py-1 xl:pr-12']"
    >
        <div class="flex items-center flex-shrink-0 mr-6 lg:ml-4">
            <NuxtLink to="/">
                <img :src="settings.logo" alt="" :class="[mainTheme === 'black' && 'invert', 'w-30 h-auto md:mx-3 mx-1 md:my-4 my-0']" />
            </NuxtLink>
        </div>
        <div :class="[toggle ? 'sm:circleMenu' : 'sm:circleMenu2']">
            <div class="block lg:hidden cursor-pointer">
                <input type="checkbox" id="overlay-input" />
                <label for="overlay-input" @click="toggleNav" id="overlay-button" class="absolute">
                    <span :class="[mainTheme === 'black' ? 'white' : 'black']"></span>
                </label>
                <title>WOMB</title>
            </div>
        </div>

        <!-- <ProjectsSwitcher v-if="$router.history.current.name === 'gallery' || $router.history.current.name === 'projects'" /> -->

        <div :class="[toggle ? 'h-screen' : 'h-0', 'w-full flex-grow flex lg:items-center lg:w-auto items-center']" id="nav-content">
            <ul
                id="link-list"
                :class="[
                    linkse ? 'opacity-100' : 'opacity-0 hidden',
                    'pt-4 lg:pt-0 lg:opacity-100 list-reset lg:flex justify-end flex-1 items-center md:uppercase lg:text-xs text-5xl lg:text-center text-left text-white lg:text-black ',
                ]"
            >
                <div class="grid lg:flex">
                    <li class="text-center md:text-left">
                        <span class="hidden md:inline-block py-2 no-underline transition-all duration-200 desktop:mx-4 tablet:mx-2 hover:text-green cursor-pointer" @click="changeTheme"> 🌈 </span>
                    </li>

                    <li class="text-center md:text-left px-8 md:px-0">
                        <NuxtLink to="/gallery" class="inline-block md:py-2 py-1 no-underline transition-all w-full duration-200 lg:mx-2 hover:text-green">
                            <div class="flex flex-col md:w-28 text-center md:text-left">
                                <span class="md:mr-auto text-black md:text-white text-[2.5rem] md:text-xs bg-white md:bg-transparent pt-4 pb-4 md:pt-0 md:pb-0 rounded-lg">Projects</span>
                                <h4 class="text-xxs hidden md:flex text-gray-700">A vast range of projects</h4>
                            </div>
                        </NuxtLink>
                    </li>
                    <li class="text-center md:text-left px-8 md:px-0">
                        <NuxtLink to="/partners" class="inline-block md:py-2 py-1 no-underline w-full transition-all duration-200 lg:mx-2 hover:text-green">
                            <div class="flex flex-col text-center md:text-left">
                                <span class="md:mr-auto text-black md:text-white text-[2.5rem] md:text-xs bg-white md:bg-transparent pt-4 pb-4 md:pt-0 md:pb-0 rounded-lg">Partners</span>
                                <h4 class="text-xxs hidden md:flex text-gray-700 w-28">Our diverse</h4>
                                <h4 class="text-xxs hidden md:flex text-gray-700">network of collaborators</h4>
                            </div>
                            </NuxtLink>
                    </li>
                    <li class="text-center md:text-left px-8 md:px-0">
                        <NuxtLink to="/about" class="inline-block md:py-2 py-1 no-underline w-full transition-all duration-200 lg:mx-2 hover:text-green">
                            <div class="flex flex-col text-center md:text-left">
                                <span class="md:mr-auto text-black md:text-white text-[2.5rem] md:text-xs bg-white md:bg-transparent pt-4 pb-4 md:pt-0 md:pb-0 rounded-lg">About</span>
                                <h4 class="text-xxs hidden md:flex text-gray-700 w-28">Learn more</h4>
                                <h4 class="text-xxs hidden md:flex text-gray-700">about our process</h4>
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
onMounted(() => {
    if (process.client) {
        window.innerWidth < 1000 && clickAndClose()
    }
})
const changeTheme = () => {
    if (mainTheme.value === 'black') {
        mainTheme.value = 'white'
    } else {
        mainTheme.value = 'black'
    }
}
const toggleNav = () => {
    toggle.value = !toggle.value
    linkse.value ? (linkse.value = !linkse.value) : (linkse.value = !linkse.value)
}
const clickAndClose = () => {
    let lis = document.getElementsByTagName('li')
    let burger = document.getElementById('overlay-button');
    [...lis].forEach((x) =>
        x.addEventListener('click', () => {
            burger.click()
        })
    )
};
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
    top: 1.4em;
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
    height: 3px;

    background-color: #000;

    position: absolute;
    content: '';
    transition: all 0.2s ease-in-out;
}

#overlay-button span:before {
    top: -7px;
    visibility: visible;
}

#overlay-button span:after {
    top: 7px;
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
    transform: rotate(45deg) translate(7px, 5px);
    opacity: 1;
}

input[type='checkbox']:checked ~ #overlay-button span:after {
    transform: rotate(-45deg) translate(9px, -9px);
}

</style>
