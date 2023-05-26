<template>
  <div ref="container"></div>
</template>

<script setup>
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { OrbitControls } from "three-addons";
import Stats from "three/examples/jsm/libs/stats.module";
import { onMounted, ref } from "vue";

const container = ref();
let renderer, scene, camera, controls, world, stats;
let sphereMesh, sphereBody;
let fingerBody, fingerTo;
const ballCount = 100;

onMounted(() => {
  init();
  animate();

  function init() {
    scene = new THREE.Scene();

    const light1 = new THREE.SpotLight();
    light1.position.set(10, 10, -10);
    light1.angle = Math.PI / 4;
    light1.penumbra = 0.5;
    light1.castShadow = true;
    light1.shadow.mapSize.width = 2048;
    light1.shadow.mapSize.height = 2048;
    light1.shadow.camera.near = 10;
    light1.shadow.camera.far = 30;
    light1.shadow.bias = 0.001;
    scene.add(light1);

    const light2 = new THREE.SpotLight();
    light2.position.set(-10, 10, -10);
    light2.angle = Math.PI / 4;
    light2.penumbra = 0.5;
    light2.castShadow = true;
    light2.shadow.mapSize.width = 2048;
    light2.shadow.mapSize.height = 2048;
    light2.shadow.camera.near = 10;
    light2.shadow.camera.far = 30;
    light2.shadow.bias = 0.001;
    scene.add(light2);

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(-2, 6, 4);

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.value.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);

    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.05,
      metalness: 0.54,
      flatShading: true,
    });

    const sphereGeometry = new THREE.SphereGeometry(0.5, 8, 8);
    sphereMesh = [];
    sphereBody = [];
    for (let i = 0; i < ballCount; i++) {
      sphereMesh.push(new THREE.Mesh(sphereGeometry, material));
      sphereMesh[i].position.x = Math.random() * 10 - 5;
      sphereMesh[i].position.y = i / 4 + 4;
      sphereMesh[i].position.z = Math.random() * 10 - 5;
      sphereMesh[i].castShadow = true;
      sphereMesh[i].receiveShadow = true;
      scene.add(sphereMesh[i]);

      const sphereShape = new CANNON.Sphere(0.5);
      sphereBody.push(new CANNON.Body({ mass: 0.1 }));
      sphereBody[i].addShape(sphereShape);
      sphereBody[i].position.x = sphereMesh[i].position.x;
      sphereBody[i].position.y = sphereMesh[i].position.y;
      sphereBody[i].position.z = sphereMesh[i].position.z;
      world.addBody(sphereBody[i]);
    }

    fingerTo = new THREE.Vector3();

    renderer.domElement.addEventListener("mousemove", onMouseMove, false);

    window.addEventListener("resize", onWindowResize, false);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(event) {
    const mouse = {
      x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
      y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
    };

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(sphereMesh);

    if (intersects.length > 0) {
      fingerTo.copy(intersects[0].point);
    }
  }

  stats = new Stats();
  document.body.appendChild(stats.dom);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    for (let i = 0; i < ballCount; i++) {
      const sphere = sphereMesh[i];
      const sphereBody = sphereBody[i];

      const force = new CANNON.Vec3().copy(fingerTo).vsub(sphereBody.position);
      force.normalize();
      force.scale(20, force);

      sphereBody.applyForce(force, sphereBody.position);
      sphere.position.copy(sphereBody.position);
      sphere.quaternion.copy(sphereBody.quaternion);
    }

    stats.update();
    renderer.render(scene, camera);
  }
});
</script>
