<template>
   <section class="canvasWrap">
      <div ref="container" class="canvava"></div>
   </section>
</template>

<!-- <script>
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js"

export default {
   name: "GlitchScene",
   mounted() {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({
         antialias: true,
         alpha: true
      })
      function resizeRenderer() {
         renderer.setSize(window.innerWidth, window.innerHeight)
      }
      resizeRenderer()
      window.addEventListener("resize", resizeRenderer)
      this.$refs.container.appendChild(renderer.domElement)

      const composer = new EffectComposer(renderer)
      const glitchPass = new GlitchPass()
      composer.addPass(glitchPass)

      function animate() {
         requestAnimationFrame(animate)
         composer.render()
      }
      animate()
   }
}
</script> -->

<script>
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

export default {
   name: "GlitchScene",
   mounted() {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({
         antialias: true,
         alpha: true
      })
      function resizeRenderer() {
         renderer.setSize(window.innerWidth, window.innerHeight)
         camera.aspect = window.innerWidth / window.innerHeight
         camera.updateProjectionMatrix()
      }
      resizeRenderer()
      window.addEventListener("resize", resizeRenderer)
      this.$refs.container.appendChild(renderer.domElement)

      const composer = new EffectComposer(renderer)
      const glitchPass = new GlitchPass()
      composer.addPass(glitchPass)

      const loader = new GLTFLoader()
      loader.load("/src/assets/images/test2.gltf", function (gltf) {
         scene.add(gltf.scene)

         function animate() {
            requestAnimationFrame(animate)
            composer.render()
         }
         animate()
      })
   }
}
</script>
