<template>
   <section class="canvasWrap">
      <div ref="canvas"></div>
   </section>
</template>

<script>
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from "three-addons"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js"

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec4 resolution;
varying vec2 vUv;
void main() {
  vec2 newUV = vUv;
  newUV.x += sin(newUV.y * 10.0 + time) * 0.9;
  vec4 noise = texture2D(texture2, newUV * 1.2);
  vec4 color = texture2D(texture2, vUv);
  gl_FragColor = mix(noise, noise, progress);
  gl_FragColor.a = 1.0;
}
`

export default {
   mounted() {
      let scene = new THREE.Scene()
      scene.background = null

      let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000) //PerspectiveCamera (원근법 O), OrthographicCamer (원근법 X)
      camera.position.set(0, 0, 3.5)

      const renderer = new THREE.WebGLRenderer({
         antialias: true,
         alpha: true
      })

      const controls = new OrbitControls(camera)

      const wrapper = document.querySelector(".canvasWrap")
      function resizeRenderer() {
         renderer.setSize(window.innerWidth, window.innerHeight)
         camera.aspect = window.innerWidth / window.innerHeight
         camera.updateProjectionMatrix()
      }
      resizeRenderer()
      window.addEventListener("resize", resizeRenderer())
      this.$refs.canvas.appendChild(renderer.domElement)
      renderer.outputEncoding = THREE.sRGBEncoding
      renderer.setPixelRatio(window.devicePixelRatio)

      const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight)
      const composer = new EffectComposer(renderer, renderTarget)
      const renderPass = new RenderPass(scene, camera)
      composer.addPass(renderPass)
      const glitchPass = new GlitchPass()
      composer.addPass(glitchPass)

      let light = new THREE.DirectionalLight(0x6cfff1, 2) //조명
      light.position.set(1, 1, 1)
      scene.add(light)
      scene.position.set(0, -0.2, 0)
      scene.rotation.y = Math.PI / 14

      let loader = new GLTFLoader() //gltf 파일은 GLTFLoader 로 가져와야됨
      loader.load("/src/assets/images/main/mainvisual.gltf", function (gltf) {
         const ball01 = gltf.scene.children[0].children[0].children[0].children[0]
         const ball02 = gltf.scene.children[0].children[0].children[0].children[1]
         gltf.scene.scale.set(1.4, 1.4, 1.4)

         let material, headTexture

         gltf.scene.traverse((child) => {
            if (child.material?.name === "얼굴유리" || false) {
               const texture1 = new THREE.TextureLoader().load("/src/assets/images/main/hologram1.jpg")
               const texture2 = new THREE.TextureLoader().load("/src/assets/images/main/hologram2.jpg")
               child.displacementMap
               child.displacementScale = 0.5

               material = new THREE.ShaderMaterial({
                  uniforms: {
                     time: { value: 0 },
                     progress: { value: 0 },
                     texture1: { value: texture1 },
                     texture2: { value: texture2 },
                     resolution: { value: new THREE.Vector4() }
                  },
                  vertexShader: vertexShader,
                  fragmentShader: fragmentShader
               })
               child.material = material
               child.material.needsUpdate = true
            }
         })
         scene.add(gltf.scene)
         const clock = new THREE.Clock()

         function animate() {
            ball01.rotation.z += 0.002
            ball02.rotation.z += 0.01
            const time = clock.getElapsedTime()
            const progress = (Math.sin(time * 2.0) + 1.0) / 2.0
            material.uniforms.time.value = time
            material.uniforms.progress.value = progress
            material.uniforms.resolution.value.x = window.innerWidth
            material.uniforms.resolution.value.y = window.innerHeight
            // renderer.render(scene, camera)
            // composer.render() // 글리치랑 같이
            composer.render()

            requestAnimationFrame(animate)
         }

         animate()
      })
   }
}
</script>
