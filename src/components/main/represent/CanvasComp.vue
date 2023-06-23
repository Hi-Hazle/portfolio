<template>
  <div class="gltf">
    <div ref="canvas" class="three"></div>

    <div class="dot-wrap">
      <i v-for="index in 4" :key="index"></i>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: String,
});

import { onMounted, onBeforeUnmount, ref } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const canvas = ref();

let width = ref();
let height = ref();

let gltfUri;
if (props.type === "tenten") gltfUri = "assets/gltf/tenten/scene.gltf";
if (props.type === "tama") gltfUri = "assets/gltf/tamagotchi/scene.gltf";
if (props.type === "book") gltfUri = "assets/gltf/fairywood/scene.gltf";

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

function loadModel(scene, camera, renderer) {
  const loader = new GLTFLoader();

  loader.load(gltfUri, (gltf) => {
    let model = gltf.scene;
    let obj;
    if (props.type === "tama") obj = gltf.scene.children[0].children[0];

    scene.add(model);

    const boundingBox = new THREE.Box3().setFromObject(model);
    const pos = boundingBox.getCenter(new THREE.Vector3());
    let position;
    if (props.type === "tama") position = { x: pos.x, y: pos.y, z: 20 };
    if (props.type === "book") position = { x: pos.x, y: pos.y, z: 1 };
    console.log(pos.z);

    // const center = { x: pos.x, y: pos.y, z: posZ };
    camera.position.copy(position);
    renderer.render(scene, camera);
    // animate(obj, renderer, scene, camera);
  });
}

function loadModelWithTexture(scene, camera, renderer) {
  const loader = new GLTFLoader();

  loader.load(gltfUri, (gltf) => {
    let model = gltf.scene;
    let obj;
    if (props.type === "tenten") obj = gltf.scene.children[0].children[2];
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("assets/gltf/tenten/texture.png", (texture) => {
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

function generator() {
  const { scene, camera, renderer } = initScene(canvas.value);
  if (props.type === "tenten") {
    loadModelWithTexture(scene, camera, renderer);
  } else {
    loadModel(scene, camera, renderer);
  }
}

onMounted(() => {
  width.value = canvas.value.offsetWidth;
  height.value = canvas.value.offsetHeight;
  generator();
});
</script>
