<script>
import PageHeader from "components/common/PageHeader.vue"
import PageFooter from "components/common/PageFooter.vue"
export default {
   components: {
      PageHeader,
      PageFooter
   }
}
</script>
<style lang="scss">
@import "styles/reset.scss";
@import "styles/common.scss";
</style>
<template>
   <PageHeader />
   <RouterView />
   <PageFooter />
</template>
