<template>
    <div :class="[returnThemeClass(true, 'orange', mainTheme), 'min-h-screen p-2 md:p-4']">
        <h1 :class="['md:py-20 pt-24 pb-8 text-3_5xl md:text-8xl leading-7 tracking-tight md:leading-[4.5rem] md:tracking-[0.05rem]', returnThemeClass(false, 'green', mainTheme)]">
            {{ page.title }}
        </h1>
        <div class="">
            <div class="grid grid-cols-2 lg:grid-cols-3">
                <div v-for="(element, index) in page.collection" :key="index" class="-my-1">
                    <h2
                        :class="[index === currentIndex ? 'text-white' : returnThemeClass(false, 'blue', mainTheme), 'text-[15px] leading-6 md:text-2xl font-black cursor-pointer min-w-18']"
                        @click="currentIndex = index"
                    >
                        {{ element.name }}
                    </h2>
                </div>
            </div>
            <div class="grid md:pt-10 md:pb-10 pt-4 pb-2 min-h-26 md:min-h-44 h-full">
                <h3 class="md:text-2xl text-base">
                    {{ page.collection[currentIndex].jobDescription }}
                </h3>
                <h4 class="soehne text-xs leading-4 tracking-normal md:text-lg md:leading-5">
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

const sanity = useSanity()
const query = groq`*[_type=="partners"][0]`
const currentIndex = useState('currentIndex', () => 0)
const { data: page } = await useAsyncData('partners', async () => sanity.fetch(query))
</script>
