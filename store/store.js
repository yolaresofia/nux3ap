import { defineStore } from "pinia";

export const useStore = defineStore("main", () => {


  let settings = ref("");
  function SET_settings(s) {
    settings = s;
  }
  return { settings, SET_settings };
});
