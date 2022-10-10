<template>
    <div :class="[returnThemeClass(true, 'orange', mainTheme), 'min-h-screen p-4']">
        <h1 :class="['py-20', returnThemeClass(false, 'green')]">Our partners are lorem ipsum dolor sit amet</h1>
        <div class="">
            <div class="grid grid-cols-2 lg:grid-cols-3">
                <div v-for="(element, index) in page.collection" :key="index" class="-my-1">
                    <h2 :class="[index === currentIndex ? 'text-white' : returnThemeClass(false, 'blue', mainTheme), 'text-2xl font-black cursor-pointer min-w-18']" @click="currentIndex = index">
                        {{ element.name }}
                    </h2>
                </div>
            </div>
            <div class="grid py-10 min-h-50 h-full">
                <h3 class="text-2xl">
                    {{ page.collection[currentIndex].jobDescription }}
                </h3>
                <h4 class="soehne">
                    {{ page.collection[currentIndex].text }}
                </h4>
            </div>
            <div class="">
                <div class="w-full">
                    <SanityImage :asset-id="page.collection[currentIndex].image.asset._ref" class="rounded-3xl" format="webp" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { returnThemeClass } from '~/mixins/general'
const mainTheme = useState('mainTheme')
definePageMeta({
  pageTransition: {
    mode: "default",
    appear: true,
  },
});
const sanity = useSanity()
const query = groq`*[_type=="partners"][0]`
const currentIndex = useState('currentIndex', () => 0)
const { data: page } = await useAsyncData('partners', async () => sanity.fetch(query))
</script>

<style scoped>
h1 {
    letter-spacing: 0.05rem !important;
    font-size: 5rem;
    line-height: 4.5rem;
}
</style>
