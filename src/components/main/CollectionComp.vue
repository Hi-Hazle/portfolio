<template>
  <section class="collection mt300">
    <ul class="title inner">
      <li><h2 class="commonTittle">Collections</h2></li>
      <li>
        <RouterLink to="/collection" class="moreBtn"
          >more<img src="@images/common/donutIco.png" alt="" />
        </RouterLink>
      </li>
    </ul>
    <section class="grid">
      <Vue3Marquee
        :clone="true"
        :duration="50"
        :pauseOnHover="true"
        @onPause="playState = 'paused'"
        @onResume="playState = 'playing'"
        direction="reverse"
      >
        <a
          v-for="(item, index) in items1"
          :key="index"
          :href="item.href"
          target="_blank"
          class="marqueeItem"
        >
          <img
            :src="`assets/images/main/main-collection${index + 1}.jpg`"
            :alt="item.alt"
          />
        </a>
      </Vue3Marquee>
      <Vue3Marquee
        :clone="true"
        :duration="50"
        :pauseOnHover="true"
        @onPause="playState = 'paused'"
        @onResume="playState = 'playing'"
      >
        <a
          v-for="(item, index) in items2"
          :key="index"
          :href="item.href"
          target="_blank"
          class="marqueeItem"
        >
          <img
            :src="`assets/images/main/main-collection${index + 7}.jpg`"
            :alt="item.alt"
          />
        </a>
      </Vue3Marquee>
    </section>
  </section>
</template>

<script setup>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";

import { ref } from "vue";

const items1 = ref([
  {
    href: "https://tangramfactory.com/main",
    alt: "Tangram",
  },
  {
    href: "https://tangramfactory.com/smartropepure",
    alt: "Smartrope PURE",
  },
  {
    href: "https://team-play.kr/",
    alt: "Teamplay",
  },
  {
    href: "https://tangramfactory.com/lighting",
    alt: "Lighting AETHER",
  },
  {
    href: "https://tangramfactory.com/smartrope",
    alt: "Smartrope LED",
  },
  {
    href: "https://tangramfactory.com/smartroperookie",
    alt: "Smartrope ROOKIE",
  },
]);
const items2 = ref([
  {
    href: "https://www.green-cos.com/kor/main.php",
    alt: "GreenCos",
  },
  {
    href: "https://hkplus.dongguk.edu/main.php",
    alt: "Dongguk",
  },
  {
    href: "https://seoul.bgneye.com:459/main.php",
    alt: "BgnEye GN",
  },
  {
    href: "https://www.bohunedu.or.kr:8443/",
    alt: "Bohunedu",
  },
  {
    href: "http://en.bgneye.com/main.php",
    alt: "BgnEye Global",
  },
  {
    href: "http://www.bgneye.com/intro.php",
    alt: "BgnEye",
  },
]);
</script>
