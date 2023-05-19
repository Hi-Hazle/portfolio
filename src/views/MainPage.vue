<template>
  <app-header />
  <Visual />
  <Intro />
  <HorizontalText />
  <Skill />
  <app-footer />
</template>

<script setup>
import { onMounted, defineEmits } from "vue";
import AppHeader from "components/common/AppHeader.vue";
import Visual from "components/main/VisualComp.vue";
import Intro from "components/main/IntroComp.vue";
import Skill from "components/main/SkillComp.vue";
import AppFooter from "components/common/AppFooter.vue";
import HorizontalText from "components/main/HorizontalTextComp.vue";

const emit = defineEmits(["update", "set"]);

onMounted(() => {
  emit("set", 1);
  emit("update");
});
</script>

<style lang="scss">
@import "styles/main.scss";
</style>
