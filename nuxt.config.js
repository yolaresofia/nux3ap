export default defineNuxtConfig({
    modules: ['@nuxtjs/supabase', '@nuxtjs/sanity', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
    css: ['assets/css/tailwind.css', 'assets/css/variables.css', 'assets/css/animations.css'],
    meta: {
        title: 'WOMB',
        description: 'WOMB is a production company offering photography, film and creative direction services.',
    },
    sanity: {
        projectId: 'q5syy0z1',
        dataset: 'production',
        minimal: true,
    },
})
