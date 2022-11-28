<template>
    <div :class="[returnThemeClass(true, 'orange', mainTheme), 'min-h-screen p-2 md:p-4']">
        <h1 :class="['md:py-20 pt-24 pb-8 helvetica-heavy text-3_5xl md:text-8xl leading-7 md:leading-[4.5rem] tracking-[-0.64px] md:tracking-[-1.6px]', returnThemeClass(false, 'green', mainTheme)]">
            {{ page.title }}
        </h1>
        <div class="">
            <div class="grid grid-cols-2 lg:grid-cols-3">
                <div v-for="(element, index) in page.collection" :key="index" class="-my-1">
                    <h2
                        :class="[index === currentIndex ? 'text-white' : returnThemeClass(false, 'midblue', mainTheme), ' partner-text leading-[20px] sm:leading-[40px] md:text-[32px] font-black cursor-pointer min-w-18 helvetica-heavy']"
                        @click="currentIndex = index"
                    >
                        {{ element.name }}
                    </h2>
                </div>
            </div>
            <div class="grid md:pt-10 md:pb-10 pt-4 pb-2 min-h-26 md:min-h-44 h-full">
                <h3 :class="[returnThemeClass(false, 'newyellow', mainTheme),'md:text-[32px] text-base helvetica-heavy']">
                    {{ page.collection[currentIndex].jobDescription }}
                </h3>
                <h4 class="soehne text-xs lg:text-[16px] leading-4 tracking-normal md:leading-5">
                    {{ page.collection[currentIndex].text }}
                </h4>
            </div>
            <div class="">
                <div class="w-full pb-5">
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
<style>
/* query for max-width 375 */
@media only screen and (max-width: 321px) {
    .partner-text {
        font-size: 12px;
    }
}
@media only screen and (max-width: 375px) {
    .partner-text {
        font-size: 12px;
    }
}

</style>