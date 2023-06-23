<template>
  <section ref="horizontalText" class="horizontalText">
    <ul class="text">
      <li>When your scroll ends,</li>
      <li>pop-ups appear.</li>
      <li>Please drag them</li>
      <li>to move away.</li>
    </ul>
    <ul class="txt-pop">
      <li v-for="(text, i) in popupTexts" :key="i">
        <div class="window" style="width: 300px">
          <div class="title-bar">
            <div class="title-bar-text">드래그 해보세요!</div>
            <div class="title-bar-controls">
              <button aria-label="Close" @click="closePop"></button>
            </div>
          </div>
          <div class="window-body">
            <p>{{ text[1] }}</p>
            <p>{{ text[0] }}</p>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
@import "styles/libs/windowStyle.scss";
</style>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

import gsap from "gsap";
import { Draggable } from "gsap/all";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, Draggable);

const horizontalText = ref(null);

const popups = [
  "aether",
  "dku",
  "dkue",
  "led",
  "pure",
  "rookie",
  "tangram",
  "teamplay-admin",
  "teamplay",
  "teamplay",
  "teamplay-admin",
  "tangram",
  "rookie",
  "pure",
  "led",
  "dku",
  "dkue",
  "aether",
];
const popupTexts = [
  ["기술적 전문성", "Technical expertise"],
  ["코드 품질 개선", "Quality assurance"],
  ["문제 해결 능력", "Problem-solving"],
  ["적응력", "Adaptability"],
  ["협업 능력", "Collaboration"],
  ["세심한 주의력", "Attention to detail"],
  ["시간 관리", "Time management"],
  ["원활한 커뮤니케이션", "Communication"],
  ["지속적인 학습", "Continuous learning"],
  ["창의성", "Creativity"],
  ["분석적 사고", "Analytical thinking"],
  ["기술적 전문성", "Technical expertise"],
  ["코드 품질 개선", "Quality assurance"],
  ["문제 해결 능력", "Problem-solving"],
  ["적응력", "Adaptability"],
  ["협업 능력", "Collaboration"],
  ["세심한 주의력", "Attention to detail"],
  ["시간 관리", "Time management"],
  ["원활한 커뮤니케이션", "Communication"],
  ["지속적인 학습", "Continuous learning"],
  ["창의성", "Creativity"],
  ["분석적 사고", "Analytical thinking"],
];
function closePop(e) {
  e.target.closest("li").style.display = "none";
}

onMounted(() => {
  const texts = gsap.utils.toArray(
    horizontalText.value.querySelectorAll(".text li")
  );
  const pops = gsap.utils.toArray(
    horizontalText.value.querySelectorAll(".txt-pop li")
  );

  //------ 드래그 ------//
  Draggable.create(".txt-pop li", {
    bounds: ".horizontalText",
    edgeResistance: 0.9,
    type: "x,y",
    // inertia: true, //멤버쉽이라 적용안됨
    dragClickables: false,
    autoScroll: true,
  });

  const staggerAnimation = gsap
    .fromTo(
      pops,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.04,
        duration: 0.2,
        ease: "none",
      }
    )
    .pause();

  gsap
    .timeline({
      onReverseComplete: () => {
        staggerAnimation.reverse();
      },
      scrollTrigger: {
        trigger: horizontalText.value,
        pin: true,
        onPin: (self) => {
          self.pinTarget.style.willChange = "transform";
        },
        onUnpin: (self) => {
          self.pinTarget.style.willChange = "auto";
        },
        start: "top top",
        end: `+=300%`,
        scrub: true,
        animation: staggerAnimation,
        toggleActions: "restart none none reverse",
      },
    })
    .to(
      texts[0],
      {
        left: 0,
        ease: "none",
        duration: 3,
      },
      "<"
    )
    .to(
      texts[1],
      {
        right: 0,
        ease: "none",
        duration: 3,
      },
      "<"
    )
    .to(
      texts[2],
      {
        left: 0,
        ease: "none",
        duration: 3,
      },
      "<"
    )
    .to(
      texts[3],
      {
        right: 0,
        ease: "none",
        duration: 3,
      },
      "<"
    )
    .to(
      texts[3],
      {
        onStart: () => {
          staggerAnimation.play();
        },
        duration: 4,
      },
      "-=70%"
    );

  window.addEventListener("resize", ScrollTrigger.update);
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill();
  });
});
</script>
