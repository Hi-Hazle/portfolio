<template>
   <section class="canvasWrap">
      <div ref="canvas"></div>
   </section>
</template>

<script>
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from "three-addons"

export default {
   mounted() {
      let scene = new THREE.Scene() //1. 장면만들고
      const renderer = new THREE.WebGLRenderer({
         antialias: true,
         alpha: true
      })

      function resizeRenderer() {
         renderer.setSize(window.innerWidth, window.innerHeight)
      }
      resizeRenderer()
      window.addEventListener("resize", resizeRenderer)

      this.$refs.canvas.appendChild(renderer.domElement)
      renderer.outputEncoding = THREE.sRGBEncoding
      renderer.setPixelRatio(window.devicePixelRatio)

      let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000) //PerspectiveCamera (원근법 O), OrthographicCamer (원근법 X)
      camera.position.set(0, 0, 3.5)
      const controls = new OrbitControls(camera)

      scene.background = null
      let light = new THREE.DirectionalLight(0xffffff, 2) //조명
      light.position.set(2, 5, 5)
      scene.add(light)

      let loader = new GLTFLoader() //gltf 파일은 GLTFLoader 로 가져와야됨
      loader.load("/src/assets/images/test2.gltf", function (gltf) {
         const ball01 = gltf.scene.children[0].children[0].children[0].children[0]
         const ball02 = gltf.scene.children[0].children[0].children[0].children[1]
         const bt1 = gltf.scene.children[0].children[0].children[1]
         const bt2 = gltf.scene.children[0].children[0].children[2]
         gltf.scene.scale.set(1.4, 1.4, 1.4)

         scene.add(gltf.scene)

         function animate() {
            requestAnimationFrame(animate) //1초에 60번 실행됨.

            ball01.rotation.z += 0.002
            ball02.rotation.z += 0.01
            // bt1.rotation.z += 0.01
            renderer.render(scene, camera)
         }
         animate()
      })
   }
}
</script>
