<!-- <template>
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
</script> -->

<template>
  <div id="glitter-container">
    <div class="glitter"></div>
    <div class="glitter"></div>
    <div class="glitter"></div>
    <div class="glitter"></div>
  </div>
</template>
<style>
#glitter-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.glitter {
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  opacity: 0;
  transition: opacity 0.3s ease-out;
}
</style>

<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {
  // 요소 선택
  const glitterContainer = document.getElementById("glitter-container");
  const glitters = document.querySelectorAll(".glitter");

  // 마우스 이벤트 처리
  glitterContainer.addEventListener("mousemove", (event) => {
    // 마우스 위치 가져오기
    const x = event.clientX;
    const y = event.clientY;

    // 각 반짝이는 효과 위치 업데이트
    glitters.forEach((glitter) => {
      // 반짝이는 효과 위치 계산
      const glitterX = x + (Math.random() - 0.5) * 100;
      const glitterY = y + (Math.random() - 0.5) * 100;

      // 반짝이는 효과 위치 업데이트
      glitter.style.transform = `translate(${glitterX}px, ${glitterY}px)`;
      glitter.style.opacity = 1;
    });
  });

  const mouseEventHandler = () => {
    // const icon = document.querySelector("#mouseCursor");
    document.body.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;
      glitterContainer.style.transform = `translate(${x}px, ${y}px)`;
    });
  };
  mouseEventHandler();

  // // 반짝이는 효과 숨기기
  // glitterContainer.addEventListener("mouseleave", () => {
  //   glitters.forEach((glitter) => {
  //     glitter.style.opacity = 0;
  //   });
  // });
});
</script>
