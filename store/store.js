import { defineStore } from 'pinia'

export const useStore = defineStore('main', () => {
    let settings = ref('')
    function SET_settings(s) {
        settings = s
    }
    let comments = ref('')
    function SET_comments(s) {
        comments = s
    }

    return { settings, SET_settings, comments, SET_comments }
})
