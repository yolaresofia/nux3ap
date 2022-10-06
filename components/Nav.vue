<template>
  <div>
    <img :src="settings.circleLogo" alt="" class="w-10" />
  </div>
</template>

<script setup>
import { useStore } from "~/store/store";
const {settings} = useStore();
// const { settings} = store;
</script>

<style lang="scss" scoped></style>
