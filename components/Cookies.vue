<template>
    <div
        v-if="isCookiesOpen"
        :class="['fixed  flex flex-col z-40 md:w-[30rem] bottom-4 left-4 right-4 md:right-auto py-4 px-2 rounded-xl', mainTheme === 'black' ? 'bg-midgray' : returnThemeClass(true, 'lime', mainTheme)]"
    >
        <p class="text-xs soehne">
            By continuing to browse this site, you agree to the use of cookies to identify your session and to remember your login after you close the browser (authentication cookies).
        </p>
        <div class="mt-2 ml-auto">
            <button @click="openModal" class="px-2 py-1 mx-1 text-black bg-white rounded-3xl">Learn more</button>

            <button @click="closeBanner" class="px-2 py-1 mx-1 text-white bg-black rounded-3xl">Agree & close</button>
        </div>
    </div>
</template>

<script setup>
import { useStore } from '~/store/store'
import { returnThemeClass } from '~/mixins/general'
const mainTheme = useState('mainTheme')
const isCookiesOpen = useState('isCookiesOpen', () => true)
const isModalOpen = useState('isModalOpen', () => false)

const store = useStore()

const openModal = () => {
    isModalOpen.value = true
    isCookiesOpen.value = false
}

const closeBanner = () => {
    isCookiesOpen.value = false
    store.cookieBannerClosed = true
}
</script>

