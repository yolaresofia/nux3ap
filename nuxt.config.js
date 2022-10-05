export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    "@nuxtjs/sanity",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
  ],

  sanity: {
    projectId: "q5syy0z1",
    dataset: "production",
    minimal: true,
  },
});
