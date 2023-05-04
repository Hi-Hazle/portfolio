<template>
   <section class="mainVisual">
      <div class="inner">
         <Spline :scene="y3g4U8yoalvVkj7S" />

         <div ref="container"></div>
         <article class="mainText">
            <h2>Coffee, Code</h2>
            <h2>Coffee, Code</h2>
         </article>
         <!-- <Spline :options="options" /> -->
         <article class="iconText">
            <img src="@images/main/rotateIcon.png" alt="" />
            <p>
               Just<br />
               Portfolio
            </p>
         </article>
         <p class="sideSmText">
            Now, It’s time to<br />
            get a ticket!
         </p>
         <ul class="sideLgText">
            <li>
               <p>35,4K</p>
               <span>Hours of effort</span>
            </li>
            <li>
               <p>381</p>
               <span>Commits</span>
            </li>
         </ul>
         <ul class="btnList">
            <li class="button contained">Recent Works</li>
            <li class="button outlined">Collections</li>
         </ul>
      </div>
   </section>
</template>
<script>
import { defineComponent } from "vue"
import Spline from "vue-spline"

export default defineComponent({
   components: {
      Spline
   }
})
</script>

<!-- <script>
import * as THREE from "three"

export default {
   name: "MyThreejs",
   mounted() {
      // Three.js 코드 작성
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      this.$refs.container.appendChild(renderer.domElement)

      const geometry = new THREE.BoxGeometry()
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      const cube = new THREE.Mesh(geometry, material)
      scene.add(cube)

      camera.position.z = 5

      function animate() {
         requestAnimationFrame(animate)
         cube.rotation.x += 0.01
         cube.rotation.y += 0.01
         renderer.render(scene, camera)
      }
      animate()
   }
}
</script> -->
