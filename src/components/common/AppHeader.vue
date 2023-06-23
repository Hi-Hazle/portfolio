<template>
  <nav id="header">
    <h1 class="logo">MYMEMINE</h1>
    <article class="navigation">
      <div class="hamburger" ref="hamburger">
        <i></i>
        <i></i>
        <i></i>
      </div>
      <ul>
        <li>
          <p @click="smoothScroll('#work')">work</p>
        </li>
        <li>
          <p @click="smoothScroll('#skills')">skills</p>
        </li>
        <li>
          <p @click="smoothScroll('#vibes')">vibes</p>
        </li>
        <li>
          <p @click="smoothScroll('#about')">about</p>
        </li>
      </ul>
    </article>
  </nav>
</template>

<style lang="scss" scoped>
@import "styles/header.scss";
</style>

<script setup>
import { inject, onMounted, ref, computed } from "vue";
const hamburger = ref();
onMounted(() => {
  hamburger.value.addEventListener("click", () => {
    hamburger.value.classList.toggle("active");
  });
});
</script>
