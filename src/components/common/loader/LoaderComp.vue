<template>
  <section class="loading-wrap">
    <div class="content">
      <article class="code">
        <p v-for="line in codeLines" :key="line"></p>
      </article>
      <article class="logo">
        <h2><b>W</b>ELCOME<b>22</b></h2>
        <p>Made in 2023</p>
      </article>
      <article class="process">
        <p>Unlocking ...</p>
        <div class="bar">
          <span :style="{ width: barWidth }"></span>
        </div>
      </article>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "styles/loader.scss";
</style>

<script setup>
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);

import { inject, onMounted, ref, computed } from "vue";

const completedPercentage = inject("completedPercentage", ref(0));
const animCompleted = inject("animCompleted", ref(false));

const barWidth = computed(() => `${completedPercentage.value}%`);

const codeLines = [
  "&lt;&lt; unknown user &gt;&gt;",
  "&gt; confirming PC stability...",
  "&gt; stability confirmed",
  "&gt; generating UUID...",
  "&gt; UUID generated!",
  "&gt; entering MYMEMINE Portfolio site...",
  "&gt; This process may take some time. Please do not close the browser window..",
];

onMounted(() => {
  const tl = gsap.timeline({
    onComplete: () => {
      animCompleted.value = true;
    },
  });

  codeLines.forEach((line, index) => {
    tl.to(
      `.code p:nth-child(${index + 1})`,
      {
        duration: 0.7,
        text: {
          value: line,
        },
      },
      index === 0 ? "" : "-=50%"
    );
  });
});
</script>
