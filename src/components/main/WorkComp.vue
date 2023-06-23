<template>
  <section ref="workWrap" class="workWrap mt300">
    <div class="inside">
      <h3>WROK</h3>
      <ul class="list mt50">
        <li v-for="({ title, link }, i) in contents" :key="i">
          <div class="img">
            <img :src="`assets/images/main/work${i + 1}.jpg`" alt="" />
          </div>
          <div class="txt">
            <h4 ref="title">{{ title }}</h4>
            <p ref="link">{{ link }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);
import SplitType from "split-type";

import { inject, onMounted, ref, computed } from "vue";

const contents = [
  { title: "TANGRAM LIGHTING AETHER", link: "www.tangram.kr" },
  { title: "SmartRope PURE", link: "www.tangram.kr/smartropepure" },
  { title: "TEAMPLAY", link: "www.team-play.kr" },
  { title: "SmartRope ROOKIE", link: "www.tangram.kr/smartroperookie" },
  { title: "LIGHTING AETHER", link: "www.tangram.kr/lighting" },
];

const workWrap = ref();
onMounted(() => {
  const targets = gsap.utils.toArray(
    workWrap.value.querySelectorAll(".list li .img img")
  );
  const boxs = gsap.utils.toArray(workWrap.value.querySelectorAll(".list li"));
  boxs.forEach((box, i) => {
    console.log(new SplitType(box.querySelector("h4")));
    const h4 = new SplitType(box.querySelector("h4")).chars;
    const p = new SplitType(box.querySelector("p")).chars;
    let tl = gsap
      .timeline({
        scrollTrigger: {
          start: "top center",
          trigger: box,
          scrub: false,
          toggleActions: "restart none none reverse",
        },
      })
      .fromTo(
        h4,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          duration: 0.2,
          ease: "none",
        }
      )
      .fromTo(
        p,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.01,
          duration: 0.1,
          ease: "none",
        },
        "<"
      );
    gsap.fromTo(
      targets[i],
      {
        yPercent: 50,
        // opacity: 0,
      },
      {
        yPercent: 0,
        // opacity: 1,
        ease: "none",
        scrollTrigger: {
          start: "top bottom",
          end: "bottom bottom",
          trigger: box,
          scrub: true,
          // toggleActions: "restart none none reverse",
        },
      }
    );
  });
});
</script>
