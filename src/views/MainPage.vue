<template>
  <app-header />
  <MainVisual />
  <ArrowIcon />
  <ProjectIntro />
  <SkillList />
  <Discover />
  <Collections />
  <BannerText />
  <SubmitForm />
  <mouse-cursor />
  <app-footer />
</template>

<script setup>
import { onMounted, defineEmits } from "vue";
import AppHeader from "components/common/AppHeader.vue";
import AppFooter from "components/common/AppFooter.vue";
import MainVisual from "components/main/MainVisual.vue";
import ProjectIntro from "components/main/ProjectIntro.vue";
import SkillList from "components/main/SkillList.vue";

import Discover from "components/main/Discover.vue";
import Collections from "components/main/Collections.vue";
import BannerText from "components/main/BannerText.vue";
import SubmitForm from "components/main/SubmitForm.vue";
import MouseCursor from "components/common/MouseCursor.vue";
import ArrowIcon from "components/common/ArrowIcon.vue";

const emit = defineEmits(["update", "set"]);

onMounted(() => {
  emit("set", 1);
  emit("update");
});
</script>

<style lang="scss">
@import "styles/main.scss";
</style>
