<template>
    <div class="grid overflow-x-hidden fadeIn">
        <Navbar />
        <NuxtPage />
        <Footer />
    </div>
</template>
<script setup>
import { useStore } from '~/store/store'

const store = useStore(),
    mainTheme = useState('mainTheme', () => 'black')
onServerPrefetch(async () => {
    const query = await $fetch(
        `https://q5syy0z1.api.sanity.io/v2021-03-25/data/query/production?query=*%5B_type%3D%3D%22settings%22%5D%7B...%2C%22logo%22%3Alogo.asset-%3Eurl%2C%22circleLogo%22%3AcircleLogo.asset-%3Eurl%7D`
    )

    store.settings = query.result[0]

   
})
</script>
