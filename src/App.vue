<template>
  <TheHeader />
  <RouterView />
</template>

<script>
import TheHeader from '~/views/TheHeader.vue'
export default {
  components: {
    TheHeader
  },
}
</script>

<style lang="scss">
@import "~/scss/main.scss";

</style>
