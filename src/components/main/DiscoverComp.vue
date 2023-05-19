<template>
  <section class="discover mt300">
    <div class="inner">
      <h2 class="commonTittle">Discover</h2>
      <ul class="grid">
        <li>
          <div class="three" ref="tenten"></div>
          <dl class="desc">
            <dt>
              <h3>아직 성장중.</h3>
              <p>Continuous Learning</p>
            </dt>
            <dd>
              <p><img src="@images/main/greenUpIco.svg" alt="" />189.9%</p>
              <p><img src="@images/main/coinIco.svg" alt="" />150.85</p>
            </dd>
          </dl>
        </li>
        <li>
          <div class="three" ref="people"></div>
          <dl class="desc">
            <dt>
              <h3>AI에게 대체되지 않을.</h3>
              <p>Irreplaceable</p>
            </dt>
            <dd>
              <p><img src="@images/main/greenUpIco.svg" alt="" />101.6%</p>
              <p><img src="@images/main/coinIco.svg" alt="" />112.03</p>
            </dd>
          </dl>
        </li>
        <li>
          <div class="three" ref="chatgpt"></div>
          <dl class="desc">
            <dt>
              <h3>탁월한 문제해결 능력.</h3>
              <p>Problem Solving</p>
            </dt>
            <dd>
              <p><img src="@images/main/greenUpIco.svg" alt="" />161.9%</p>
              <p><img src="@images/main/coinIco.svg" alt="" />198.71</p>
            </dd>
          </dl>
        </li>
        <li>
          <div class="three" ref="sponge"></div>
          <dl class="desc">
            <dt>
              <h3>스펀지같은 흡수력.</h3>
              <p>Sponge-like Absorbency</p>
            </dt>
            <dd>
              <p><img src="@images/main/greenUpIco.svg" alt="" />136.5%</p>
              <p><img src="@images/main/coinIco.svg" alt="" />298.08</p>
            </dd>
          </dl>
        </li>
      </ul>
      <RouterLink to="/collection" class="more">...and more</RouterLink>
    </div>
  </section>
</template>

<script setup>
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";
import { ref, onMounted } from "vue";

const tenten = ref();
const people = ref();
const chatgpt = ref();
const sponge = ref();
// let scene;
// let camera;
// let renderer;
// let composer;
// let glitchPass;
// let width, height, aspect, devicePixelRatio;

// function init() {
//   scene = new THREE.Scene();
//   camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );
//   renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//   renderer.setPixelRatio(devicePixelRatio);
//   renderer.setSize(width, height);

//   composer = new EffectComposer(renderer);
//   glitchPass = new GlitchPass();

//   composer.addPass(glitchPass);

//   glitch.value.appendChild(renderer.domElement);
// }

// function animate() {
//   requestAnimationFrame(animate);
//   composer.render();
// }

// function initWindow() {
//   width = window.innerWidth || 1;
//   height = window.innerHeight || 1;
//   aspect = width / height;
//   devicePixelRatio = window.devicePixelRatio || 1;
// }
// function onWindowResize() {
//   initWindow();
//   camera.aspect = aspect;
//   camera.updateProjectionMatrix();
//   renderer.setSize(width, height);
//   composer.setSize(width, height);
// }

// onMounted(() => {
//   initWindow();
//   init();
//   animate();
//   window.addEventListener("resize", onWindowResize);
// });
</script>
