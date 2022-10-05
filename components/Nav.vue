<template>
  <div>
    <img :src="sets.circleLogo" alt="" class="w-10" />
  </div>
</template>

<script setup>
import { useStore } from "~/store/store";
const {sets} = useStore();
// const { sets } = store;
</script>

<style lang="scss" scoped></style>
