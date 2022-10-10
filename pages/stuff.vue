<template>
  <div ref="fade" class="w-full bg-green fade h-screen" style="opacity: 0">
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
  </div>
</template>
<script setup>
import { selectAll } from "~/mixins/general";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
definePageMeta({
  pageTransition: {
    mode: "default",
    appear: true,
  },
});
gsap.registerPlugin(ScrollTrigger);

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

if (false) {
  await clientSB.from("comment").delete().neq("id", 0);
  const { data: comments } = await useFetch("/api/igcomments");
  try {
    if (comments._rawValue.data) {
       
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
