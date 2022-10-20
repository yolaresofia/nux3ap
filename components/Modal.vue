<script setup>
const props = defineProps({
    show: Boolean,
})
</script>

<template>
    <Transition name="modal">
        <div
            v-if="show"
            :style="{
                backdropFilter: 'blur(10px)',
                filter: 'brightness(150%)',
            }"
            class="modal-mask p-4 text-4xl"
        >
            <div class="flex md:flex-row flex-col">
                <div class="modal-header md:w-4/12 w-full">
                    <h1 class="text-white">Privacy Policy</h1>
                    <button class="text-white" @click="$emit('close')">(close)</button>
                </div>
                <div class="h-[100vh] overflow-scroll md:w-8/12 w-full md:pt-0 pt-12 pb-24">
                    <div class="text-white helvetica-bold m-auto">
                        Last updated: November 2014 Information that is gathered from visitors In common with other websites, log files are stored on the web server saving details such as the
                        visitor's IP address, browser type, referring page and time of visit. Cookies may be used to remember visitor preferences when interacting with the website. Where registration
                        is required, the visitor's email and a username will be stored on the server. How the Information is used The information is used to enhance the vistor's experience when using
                        the website to display personalised content and possibly advertising. E-mail addresses will not be sold, rented or leased to 3rd parties. E-mail may be sent to inform you of
                        news of our services or offers by us or our affiliates. Visitor Options If you have subscribed to one of our services, you may unsubscribe by following the instructions which
                        are included in e-mail that you receive. You may be able to block cookies via your browser settings but this may prevent you from access to certain features of the website.
                        Cookies Cookies are small digital signature files that are stored by your web browser that allow your preferences to be recorded when visiting the website. Also they may be
                        used to track your return visits to the website. 3rd party advertising companies may also use cookies for tracking purposes. Google Ads Google, as a third party vendor, uses
                        cookies to serve ads. Google's use of the DART cookie enables it to serve ads to visitors based on their visit to sites they visit on the Internet. Website visitors may opt out
                        of the use of the DART cookie by visiting the Google ad and content network privacy policy.
                        <div class="modal-footer">
                            <div name="footer" class="pb-12">
                                <button class="modal-default-button" @click="$emit('close')">OK</button>
                            </div>
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

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}
</style>
