<template>
  <div ref="canvas"></div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three-addons";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D texture1;
  varying vec2 vUv;
  void main() {
    vec4 color = texture2D(texture1, vUv);
    float metalness = 1.0; // 금속감을 높이기 위한 값
    vec3 diffuseColor = color.rgb * (1.0 - metalness); // 금속이 아닌 부분 색상
    vec3 metalColor = vec3(1.0); // 금속 색상
    vec3 totalDiffuse = mix(diffuseColor, metalColor, metalness);
    gl_FragColor = vec4(totalDiffuse, 1.0);
  }
`;
export default {
  mounted() {
    let scene = new THREE.Scene();
    scene.background = null;

    let camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    ); //PerspectiveCamera (원근법 O), OrthographicCamer (원근법 X)
    camera.position.set(0, 0, 3.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    const controls = new OrbitControls(camera);

    function resizeRenderer() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
    resizeRenderer();
    window.addEventListener("resize", resizeRenderer());

    this.$refs.canvas.appendChild(renderer.domElement);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setPixelRatio(window.devicePixelRatio);

    const renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    );
    const composer = new EffectComposer(renderer, renderTarget);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    let light = new THREE.DirectionalLight(0xffffff, 10); //조명
    // light.castShadow = false;
    light.position.set(0, 10, 0);
    scene.add(light);
    scene.position.set(0, 0, 0);
    scene.rotation.y = -0.2;

    let loader = new GLTFLoader(); //gltf 파일은 GLTFLoader 로 가져와야됨
    loader.load("/src/assets/images/common/arrow.gltf", function (gltf) {
      const target = gltf.scene.children[0].children[3];
      gltf.scene.scale.set(0.5, 0.5, 0.5);

      // 이미지 맵핑

      let material;
      gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          console.log(child.material);
          // child.material.map.repeat.set(2, 2); // x, y 축으로 이미지 반복
          // child.material.map.offset.set(0.5, 0.5); // 이미지를 x, y 축으로 50% 이동
          const texture = new THREE.TextureLoader().load(
            "/src/assets/images/main/hologram.jpg"
          );
          material = new THREE.MeshStandardMaterial({
            alphaMap: texture,
            roughness: 0.2, // 거칠기
            metalness: 1.0, // 금속적인 느낌
            color: new THREE.Color(0xffffff), // 텍스처를 보여주기 위한 값
          });
          child.material = material;
        }
      });
      scene.add(gltf.scene);

      // animate() 함수 정의
      function animate() {
        renderer.render(scene, camera);
        // target.rotation.x += 0.1
        requestAnimationFrame(animate);
      }

      animate();
    });
  },
};
</script>
