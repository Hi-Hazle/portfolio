<template>
  <section ref="scroller" id="scroller">
    <LoaderWrap />
  </section>
</template>

<script setup>
import LoaderWrap from "./loader/LoaderWrap.vue";
import { useScrollerStore } from "@/stores/scroller";
const store = useScrollerStore();

import { onMounted, ref, watch } from "vue";

import Scrollbar from "smooth-scrollbar";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scroller = ref(null);
const bodyScrollBar = ref(null);

// Setup
onMounted(() => {
  bodyScrollBar.value = Scrollbar.init(scroller.value, {
    damping: 0.05,
    delegateTo: document,
    alwaysShowTracks: true,
  });
  ScrollTrigger.scrollerProxy(scroller.value, {
    scrollTop(value) {
      if (arguments.length) {
        bodyScrollBar.value.scrollTop = value;
      }
      return bodyScrollBar.value.scrollTop;
    },
  });
  bodyScrollBar.value.addListener(ScrollTrigger.update);
  bodyScrollBar.value.track.xAxis.element.remove();

  ScrollTrigger.defaults({ scroller: scroller });

  store.setScroller(scroller.value);
});

watch(
  () => store.markers,
  (newValue) => {
    if (newValue) {
      // 이벤트 실행
      if (document.querySelector(".gsap-marker-scroller-start")) {
        const markers = gsap.utils.toArray('[class *= "gsap-marker"]');
        bodyScrollBar.value.addListener(({ offset }) => {
          gsap.set(markers, { marginTop: -offset.y });
        });
      }
    }
  }
);
</script>
