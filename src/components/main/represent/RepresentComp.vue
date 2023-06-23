<template>
  <section class="represent mt300">
    <div class="inner">
      <div class="title">
        <h2>
          These are things<br />
          that represent me
        </h2>
        <p>Pick whatever you want</p>
      </div>
      <ul>
        <li v-for="({ title, desc, id }, i) in txtElements" :key="i">
          <Canvas :type="id" />
          <div class="txt">
            <h3>{{ title }}</h3>
            <p>{{ desc }}</p>
            <div class="dot-wrap">
              <i v-for="index in 4" :key="index"></i>
            </div>
          </div>
        </li>
        <!-- <li>
          <div class="gltf">
            <div ref="tenten" class="three"></div>
            <div class="dot-wrap">
              <i v-for="index in 4" :key="index"></i>
            </div>
          </div>
          <div class="txt">
            <h3>아직 성장중.</h3>
            <p>Continuous Learning</p>
            <div class="dot-wrap">
              <i v-for="index in 4" :key="index"></i>
            </div>
          </div>
        </li> -->
        <!-- <li>
          <div class="gltf">
            <div ref="tama" class="three"></div>
            <div class="dot-wrap">
              <i v-for="index in 4" :key="index"></i>
            </div>
          </div>
          <div class="txt">
            <h3>AI에게 대체되지 않을.</h3>
            <p>Irreplaceable</p>
            <div class="dot-wrap">
              <i v-for="index in 4" :key="index"></i>
            </div>
          </div>
        </li>
        <li>
          <div class="gltf">
            <div ref="book" class="three"></div>
            <div class="dot-wrap">
              <i v-for="index in 4" :key="index"></i>
            </div>
          </div>
          <div class="txt">
            <h3>탁월한 문제해결 능력.</h3>
            <p>Problem Solving</p>
            <div class="dot-wrap">
              <i v-for="index in 4" :key="index"></i>
            </div>
          </div>
        </li>
        <li>
          <div class="gltf">
            <div ref="sponge" class="three"></div>
            <div class="dot-wrap">
              <i v-for="index in 4" :key="index"></i>
            </div>
          </div>
          <div class="txt">
            <h3>스펀지같은 흡수력.</h3>
            <p>Sponge-like Absorbency</p>
            <div class="dot-wrap">
              <i v-for="index in 4" :key="index"></i>
            </div>
          </div>
        </li> -->
      </ul>
    </div>
  </section>
</template>
<script setup>
import Canvas from "./CanvasComp.vue";
const txtElements = [
  {
    id: "tenten",
    title: "아직 성장중.",
    desc: "Continuous Learning",
  },
  {
    id: "tama",
    title: "AI에게 대체되지 않을.",
    desc: "Irreplaceable",
  },
  {
    id: "book",
    title: "탁월한 문제해결 능력.",
    desc: "Problem Solving",
  },
  {
    id: "sponge",
    title: "스펀지같은 흡수력.",
    desc: "Sponge-like Absorbency",
  },
];
</script>
