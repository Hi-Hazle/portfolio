<template>
  <section ref="scroller" id="scroller">
    <LoaderWrap />
  </section>
</template>

<script setup>
import LoaderWrap from "./LoaderWrap.vue";
import { useScrollerStore } from "@/stores/scroller";
const store = useScrollerStore();

import { onMounted, ref } from "vue";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";

gsap.registerPlugin(ScrollTrigger);
const scroller = ref(null);

// Setup
onMounted(() => {
  const bodyScrollBar = Scrollbar.init(scroller.value, {
    damping: 0.05,
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

  ScrollTrigger.defaults({ scroller: scroller });

  store.setScroller(scroller.value);
  if (document.querySelector(".gsap-marker-scroller-start")) {
    const markers = gsap.utils.toArray('[class *= "gsap-marker"]');
    bodyScrollBar.addListener(({ offset }) => {
      gsap.set(markers, { marginTop: -offset.y });
    });
  }
});
</script>
