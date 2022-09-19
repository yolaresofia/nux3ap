<template>
  <div style="padding:2rem; font-size:30px;">


    <!-- <p>{{ date }}</p> -->
    <p>{{ comments.data }}</p>
  </div>
</template>


<script setup>
const {data:comments} = await useFetch("/api/test");
 
</script>
