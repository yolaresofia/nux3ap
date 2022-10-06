<template>
  <div ref="fade" class="w-full bg-blue-200 fade" style="opacity: 0">
    <NuxtLink to="/"> home </NuxtLink>

    <div class="lg:grid lg:grid-cols-2 lg:p-20 mx-auto">
      <div v-for="co in comment" :key="co" class="m-4 fadeIn">
        <div class="flex flex-col text-center lg:px-8 px-0">
          <h1
            :class="[
              'font-black helvetica-bold p-4 lg:text-4xl text-2_5xl leading-none',
            ]"
          >
            {{ co.title }}
            {{ co.user }}
          </h1>
        </div>
      </div>
    </div>
    <!-- section 1  -->
    <div v-if="page" class="flex flex-col lg:min-h-screen py-28 md:px-4">
      <!-- <p>{{ page.header }}</p> -->

      <div text="clients" />
      <div :class="['heading-4 text-center']">
        <!-- <div :blocks="clients" /> -->
      </div>
      <div text="services" />
      <div class="grid grid-cols-3 w-full">
        <div
          v-for="service in page.services"
          :key="service.id"
          class="flex-1 flex-col m-4 fadeIn"
        >
          <h1 :class="['font-black py-4 text-xl leading-none text-left']">
            {{ service.name }}
          </h1>
          <div
            class="flex h-80 bg-cover bg-center rounded-3xl relative"
            :style="{ backgroundImage: 'url()' }"
          />
        </div>
      </div>
      <div text="awards" />
      <div class="soehne column-split text-xs">
        <!-- <div :blocks="awards" /> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CSSPlugin } from "gsap/CSSPlugin";
definePageMeta({
  pageTransition: {
    mode: "default",
    appear: true,
  },
});
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CSSPlugin);

const fade = ref(null);
onMounted(() => {
  gsap.to(".fade", {
    opacity: 1,
    duration: 1,
  });
});
// const sanity = useSanity();
// const query = groq`*[_type=="about"][0]`;

// const { data: page } = await useAsyncData("page", async () =>
//   sanity.fetch(query)
// );
const clientSB = useSupabaseClient();

const { data } = await clientSB
  .from("lastcheck")
  .select("*")
  .order("created_at", { ascending: false });

const HOUR = 1000 * 60 * 60;
const anHourAgo = Date.now() - HOUR;
const lastCheck = new Date(data[0].created_at) < new Date(anHourAgo);

if (lastCheck) {
  await clientSB.from("comment").delete().neq("id", 0);
  const { data: comments } = await useFetch("/api/igcomments");
  try {
    if (comments._rawValue.data) {
      console.log(comments._rawValue.data);
      comments._rawValue.data.forEach(async (item) => {
        await clientSB.from("comment").upsert({
          title: item.text,
          user: item.user,
          timestamp: item.timestamp,
        });
      });
      await clientSB.from("lastcheck").upsert({
        check: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
const { data: comment } = await useAsyncData("comment", async () => {
  const { data } = await clientSB
    .from("comment")
    .select("*")
    .order("timestamp", { ascending: false });
  return data;
});
</script>
