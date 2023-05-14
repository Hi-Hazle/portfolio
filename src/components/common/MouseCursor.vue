<template>
  <div id="mouseCursor">
    <div class="drag" v-if="mode === 'drag'">
      <i class="xi-arrows"></i>
      <svg viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <path
            id="circle"
            d="
        M 50, 50
        m -37, 0
        a 37,37 0 1,1 74,0
        a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text font-size="17">
          <textPath xlink:href="#circle">돌려보세요 You Can Drag It</textPath>
        </text>
      </svg>
    </div>
    <div class="link" v-else-if="mode === 'link'"><i class="xi-touch"></i></div>
    <div class="common" v-else><i class="xi-location-arrow"></i></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const linkBoxs = ref();
const dragRef = ref();

const mode = ref("default");

onMounted(() => {
  linkBoxs.value = document.querySelectorAll(".linkBox");
  dragRef.value = document.querySelector(".dragRef");

  document.body.style.cursor = "none";

  mouseEventHandler();
  mouseDragActiveHandler();
  mouseLinkActiveHandler();
  mouseNormalActiveHandler();
});
onUnmounted(() => {
  document.body.removeEventListener("mousemove", mouseEventHandler);
  dragRef.value.removeEventListener("mouseover", mouseDragActiveHandler);
  linkBoxs.value.forEach((el) => {
    el.removeEventListener("mouseover", mouseLinkActiveHandler);
  });
});
const mouseEventHandler = () => {
  const icon = document.querySelector("#mouseCursor");
  document.body.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    icon.style.transform = `translate(${x}px, ${y}px)`;
  });
};
const mouseDragActiveHandler = () => {
  dragRef.value.addEventListener("mouseover", function () {
    if (mode.value !== "drag") mode.value = "drag";
    event.stopPropagation();
  });
};
const mouseLinkActiveHandler = () => {
  linkBoxs.value.forEach((el) => {
    el.addEventListener("mouseover", () => {
      if (mode.value !== "link") mode.value = "link";
      event.stopPropagation();
    });
  });
};
const mouseNormalActiveHandler = () => {
  dragRef.value.addEventListener("mouseout", function () {
    if (mode.value !== "default") mode.value = "default";
    event.stopPropagation();
  });
  linkBoxs.value.forEach((el) => {
    el.addEventListener("mouseout", () => {
      if (mode.value !== "default") mode.value = "default";
      event.stopPropagation();
    });
  });
};
</script>
