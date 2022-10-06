export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    "@nuxtjs/sanity",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
  ],
  css: ['assets/css/tailwind.css', 'assets/css/variables.css'],

  sanity: {
    projectId: "q5syy0z1",
    dataset: "production",
    minimal: true,
  },
});
