<template>
  <section class="skills">
    <div class="inner">
      <h2>MAIN SKILLS</h2>
      <div class="grid">
        <ul>
          <li><img src="@images/main/skillLogo1.svg" alt="react" /></li>
          <li><img src="@images/main/skillLogo2.svg" alt="vue" /></li>
          <li><img src="@images/main/skillLogo3.svg" alt="javascript" /></li>
          <li><img src="@images/main/skillLogo4.svg" alt="sass" /></li>
          <li><img src="@images/main/skillLogo5.svg" alt="next" /></li>
          <li><img src="@images/main/skillLogo6.svg" alt="tailwind css" /></li>
          <li><img src="@images/main/skillLogo7.svg" alt="mui" /></li>
          <li><img src="@images/main/skillLogo8.svg" alt="gsap" /></li>
          <li><img src="@images/main/skillLogo9.svg" alt="three js" /></li>
          <li><img src="@images/main/skillLogo10.svg" alt="blender" /></li>
        </ul>
      </div>
    </div>
    <div ref="glitch" class="glitch"></div>
  </section>
</template>

<script setup>
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";
import { ref, onMounted, onUnmounted } from "vue";

const glitch = ref();
let scene;
let camera;
let renderer;
let composer;
let glitchPass;
let width, height, aspect, devicePixelRatio;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(devicePixelRatio);
  renderer.setSize(width, height);

  composer = new EffectComposer(renderer);
  glitchPass = new GlitchPass();

  composer.addPass(glitchPass);

  glitch.value.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  composer.render();
}

function initWindow() {
  width = window.innerWidth || 1;
  height = window.innerHeight || 1;
  aspect = width / height;
  devicePixelRatio = window.devicePixelRatio || 1;
}
function onWindowResize() {
  initWindow();
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  composer.setSize(width, height);
}

onMounted(() => {
  initWindow();
  init();
  animate();
  window.addEventListener("resize", onWindowResize);
});

onUnmounted(() => {
  // 리소스 해제
  scene.children.forEach((child) => {
    scene.remove(child);
  });
  // 렌더러 리소스 해제
  renderer.dispose();
});
</script>
