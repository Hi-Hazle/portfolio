<template>
  <div ref="canvas" class="canvasWrap"></div>
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

const canvas = ref(null);

let scene, renderer, composer;
let clearPass, texturePass, renderPass;
let camera, cubeTexturePassP;
let group;
const params = {
  clearPass: true,
  clearColor: "white",
  clearAlpha: 1.0,

  texturePass: true,
  texturePassOpacity: 1.0,

  cubeTexturePass: true,
  cubeTexturePassOpacity: 1.0,

  renderPass: true,
};

function init() {
  const width = window.innerWidth || 1;
  const height = window.innerHeight || 1;
  const aspect = width / height;
  const devicePixelRatio = window.devicePixelRatio || 1;

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(devicePixelRatio);
  renderer.setSize(width, height);
  canvas.value.appendChild(renderer.domElement);

  //

  camera = new THREE.PerspectiveCamera(100, aspect, 1, 10);
  camera.position.z = 7;

  scene = new THREE.Scene();

  group = new THREE.Group();
  scene.add(group);

  const light = new THREE.DirectionalLight(0xffffff, 1.5);

  light.position.set(-1, 2, 4);
  scene.add(light);

  const controls = new OrbitControls(camera, renderer.domElement);

  const setupModel = (ldrCubeMap) => {
    // const pmremG = new THREE.PMREMGenerator(renderer);
    // const renderTarget = pmremG.fromEquirectangular(ldrCubeMap);
    // const geometry = new THREE.SphereGeometry(1, 48, 24);
    // const material = new THREE.MeshStandardMaterial({
    //   color: "#ffffff",
    //   roughness: 0,
    //   metalness: 1,
    //   envMap: renderTarget.texture,
    // });

    // const mesh = new THREE.Mesh(geometry, material);
    // group.add(mesh);

    const pmremG = new THREE.PMREMGenerator(renderer);
    const renderTarget = pmremG.fromEquirectangular(ldrCubeMap);
    let loader = new GLTFLoader();

    loader.load(
      "/src/assets/images/main/test.gltf",
      (gltf) => {
        let balls = gltf.scene.children[0].children[0].children;
        gltf.scene.scale.set(7, 7, 7);

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
        // gltf 질감처리
        let metalMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff, // 적절한 색상값 입력
          metalness: 1, // 금속성
          roughness: 0, // 거칠기
          envMap: renderTarget.texture,
        });

        let imageMaterial = new THREE.MeshStandardMaterial({
          map: texture1,
          side: THREE.DoubleSide,
          metalness: 0.1, // 금속성
          roughness: 0, // 거칠기
        });
        let imageMateria2 = new THREE.MeshStandardMaterial({
          map: texture2,
          side: THREE.DoubleSide,
          metalness: 0.2, // 금속성
          roughness: 0, // 거칠기
        });

        let imageMateria3 = new THREE.MeshStandardMaterial({
          map: texture3,
          side: THREE.DoubleSide,
          metalness: 0, // 금속성
          roughness: 1, // 거칠기
          blending: THREE.AdditiveBlending,
        });

        let imageMateria4 = new THREE.MeshStandardMaterial({
          map: texture4,
          side: THREE.DoubleSide,
          metalness: 0.5, // 금속성
          roughness: 0.5, // 거칠기
          // blending: THREE.AdditiveBlending,
        });
        // Mesh에 적용된 Material을 모두 metalMaterial로 변경
        gltf.scene.traverse(function (node) {
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

        group.add(gltf.scene);

        function animate() {
          requestAnimationFrame(animate);

          camera.updateMatrixWorld(true);

          let newColor = clearPass.clearColor;
          clearPass.enabled = params.clearPass;
          clearPass.clearColor = newColor;
          clearPass.clearAlpha = params.clearAlpha;

          texturePass.enabled = params.texturePass;
          texturePass.opacity = params.texturePassOpacity;

          if (cubeTexturePassP !== null) {
            cubeTexturePassP.enabled = params.cubeTexturePass;
            cubeTexturePassP.opacity = params.cubeTexturePassOpacity;
          }

          renderPass.enabled = params.renderPass;

          const clock = new THREE.Clock();
          const time = clock.getElapsedTime();

          balls[0].rotation.z += 0.002;
          balls[1].rotation.z += 0.01;
          // y축으로 회전하는 코드
          camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.0005);
          camera.lookAt(scene.position);
          composer.render();
        }
        animate();
        // resolve(true);
      },
      undefined,
      (error) => {
        reject(error);
      }
    );
  };

  composer = new EffectComposer(renderer);

  clearPass = new ClearPass(params.clearColor, params.clearAlpha);
  composer.addPass(clearPass);

  texturePass = new TexturePass();
  composer.addPass(texturePass);

  cubeTexturePassP = null;

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

  const ldrUrls = genCubeUrls("/src/assets/images/3d-background/bg5/", ".png");
  new THREE.CubeTextureLoader().load(ldrUrls, function (ldrCubeMap) {
    cubeTexturePassP = new CubeTexturePass(camera, ldrCubeMap);
    composer.insertPass(cubeTexturePassP, 2);
    setupModel(ldrCubeMap);
  });

  renderPass = new RenderPass(scene, camera);
  renderPass.clear = false;
  composer.addPass(renderPass);

  const copyPass = new ShaderPass(CopyShader);
  composer.addPass(copyPass);

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  console.log("rerer");
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspect = width / height;

  camera.aspect = aspect;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  composer.setSize(width, height);
}

// const gltfLoad = new Promise((resolve, reject) => {
//   new GLTFLoader().load(
//     "/src/assets/images/main/test.gltf",
//     (gltf) => {
//       let balls = gltf.scene.children[0].children[0];
//       let human = gltf.scene.children[0].children[1];
//       let head = gltf.scene.children[0].children[1].children[0];
//       let eyes = gltf.scene.children[0].children[1].children[1];
//       let objects = gltf.scene.children[0].children[1];

//       gltf.scene.scale.set(1.4, 1.4, 1.4);

//       // gltf 질감처리
//       let metalMaterial = new THREE.MeshStandardMaterial({
//         color: 0xffffff, // 적절한 색상값 입력
//         metalness: 1, // 금속성
//         roughness: 0, // 거칠기
//         envMap: renderTarget.texture,
//       });

//       // Mesh에 적용된 Material을 모두 metalMaterial로 변경
//       head = metalMaterial;

//       group.add(gltf.scene);

//       function animate() {
//         requestAnimationFrame(animate);

//         camera.updateMatrixWorld(true);

//         let newColor = clearPass.clearColor;
//         clearPass.enabled = params.clearPass;
//         clearPass.clearColor = newColor;
//         clearPass.clearAlpha = params.clearAlpha;

//         texturePass.enabled = params.texturePass;
//         texturePass.opacity = params.texturePassOpacity;

//         if (cubeTexturePassP !== null) {
//           cubeTexturePassP.enabled = params.cubeTexturePass;
//           cubeTexturePassP.opacity = params.cubeTexturePassOpacity;
//         }

//         renderPass.enabled = params.renderPass;

//         const clock = new THREE.Clock();
//         const time = clock.getElapsedTime();
//         const progress = (Math.sin(time * 2.0) + 1.0) / 2.0;
//         // ball01.rotation.z += 0.002;
//         // ball02.rotation.z += 0.01;

//         // material.uniforms.time.value = time;
//         // material.uniforms.progress.value = progress;
//         // material.uniforms.resolution.value.x = window.innerWidth;
//         // material.uniforms.resolution.value.y = window.innerHeight;

//         composer.render();
//       }
//       animate();
//       resolve(true);
//     },
//     undefined,
//     (error) => {
//       reject(error);
//     }
//   );
// });

const updateAsyncPercentage = inject("updateAsyncPercentage");
onMounted(() => {
  init();
  // animate();
  updateAsyncPercentage();
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
