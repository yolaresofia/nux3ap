<template>
  <div :class="[returnThemeClass(true, 'pink', mainTheme)]">
    <div class="flex flex-col lg:min-h-screen py-20 md:px-4 px-3">
      <p :class="['heading-3', returnThemeClass(false, 'mint', mainTheme)]">
        {{ page.header }}
      </p>
      <div class="lg:grid lg:grid-cols-2 lg:p-20 mx-auto">
        <div v-for="author in page.authors" :key="author.id" class="m-4 fadeIn">
          <div class="flex flex-col text-center lg:px-8 px-0">
            <h1
              :class="[
                'font-black helvetica-bold p-4 lg:text-4xl text-2_5xl leading-none',
                returnThemeClass(false, 'teal', mainTheme),
              ]"
            >
              {{ author.name }}
            </h1>
            <p class="soehne text-xs">{{ author.description }}</p>
          </div>
        </div>
      </div>
      <Pill text="clients" :color="mainTheme === 'black' ? false : true" />
      <div
        :class="[
          'text-[32px] leading-8 text-center',
          returnThemeClass(false, 'mint', mainTheme),
        ]"
      >
        <SanityContent :blocks="page.clients" />
      </div>
      <div class="hidden md:block">
        <Pill text="services" :color="mainTheme === 'black' ? false : true" />
        <div class="grid grid-cols-3 w-full">
          <div
            v-for="service in page.services"
            :key="service.id"
            class="flex-1 flex-col m-4 fadeIn"
          >
            <h1
              :class="[
                'font-black py-4 text-xl leading-none text-left',
                returnThemeClass(false, 'teal', mainTheme),
              ]"
            >
              {{ service.name }}
            </h1>
            <div
              class="flex h-80 bg-cover bg-center rounded-3xl relative"
              :style="{
                backgroundImage: 'url(' + urlFor(service.image.asset._ref) + ')',
              }"
            ></div>
          </div>
        </div>
      </div>
      <Pill text="awards" :color="mainTheme === 'black' ? false : true" />
      <div class="soehne column-split text-xs formattedRichText">
        <SanityContent :blocks="page.awards" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { returnThemeClass, urlFor } from "~/mixins/general";
definePageMeta({
  pageTransition: {
    mode: "default",
    appear: true,
  },
});
const mainTheme = useState("mainTheme");

const sanity = useSanity();
const query = groq`*[_type=="about"][0]`;

const { data: page } = await useAsyncData("about", async () =>
  sanity.fetch(query)
);
</script>

<style scoped>
.column-split {
  column-count: 2;
}

@media only screen and (max-width: 780px) {
  .column-split {
    column-count: 1;
  }
}
</style>
