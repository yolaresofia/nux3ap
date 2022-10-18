<script setup>
const props = defineProps({
    show: Boolean,
})
</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container w-[90vw] rounded-xl bg-black">
                    <div class="modal-header">
                        <slot name="header">default header</slot>
                    </div>

                    <div class="text-xs text-white soehne">
                        A cookie policy is at the heart of compliance with most major data privacy legislations in the world – while some laws require end-user consent and others opt-out options for
                        visitors, almost all require your website to keep an updated account of all cookies and trackers, and to make this available to end-users visiting your domain. Data privacy is
                        also one of the fastest expanding fields of consumer demand – end-users want transparency into and control of how their data is handled when visiting your website, and
                        consumers are increasingly ready to do business elsewhere if their data privacy is disrespected. In this blogpost, learn more about building trust with your end-users through
                        transparent and compliant use of cookies, and get an automatic cookie policy generated for your website with Cookiebot consent management platform (CMP).
                        <div class="modal-footer">
                            <slot name="footer">
                                default footer
                                <button class="modal-default-button" @click="$emit('close')">OK</button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    z-index: 9998;
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    margin: 0px auto;
    padding: 20px 30px;

    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
