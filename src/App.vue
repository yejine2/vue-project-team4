<template>
  <TheHeader />
  <RouterView />
  <TheFooter />
</template>

<script>
import TheHeader from '~/views/TheHeader.vue'
import TheFooter from '~/views/TheFooter.vue'

export default {
  components: {
    TheHeader,
    TheFooter
  },
}
</script>

<style lang="scss">
@import "~/scss/main.scss";
body {
  padding-top: 101px;
}
</style>
