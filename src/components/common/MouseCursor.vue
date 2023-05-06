<template>
   <div id="mouseCursor"></div>
</template>

<script>
export default {
   mounted() {
      const icon = document.querySelector("#mouseCursor")

      document.body.addEventListener("mousemove", (e) => {
         const x = e.clientX
         const y = e.clientY

         icon.style.transform = `translate(${x}px, ${y}px)`
      })
   }
}
</script>
