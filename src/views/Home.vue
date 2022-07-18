<template>
  <Swiper />
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '~/store/auth'
import Swiper from '~/views/Swiper.vue'

export default {
  components: {
    Swiper
  },
  computed: {
    ...mapStores(useAuthStore)
  },
}
</script> 
