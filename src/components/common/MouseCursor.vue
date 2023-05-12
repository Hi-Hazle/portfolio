<template>
  <div id="mouseCursor">
    <ArrowIcon />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
const linkBoxs = ref();
onMounted(() => {
  linkBoxs.value = document.querySelectorAll(".linkBox");
  mouseEventHandler();
  mouseLinkActiveHandler();
});

const mouseEventHandler = () => {
  const icon = document.querySelector("#mouseCursor");
  document.body.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    icon.style.transform = `translate(${x}px, ${y}px)`;
  });
};
const mouseLinkActiveHandler = () => {
  linkBoxs.value.forEach((el) => {
    el.addEventListener("mouseover", () => {
      console.log("Mouse is over the target div!");
    });
  });
  linkBoxs.value.forEach((el) => {
    el.addEventListener("mouseleave", () => {
      console.log("Mouse is ovesssssssr the target div!");
    });
  });
};
</script>
<script>
import ArrowIcon from "./ArrowIcon.vue";
export default {
  components: {
    // ArrowIcon
  },
};
</script>
