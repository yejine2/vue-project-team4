<template>
  <Swiper />
  <itemsWrap />
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '~/store/auth'
import Swiper from '~/views/Swiper.vue'
import itemsWrap from '~/views/layout/itemsWrap.vue'

export default {
  components: {
    Swiper,
    itemsWrap 
    
  },
  computed: {
    ...mapStores(useAuthStore)
  },
}
</script> 
