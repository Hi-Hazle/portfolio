<template>
  <div ref="scroller" class="scroller">
    <section class="green">
      <div class="heading">ScrollTrigger & Smooth-Scrollbar</div>
      <!-- <div class="text">Section 1</div> -->
    </section>

    <section class="grey">
      <div class="text">Section 2</div>
    </section>

    <section class="red">
      <div class="text">Section 3</div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, inject, watch } from "vue";
import { useScrollerStore } from "@/stores/scroller";
const store = useScrollerStore();

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Scrollbar from "smooth-scrollbar";
gsap.registerPlugin(ScrollTrigger);

const scroller = ref(null);

onMounted(() => {
  // Setup

  const bodyScrollBar = Scrollbar.init(scroller.value, {
    damping: 0.01,
    delegateTo: document,
    alwaysShowTracks: true,
  });

  ScrollTrigger.scrollerProxy(scroller.value, {
    scrollTop(value) {
      if (arguments.length) {
        bodyScrollBar.scrollTop = value;
      }
      return bodyScrollBar.scrollTop;
    },
  });

  bodyScrollBar.addListener(ScrollTrigger.update);

  ScrollTrigger.defaults({ scroller: scroller.value });

  // The actual animations and ScrollTriggers
  gsap.to("section.grey .text", {
    rotation: 360,
    scrollTrigger: {
      trigger: "section.grey",
      start: "top top",
      end: () => "+=" + innerHeight,
      pin: true,
      scrub: true,
      markers: true,
    },
  });

  gsap.from("section.red .text", {
    x: -500,
    opacity: 0,
    scrollTrigger: {
      trigger: "section.red",
      start: "top 50%",
      toggleActions: "play none none reset",
      // markers:true
    },
  });

  // Only necessary to correct marker position - not needed in production
  if (document.querySelector(".gsap-marker-scroller-start")) {
    const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

    bodyScrollBar.addListener(({ offset }) => {
      gsap.set(markers, { marginTop: -offset.y });
    });
  }
});
</script>
