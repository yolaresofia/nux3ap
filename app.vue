<template>
    <div>
        <!-- <div v-if="true" class="grid overflow-x-hidden fadeIn"> -->
        <div v-if="!store.settings.isUnderConstruction" class="grid overflow-x-hidden fadeIn">
            <Navbar />
            <NuxtPage />
            <Cookies />
            <Teleport to="body">
                <Modal :show="isModalOpen" @close="isModalOpen = false" />
            </Teleport>
            <Footer />
        </div>
        <div v-else class="flex-col relative h-screen bg-primaryYellow grid place-items-center">
            <div class="absolute top-0 left-0 w-full flex justify-center">
                <div class="flex items-center py-2 justify-center">
                    <svg class="w-5/12 lg:w-3/12" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128.53 40.46">
                        <g>
                            <path d="M27.12,6.26l2.58,15.99h.08l2.67-15.99h7.54l-5.7,27.82h-7.83l-2.67-15.66h-.12l-2.67,15.66h-7.87L7.43,6.26h7.83l2.67,15.99h.12l2.5-15.99h6.58Z" />
                            <path
                                d="M52.19,34.49c-7.41,0-11.95-5.21-11.95-14.32s4.54-14.32,11.95-14.32,11.91,5.21,11.91,14.32-4.5,14.32-11.91,14.32Zm0-6.58c2.5,0,3.75-2.5,3.75-7.75s-1.25-7.75-3.75-7.75-3.75,2.5-3.75,7.75,1.25,7.75,3.75,7.75Z"
                            />
                            <path d="M81.55,27.53h-4l-3.29-8.62h-.08l.04,5.79v9.37h-7.5V6.26h8.33l4.46,11.04h.12l4.5-11.04h8.2v27.82h-7.5v-9.37l.04-5.79h-.08l-3.25,8.62Z" />
                            <path
                                d="M111.57,19.91c3.42,.62,5.29,3.04,5.29,6.45,0,4.54-2.96,7.7-9.37,7.7h-11.58V6.26h11.66c5.46,0,8.33,2.83,8.33,7.37,0,3.46-1.71,5.58-4.33,6.2v.08Zm-8.04-2.25h2.25c1.71,0,2.5-.87,2.5-2.71s-.75-2.75-2.46-2.75h-2.29v5.46Zm0,10.49h2.75c1.87,0,2.58-.96,2.58-2.79s-.79-2.75-2.58-2.75h-2.75v5.54Z"
                            />
                        </g>
                        <path
                            d="M118.64,7.07c0-1.94,1.48-3.39,3.35-3.39s3.34,1.44,3.34,3.39-1.47,3.38-3.34,3.38-3.35-1.43-3.35-3.38Zm6.14,0c0-1.67-1.2-2.91-2.79-2.91s-2.8,1.24-2.8,2.91,1.2,2.91,2.8,2.91,2.79-1.24,2.79-2.91Zm-4.29-1.85h1.82c.75,0,1.38,.35,1.38,1.08,0,.42-.22,.73-.63,.89v.02c.33,.11,.47,.32,.53,.66,.08,.45,.04,.89,.17,.95v.07h-1.03c-.11-.06-.07-.48-.14-.84-.06-.33-.2-.46-.55-.46h-.51v1.31h-1.04v-3.68Zm1.63,1.62c.34,0,.52-.15,.52-.41s-.16-.41-.5-.41h-.62v.82h.6Z"
                        />
                    </svg>
                    <div class="soehne hidden lg:block uppercase w-[150px] pl-3 text-[12px]">
                        <p>website</p>
                        <p>under construction</p>
                    </div>
                </div>
            </div>
            <div class="soehne lg:hidden block text-center uppercase w-[200px] text-[12px]">
                <p>website</p>
                <p>under construction</p>
            </div>
            <div class="absolute flex justify-center w-full bottom-[40px]">
                <div class="lg:text-6xl text-4xl text-center helvetica-heavy coming-text px-20">
                    <h1>Something big is coming up!</h1>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useStore } from '~/store/store'
const isModalOpen = useState('isModalOpen', () => false)
const store = useStore(),
    mainTheme = useState('mainTheme', () => 'black')
onServerPrefetch(async () => {
    const query = await $fetch(
        `https://q5syy0z1.api.sanity.io/v2021-03-25/data/query/production?query=*%5B_type%3D%3D%22settings%22%5D%7B...%2C%22logo%22%3Alogo.asset-%3Eurl%2C%22circleLogo%22%3AcircleLogo.asset-%3Eurl%7D`
    )

    store.settings = query.result[0]
})

// animation lib
if (process.client) {
    var styles =
        '.fadeInC{animation:fadeAn 0.87s;}@keyframes fadeAn {from {opacity: 0;}to {opacity: 1;}}.scaleUpC{animation:scaleU 0.87s;}@keyframes scaleU {from {opacity: 0;transform: scale(0.7);}to {opacity: 1;transform: scale(1);}}.scaleDC{animation:scaleD 0.87s;}@keyframes scaleD {from {opacity: 0;transform: scale(1.2);}to {opacity: 1;transform: scale(1);}}.fadeLC{animation:fadeL 0.87s;}@keyframes fadeL {from {opacity: 0;transform: translateX(-30px);}to {opacity: 1;transform: translateX(0);}} .fadeRC{animation:fadeR 0.87s;}@keyframes fadeR {from {opacity: 0;transform: translateX(30px);}to {opacity: 1;transform: translateX(0);}}'
    let styleSheet = document.createElement('style')
    ;(styleSheet.type = 'text/css'), (styleSheet.innerText = styles), document.head.appendChild(styleSheet)
    let fadeInTarg = document.querySelectorAll('.fadeIn'),
        scaleDTarg = document.querySelectorAll('.scaleDown'),
        scaleUTarg = document.querySelectorAll('.scaleUp'),
        fadeLeftTarg = document.querySelectorAll('.fadeLeft'),
        fadeRightTarg = document.querySelectorAll('.fadeRight'),
        ae = (e, a) => {
            e.classList.add(a),
                setTimeout(() => {
                    e.style.opacity = 1
                }, 50)
        }
    function io(e, a) {
        new IntersectionObserver((t) => t.forEach((t) => ((t) => t.isIntersecting && ae(e, a))(t))).observe(e)
    }
    fadeLeftTarg &&
        fadeLeftTarg.forEach((e) => {
            ;(e.style.opacity = 0), io(e, 'fadeRC')
        }),
        fadeRightTarg &&
            fadeRightTarg.forEach((e) => {
                ;(e.style.opacity = 0), io(e, 'fadeLC')
            }),
        fadeInTarg &&
            fadeInTarg.forEach((e) => {
                ;(e.style.opacity = 0), io(e, 'fadeInC')
            }),
        scaleDTarg &&
            scaleDTarg.forEach((e) => {
                ;(e.style.opacity = 0), io(e, 'scaleDC')
            }),
        scaleUTarg &&
            scaleUTarg.forEach((e) => {
                ;(e.style.opacity = 0), io(e, 'scaleUpC')
            })
}
</script>
<style>
.coming-text {
    letter-spacing: -2px;
}
/* add media query for 754 px */
@media (min-width: 754px) {
    .coming-text {
        letter-spacing: -4px;
    }
}
</style>
