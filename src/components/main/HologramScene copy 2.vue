<template>
  <section class="canvasWrap">
    <div ref="canvas"></div>
  </section>
</template>

<script setup>
import { reactive, onMounted, ref, inject } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three-addons";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";

const vertexShader = `
 varying vec2 vUv;
 void main() {
   vUv = uv;
   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
 }
 `;

const fragmentShader = `
 uniform float time;
 uniform float progress;
 uniform sampler2D texture1;
 uniform vec4 resolution;
 varying vec2 vUv;
 void main() {
   vec2 newUV = vUv;
   newUV.x += sin(newUV.y * 10.0 + time) * 0.9;
   vec4 noise = texture2D(texture1, newUV * 1.2);
   vec4 color = texture2D(texture1, vUv);
   gl_FragColor = mix(noise, noise, progress);
   gl_FragColor.a = 1.0;
 }
 `;

const windowSize = reactive({
  width: window.innerWidth,
  height: window.innerHeight,
});
const canvas = ref(null);
let light = new THREE.DirectionalLight(0x6cfff1, 2);
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  45,
  windowSize.width / windowSize.height,
  0.1,
  2000
);
let renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  //   canvas: canvas.value,
});

let renderTarget = new THREE.WebGLRenderTarget(
  windowSize.width,
  windowSize.height
);
let composer = new EffectComposer(renderer, renderTarget);
let renderPass = new RenderPass(scene, camera);
let glitchPass = new GlitchPass();
// glitchPass.perturbance = 0.5;
// glitchPass.curF = 10;
let loader = new GLTFLoader();

function setLight() {
  light.position.set(1, 1, 1);
}
function setScene() {
  scene.background = null;
  scene.add(light);
  scene.position.set(0, -0.2, 0);
  scene.rotation.y = Math.PI / 14;
}

function setCamera() {
  camera.position.set(0, 0, 3.5);
}

function resizeRenderer() {
  renderer.setSize(windowSize.width, windowSize.height);
  camera.aspect = windowSize.width / windowSize.height;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resizeRenderer());

function setRenderer() {
  canvas.value.appendChild(renderer.domElement);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setPixelRatio(window.devicePixelRatio);
}
function setComposer() {
  composer.addPass(renderPass);
  composer.addPass(glitchPass);
}

const setLoader = new Promise((resolve, reject) => {
  loader.load(
    "/src/assets/images/main/mainvisual2.gltf",
    (gltf) => {
      const ball01 = gltf.scene.children[0].children[0].children[0].children[0];
      const ball02 = gltf.scene.children[0].children[0].children[0].children[1];
      gltf.scene.scale.set(1.4, 1.4, 1.4);

      let material;

      gltf.scene.traverse((child) => {
        if (child.material?.name === "얼굴유리" || false) {
          console.log(child.material);
          const texture = new THREE.TextureLoader().load(
            "/src/assets/images/main/hologram.jpg"
          );
          child.displacementMap;
          child.displacementScale = 0.5;

          material = new THREE.ShaderMaterial({
            uniforms: {
              time: { value: 0 },
              progress: { value: 0 },
              texture1: { value: texture },
              resolution: { value: new THREE.Vector4() },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
          });
          child.material = material;
          child.material.needsUpdate = true;
        }
      });
      scene.add(gltf.scene);
      const clock = new THREE.Clock();
      const time = clock.getElapsedTime();
      const progress = (Math.sin(time * 2.0) + 1.0) / 2.0;
      function animate() {
        ball01.rotation.z += 0.002;
        ball02.rotation.z += 0.01;

        material.uniforms.time.value = time;
        material.uniforms.progress.value = progress;
        material.uniforms.resolution.value.x = window.innerWidth;
        material.uniforms.resolution.value.y = window.innerHeight;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }
      animate();
      resolve(true);
    },
    undefined,
    (error) => {
      reject(error);
    }
  );
});
const updateAsyncPercentage = inject("updateAsyncPercentage");
onMounted(async () => {
  setLight();
  setScene();
  setCamera();
  setComposer();
  resizeRenderer();
  setRenderer();
  await setLoader;
  updateAsyncPercentage();
});
</script>
