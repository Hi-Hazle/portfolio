<script>
import MainVisual from "components/main/MainVisual.vue"
import ProjectIntro from "components/main/ProjectIntro.vue"
import Skills from "components/main/Skills.vue"
import Discover from "components/main/Discover.vue"
import Collections from "components/main/Collections.vue"
import BannerText from "components/main/BannerText.vue"
import SubmitForm from "components/main/SubmitForm.vue"

export default {
   components: {
      MainVisual,
      ProjectIntro,
      Skills,
      Discover,
      Collections,
      BannerText,
      SubmitForm
   }
}
</script>

<style lang="scss">
@import "styles/main.scss";
</style>

<template>
   <MainVisual />
   <ProjectIntro />
   <Skills />
   <Discover />
   <Collections />
   <BannerText />
   <SubmitForm />
</template>
