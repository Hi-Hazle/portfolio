<template>
  <section ref="introWrap" class="introWrap mt300">
    <div class="title inner">
      <h3 class="stext"><p>breathed life</p></h3>
      <h3 class="stext">
        <p>into this</p>
        <div class="highlight">
          <p>PROJECT</p>
          <i></i>
        </div>
      </h3>
    </div>
    <article class="scrollHorizontal mt100" ref="scrollHorizontal">
      <div class="content" ref="content">
        <div class="img">
          <img src="@images/main/scrollHorizontalImg.jpg" alt="" />
        </div>
        <div class="desc">
          <p>If you want to learn more about me</p>
          <p class="dot">
            <b>please check out the <span>Contens below.</span></b>
          </p>
          <p>I have a lot to say,</p>
          <p>but the text here is all about</p>
          <p>showcasing interactivity.</p>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, inject, watch } from "vue";
import { useScrollerStore } from "@/stores/scroller";
const store = useScrollerStore();

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);
const scrollHorizontal = ref(null);
const content = ref(null);
let scroller = ref(null);

onMounted(() => {
  scroller.value = store.scroller;
  store.isMarkers();

  ScrollTrigger.defaults({
    scroller: scroller.value,
  });

  const space = Number(
    window
      .getComputedStyle(scrollHorizontal.value)
      .getPropertyValue("padding-right")
      .split("px")[0]
  );
  const texts = document.querySelectorAll(".stext p");
  const chars1 = new SplitType(texts[0]).chars;
  const chars2 = new SplitType(texts[1]).chars;
  const chars3 = new SplitType(document.querySelector(".highlight p")).chars;
  const highlight = document.querySelector(".highlight").querySelector("i");
  const textTimeline = gsap.timeline();
  const staggerAnimation = [
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.04,
      duration: 0.2,
      ease: "none",
    },
  ];
  textTimeline
    .fromTo(chars1, ...staggerAnimation)
    .fromTo(chars2, ...staggerAnimation, "-=50%")
    .fromTo(chars3, ...staggerAnimation, "-=50%")
    .fromTo(
      highlight,
      {
        height: 0,
        opacity: 0,
      },
      {
        height: "100%",
        opacity: 1,
        duration: 0.2,
        ease: "none",
      },
      "-=10%"
    )
    .pause();

  ScrollTrigger.create({
    trigger: ".introWrap",
    start: "top center",
    end: "bottom center",
    scrub: false,
    animation: textTimeline,
    toggleActions: "restart none none reverse",
    markers: true,
  });
  const target = content.value;
  const targets = gsap.utils.toArray(content.value.querySelectorAll("div"));
  const imgTarget = content.value.querySelector(".img");
  const txtTarget = content.value.querySelector(".desc");
  function toggleClass(element, className) {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  }
  const windowWidth = window.innerWidth;
  let scrollTween = gsap
    .timeline({
      scrollTrigger: {
        trigger: scrollHorizontal.value,
        pin: true,
        // onPin: (self) => {
        //   self.pinTarget.style.willChange = "transform";
        // },
        // onUnpin: (self) => {
        //   self.pinTarget.style.willChange = "auto";
        // },
        start: "top top",
        end: `+=600%`,
        scrub: true,
      },
    })
    .to(imgTarget, {
      width: "100%",
      ease: "none",
      duration: 4,
      delay: 1,
    })
    .to(
      imgTarget.querySelector("img"),
      {
        scale: 1.1,
        ease: "Power1.out",
        snap: { duration: { min: 0.02, max: 0.5 }, delay: 0.1 }, // Exclude from scrubbing
      },
      "-+10%"
    )
    .call(() => {
      toggleClass(imgTarget, "active");
      fadeIn.time(0).pause();
    })
    .to(target, {
      x: `-${windowWidth * (targets.length - 1) - space}px`,
      ease: "Power1.out",
      duration: 10,
    })
    .to(
      target,
      {
        onStart: () => {
          fadeIn.play();
        },
        duration: 10,
      },
      ">-10"
    );
  const fadeIn = gsap
    .fromTo(
      txtTarget,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        ease: "none",
      }
    )
    .pause();

  window.addEventListener("resize", ScrollTrigger.update);
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill();
  });
});
</script>
