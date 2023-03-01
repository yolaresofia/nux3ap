<template>
    <div class="flex space-x-4 justify-center items-center">
        <!-- <button class="list relative" data-gallery-list-btn>
            <List />
        </button> -->

        <NuxtLink to="/gallery" class="gallery-eye">
            <div class="eye relative w-auto">
                <svg height="68" viewBox="0 0 109 68" width="109" xmlns="http://www.w3.org/2000/svg">
                    <g fill="#fff">
                        <circle cx="53.57035" cy="34.54886" r="22.3" transform="matrix(.97325912 -.22971002 .22971002 .97325912 -6.503701 13.229513)" />
                        <path
                            d="m54.66 0c-.13 0-.26 0-.39 0s-.25 0-.37 0c-29.8.13-53.9 15.26-53.9 33.91s24.3 33.92 54.27 33.92 54.27-15.19 54.27-33.92-24.09-33.78-53.88-33.91zm20.44 46.48c-4.2 7.56-12.26 12.69-21.51 12.69s-17.73-5.42-21.83-13.31c-8.64-3.31-13.62-8.14-13.62-11.95s5.36-9.03 14.62-12.33c4.35-6.94 12.05-11.59 20.83-11.59s16.09 4.39 20.49 11.03c10.29 3.27 16.31 8.69 16.31 12.89s-5.62 9.27-15.29 12.57z"
                        />
                    </g>
                </svg>
                <span v-if="route.path === '/gallery'" class="absolute inset-0 translate-x-[2px] -translate-y-[2px] duration-150">
                    <svg height="68" viewBox="0 0 109 68" width="109" xmlns="http://www.w3.org/2000/svg">
                        <g fill="#222">
                            <circle cx="53.57035" cy="34.54886" r="22.3" transform="matrix(.97325912 -.22971002 .22971002 .97325912 -6.503701 13.229513)" />
                            <path
                                d="m54.66 0c-.13 0-.26 0-.39 0s-.25 0-.37 0c-29.8.13-53.9 15.26-53.9 33.91s24.3 33.92 54.27 33.92 54.27-15.19 54.27-33.92-24.09-33.78-53.88-33.91zm20.44 46.48c-4.2 7.56-12.26 12.69-21.51 12.69s-17.73-5.42-21.83-13.31c-8.64-3.31-13.62-8.14-13.62-11.95s5.36-9.03 14.62-12.33c4.35-6.94 12.05-11.59 20.83-11.59s16.09 4.39 20.49 11.03c10.29 3.27 16.31 8.69 16.31 12.89s-5.62 9.27-15.29 12.57z"
                            />
                        </g>
                    </svg>
                </span>
            </div>
        </NuxtLink>

        <NuxtLink to="/projects" class="projects-grid grid grid-svg | relative">
            <Grid />
            <span v-if="route.path === '/projects'" class="active-projects | absolute inset-0 duration-150">
                <Grid color="#353636" />
            </span>
        </NuxtLink>
    </div>
</template>

<script setup>
import List from './svgs/List.vue'
import Grid from './svgs/Grid.vue'
const route = useRoute()
</script>

<style scoped>
svg {
    width: 100%;
    height: 100%;
}

.list {
    height: 35px;
}

.eye,
.grid {
    height: 30px;
}

.eye {
    width: 50px;
}

.grid,
.list {
    width: 30px;
}

.active-gallery {
    transform: translate3d(2px, -1px, 0);
}

.active-projects {
    transform: translate3d(2px, -2px, 0);
}

.list:hover .active-gallery,
.grid-svg:hover .active-projects {
    display: block;
}

.nuxt-link-exact-active .active-gallery,
.nuxt-link-exact-active .active-projects {
    display: block;
}

.nuxt-link-exact-active:hover .active-gallery {
    transform: translate3d(3px, -2px, 0);
}

.nuxt-link-exact-active:hover .active-projects {
    transform: translate3d(3px, -3px, 0);
}
</style>
