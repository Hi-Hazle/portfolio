<template>
  <section class="loading-wrap">
    <div class="content">
      <article class="code">
        <p>&lt;&lt; unknown user &gt;&gt;</p>
        <p>&gt; confirming PC stability...</p>
        <p>&gt; stability confirmed</p>
        <p>&gt; generating UUID...</p>
        <p>&gt; UUID generated</p>
        <p>&gt; entering MYMEMINE Portfolio site</p>
        <p>
          &gt; This process may take some time. Please do not close the browser
          window.
        </p>
      </article>
      <article class="logo">
        <h2><b>W</b>ELCOME<b>22</b></h2>
        <p>Made in 2023</p>
      </article>
      <article class="process">
        <p>Unlocking ...</p>
        <div class="bar">
          <span :style="{ width: completedPercentage + '%' }"></span>
        </div>
      </article>
    </div>
    <ul class="glitch">
      <li><span v-for="x in 80" :key="x"></span></li>
      <li><span v-for="x in 80" :key="x"></span></li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
@import "styles/loader.scss";
</style>

<script setup>
import { inject, onMounted, ref, watch } from "vue";
const completedPercentage = inject("completedPercentage", ref(0));
</script>
