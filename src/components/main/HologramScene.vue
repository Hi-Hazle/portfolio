<template>
  <div ref="canvas" class="canvasWrap dragRef"></div>
</template>

<script setup>
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { TexturePass } from "three/examples/jsm/postprocessing/TexturePass.js";
import { CubeTexturePass } from "three/examples/jsm/postprocessing/CubeTexturePass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { ClearPass } from "three/examples/jsm/postprocessing/ClearPass.js";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three-addons";

import { onMounted, ref, onUnmounted, inject } from "vue";

const canvas = ref(null);
let scene, renderer, composer;
let clearPass, texturePass, renderPass, copyPass;
let light, camera, cubeTexturePass;
let group;
let ldrCubeMap;

let width, height, aspect, devicePixelRatio;

const params = {
  clearPass: {
    enabled: true,
    clearColor: "white",
    clearAlpha: 1.0,
  },
  texturePass: {
    enabled: true,
    opacity: 1.0,
  },
  cubeTexturePass: {
    enabled: true,
    opacity: 1.0,
  },
  renderPass: {
    enabled: true,
  },
};

function onWindowResize() {
  initWindow();
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  composer.setSize(width, height);
}

function initWindow() {
  width = window.innerWidth || 1;
  height = window.innerHeight || 1;
  aspect = width / height;
  devicePixelRatio = window.devicePixelRatio || 1;
}

function initRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(devicePixelRatio);
  renderer.setSize(width, height);
}
function initCamera() {
  camera = new THREE.PerspectiveCamera(100, aspect, 1, 10);
  camera.position.z = 7;
}
function initLight() {
  light = new THREE.DirectionalLight(0xffffff, 1.5);
  light.position.set(-1, 2, 4);
}

function initScene() {
  scene = new THREE.Scene();
  scene.add(group);
  scene.add(light);
}

function iniComposer() {
  composer = new EffectComposer(renderer);
  clearPass = new ClearPass(
    params.clearPass.clearColor,
    params.clearPass.clearAlpha
  );
  composer.addPass(clearPass);

  texturePass = new TexturePass();
  composer.addPass(texturePass);

  renderPass = new RenderPass(scene, camera);
  renderPass.clear = false;
  composer.addPass(renderPass);

  copyPass = new ShaderPass(CopyShader);
  composer.addPass(copyPass);

  cubeTexturePass = null;
}
function settingInit() {
  initRenderer();
  initCamera();
  initLight();
  group = new THREE.Group();
  initScene();
  iniComposer();
  canvas.value.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
}

let balls;
let model;

const texture1 = new THREE.TextureLoader().load(
  "/src/assets/images/main/texture1.jpg"
);
const texture2 = new THREE.TextureLoader().load(
  "/src/assets/images/main/texture2.jpg"
);
const texture3 = new THREE.TextureLoader().load(
  "/src/assets/images/main/texture3.jpg"
);
const texture4 = new THREE.TextureLoader().load(
  "/src/assets/images/main/texture4.jpg"
);

let metalMaterial;

const imageMaterial = new THREE.MeshStandardMaterial({
  map: texture1,
  side: THREE.DoubleSide,
  metalness: 0.1, // 금속성
  roughness: 0, // 거칠기
});
const imageMateria2 = new THREE.MeshStandardMaterial({
  map: texture2,
  side: THREE.DoubleSide,
  metalness: 0.2, // 금속성
  roughness: 0, // 거칠기
});

const imageMateria3 = new THREE.MeshStandardMaterial({
  map: texture3,
  side: THREE.DoubleSide,
  metalness: 0, // 금속성
  roughness: 1, // 거칠기
  blending: THREE.AdditiveBlending,
});

const imageMateria4 = new THREE.MeshStandardMaterial({
  map: texture4,
  side: THREE.DoubleSide,
  metalness: 0.5, // 금속성
  roughness: 0.5, // 거칠기
});

const genCubeUrls = function (prefix, postfix) {
  return [
    prefix + "px" + postfix,
    prefix + "nx" + postfix,
    prefix + "py" + postfix,
    prefix + "ny" + postfix,
    prefix + "pz" + postfix,
    prefix + "nz" + postfix,
  ];
};

function loadCubeTexture() {
  let ldrUrls = genCubeUrls("/src/assets/images/3d-background/bg5/", ".png");
  return new Promise((resolve, reject) => {
    new THREE.CubeTextureLoader().load(
      ldrUrls,
      function (img) {
        ldrCubeMap = img;
        cubeTexturePass = new CubeTexturePass(camera, img);
        composer.insertPass(cubeTexturePass, 2);
        resolve(true);
      },
      undefined,
      (error) => {
        reject(error);
      }
    );
  });
}

function loadModel() {
  const pmremG = new THREE.PMREMGenerator(renderer);
  const renderTarget = pmremG.fromEquirectangular(ldrCubeMap);
  metalMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff, // 적절한 색상값 입력
    metalness: 1, // 금속성
    roughness: 0, // 거칠기
    envMap: renderTarget.texture,
  });

  const loader = new GLTFLoader();
  return new Promise(
    (resolve, reject) => {
      loader.load("/src/assets/images/main/test.gltf", (gltf) => {
        model = gltf;
        gltf.scene.scale.set(7, 7, 7);
        balls = gltf.scene.children[0].children[0].children;
        resolve(true);
      });
    },
    undefined,
    (error) => {
      reject(error);
    }
  );
}

function addModelTexture() {
  model.scene.traverse(function (node) {
    if (node.isMesh) {
      if (
        node.name == "head" ||
        node.name == "ground" ||
        node.name == "ston-large" ||
        node.name == "ston-small" ||
        node.name == "obj2"
      ) {
        node.material = metalMaterial;
      }
    }
    if (node.name == "eyes") {
      node.material = imageMateria4;
    }
    if (node.name == "obj1" || node.name == "ring") {
      node.material = imageMateria3;
    }
    if (node.name == "balls") {
      for (let mesh of node.children[0].children) {
        mesh.material = imageMaterial;
      }
      for (let mesh of node.children[1].children) {
        mesh.material = imageMateria2;
      }
    }

    if (node.name == "butterfly-pink" || node.name == "butterfly-green") {
      for (let mesh of node.children) {
        mesh.material = imageMateria3;
      }
    }
  });
  group.add(model.scene);
}

function animate() {
  requestAnimationFrame(animate);
  camera.updateMatrixWorld(true);

  let newColor = clearPass.clearColor;
  clearPass.enabled = params.clearPass.clearPass;
  clearPass.clearColor = newColor;
  clearPass.clearAlpha = params.clearPass.clearAlpha;

  texturePass.enabled = params.texturePass.enabled;
  texturePass.opacity = params.texturePass.opacity;

  if (cubeTexturePass !== null) {
    cubeTexturePass.enabled = params.cubeTexturePass.enabled;
    cubeTexturePass.opacity = params.cubeTexturePass.opacity;
  }

  renderPass.enabled = params.renderPass.enabled;

  balls[0].rotation.z += 0.002;
  balls[1].rotation.z += 0.01;
  // y축으로 회전하는 코드
  camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.0005);
  camera.lookAt(scene.position);
  composer.render();
}

const updateAsyncPercentage = inject("updateAsyncPercentage");
onMounted(async () => {
  initWindow();
  settingInit();
  await loadCubeTexture();
  await loadModel();

  addModelTexture();
  animate();
  updateAsyncPercentage();

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
