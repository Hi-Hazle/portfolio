<template>
  <div ref="canvas" style="width: 100px; height: 100px"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
  mounted() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 162;
    camera.position.y = -30;
    camera.position.x = 15;

    // const controls = new OrbitControls(camera);

    // ConeGeometry에 맞게 canvas 크기 조정
    const width = this.$refs.canvas.offsetWidth;
    const height = this.$refs.canvas.offsetHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    this.$refs.canvas.appendChild(renderer.domElement);

    // 이미지 텍스처 로드
    const textureLoader = new THREE.TextureLoader();
    const metalTexture = textureLoader.load(
      "/src/assets/images/main/hologram.jpg"
    );

    // 원뿔 객체 생성
    const coneGeometry = new THREE.ConeGeometry(110, 110, 64);
    const material = new THREE.MeshPhongMaterial({
      map: metalTexture,
      shininess: 100,
      specular: 0xffffff,
      flatShading: true,
    });
    const coneMesh = new THREE.Mesh(coneGeometry, material);
    scene.add(coneMesh);
    scene.rotation.z = Math.PI / 6;

    // 빛 추가
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(0, 100, 110);
    light.intensity = 0.5;

    scene.add(light);
    scene.scale.set(1, 1, 1);

    // 앰비언트 라이트 추가
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    function animate() {
      requestAnimationFrame(animate);
      coneMesh.rotation.y += 0.01;
      // coneMesh.rotation.z = Math.PI / 6;

      renderer.render(scene, camera);
    }

    animate();
  },
};
</script>
