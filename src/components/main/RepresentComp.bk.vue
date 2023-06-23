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
        <li>
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
        </li>
        <li>
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
            <div ref="goomon" class="three"></div>
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
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three-addons";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const tenten = ref();
const tama = ref();
const goomon = ref();
const sponge = ref();

let width = ref();
let height = ref();

let light;
light = new THREE.DirectionalLight(0xffffff, 4);
light.position.set(1, 1, 50);

function initScene(element) {
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    75,
    width.value / height.value,
    1,
    1000
  );
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(width.value, height.value);
  element.appendChild(renderer.domElement);
  scene.add(light);
  return { scene, camera, renderer };
}

function loadModel(scene, camera, renderer, modelPath, type) {
  const loader = new GLTFLoader();

  loader.load(modelPath, (gltf) => {
    let model = gltf.scene;
    let obj;
    if (type === "tama") obj = gltf.scene.children[0].children[0];

    scene.add(model);

    const boundingBox = new THREE.Box3().setFromObject(model);
    const pos = boundingBox.getCenter(new THREE.Vector3());
    const center = { x: pos.x, y: pos.y, z: 10 };
    camera.position.copy(center);
    renderer.render(scene, camera);
    // animate(obj, renderer, scene, camera);
  });
}

function loadModelWithTexture(scene, camera, renderer, modelPath, type) {
  const loader = new GLTFLoader();

  loader.load(modelPath, (gltf) => {
    let model = gltf.scene;
    let obj;
    if (type === "tenten") obj = gltf.scene.children[0].children[2];
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("assets/gltf/texture/tenten2.png", (texture) => {
      model.traverse((node) => {
        if (node.isMesh) {
          node.material.map = texture;
        }
      });
      const boundingBox = new THREE.Box3().setFromObject(model);
      const pos = boundingBox.getCenter(new THREE.Vector3());
      const center = { x: pos.x, y: pos.y, z: 10 };
      scene.add(model);
      camera.position.copy(center);
      renderer.render(scene, camera);
      // animate(obj, renderer, scene, camera);
    });
  });
}

function animate(obj, renderer, scene, camera) {
  requestAnimationFrame(() => animate(obj, renderer, scene, camera));
  obj.rotation.y += 0.01;
  renderer.render(scene, camera);
}

function tentenGenerator() {
  const {
    scene: scene1,
    camera: camera1,
    renderer: renderer1,
  } = initScene(tenten.value);
  loadModelWithTexture(
    scene1,
    camera1,
    renderer1,
    "assets/gltf/cylinder2.gltf",
    "tenten"
  );
}

function tamaGenerator() {
  const {
    scene: scene2,
    camera: camera2,
    renderer: renderer2,
  } = initScene(tama.value);
  loadModel(
    scene2,
    camera2,
    renderer2,
    "assets/gltf/tamagotchi/scene.gltf",
    "tama"
  );
}

function goomonGenerator() {
  const {
    scene: scene3,
    camera: camera3,
    renderer: renderer3,
  } = initScene(goomon.value);
  loadModel(
    scene3,
    camera3,
    renderer3,
    "assets/gltf/tamagotchi/scene.gltf",
    "goomon"
  );
}

onMounted(() => {
  width.value = tenten.value.offsetWidth;
  height.value = tenten.value.offsetHeight;
  tentenGenerator();
  tamaGenerator();
  goomonGenerator();
});
</script>
