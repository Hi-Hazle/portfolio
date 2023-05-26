<template>
  <section ref="horizontalText" class="horizontalText">
    <ul class="text">
      <li>When your scroll ends,</li>
      <li>pop-ups appear.</li>
      <li>Please drag them</li>
      <li>to move away.</li>
    </ul>
    <ul class="pop">
      <li v-for="(pop, i) in popups" :key="i">
        <div class="window">
          <div class="title-bar">
            <div class="title-bar-text">
              {{ i % 2 === 0 ? "드래그 해보세요!" : "Drag Me!" }}
            </div>
            <div class="title-bar-controls">
              <button aria-label="Help"></button>
              <button aria-label="Close" @click="closePop"></button>
            </div>
          </div>
          <div class="window-body">
            <img :src="`assets/images/logos/${pop}.png`" alt="" />
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
import { useScrollerStore } from "@/stores/scroller";

import gsap from "gsap";
import { Draggable } from "gsap/all";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, Draggable);

const horizontalText = ref(null);
let scroller = ref(null);

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

function closePop(e) {
  e.target.closest("li").style.display = "none";
}

onMounted(() => {
  const texts = gsap.utils.toArray(
    horizontalText.value.querySelectorAll(".text li")
  );
  const pops = gsap.utils.toArray(
    horizontalText.value.querySelectorAll(".pop li")
  );

  //------ 드래그 ------//
  Draggable.create(".pop li", {
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
      "-=50%"
    );

  window.addEventListener("resize", ScrollTrigger.update);
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill();
  });
});
</script>
