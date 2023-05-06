<script>
import PageHeader from "components/common/PageHeader.vue"
import PageFooter from "components/common/PageFooter.vue"
import MouseCursor from "components/common/MouseCursor.vue"
export default {
   components: {
      PageHeader,
      PageFooter,
      MouseCursor
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
   <MouseCursor />
</template>
