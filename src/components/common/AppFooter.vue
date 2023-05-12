<style lang="scss" scoped>
@import "styles/footer.scss";
</style>

<template>
  <footer id="commonFooter">
    <h1 class="logo">
      <p>MINE</p>
      <span>KOR</span>
    </h1>
    <ul>
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/collection">Collection</RouterLink></li>
    </ul>
    <address>Copyright 2023 ~ ME MADE MINE, INC. All Rights Reserved.</address>
  </footer>
</template>
<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // console.log("FOOTER");
});
</script>
