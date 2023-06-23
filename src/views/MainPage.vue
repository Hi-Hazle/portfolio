<template>
  <Visual />
  <Intro />
  <HorizontalText />
  <WorkComp />
  <Skill />
  <Represent />
</template>

<script setup>
import { onMounted, defineEmits } from "vue";
import Visual from "components/main/VisualComp.vue";
import Intro from "components/main/IntroComp.vue";
import HorizontalText from "components/main/HorizontalTextComp.vue";
import WorkComp from "components/main/WorkComp.vue";
import Skill from "components/main/SkillComp.vue";
import Represent from "components/main/represent/RepresentComp.vue";

const emit = defineEmits(["update", "set"]);

onMounted(() => {
  emit("set", 1);
  emit("update");
});
</script>

<style lang="scss">
@import "styles/main.scss";
</style>
