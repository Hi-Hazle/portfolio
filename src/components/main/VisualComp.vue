<template>
  <section class="mainVisual">
    <div class="inner">
      <HologramScene />
      <article class="mainText">
        <h2>Coffee, Code</h2>
        <h2>And Creativity</h2>
      </article>
      <article class="iconText">
        <img src="@images/main/rotateIcon.png" alt="" />
        <p>
          Just<br />
          Portfolio
        </p>
      </article>
      <p class="sideSmText">It's time to<br />dive into my world</p>
      <ul class="sideLgText">
        <li>
          <p>35,4K</p>
          <span>Hours of effort</span>
        </li>
        <li>
          <p>381</p>
          <span>Commits</span>
        </li>
      </ul>
      <ul class="btnList">
        <li class="button contained linkBox">Recent Works</li>
        <li class="button outlined linkBox">Collections</li>
      </ul>
    </div>
  </section>
</template>
<script>
import HologramScene from "components/main/HologramScene.vue";

export default {
  components: {
    HologramScene,
  },
};
</script>
<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // console.log("VISUAL");
});
</script>
