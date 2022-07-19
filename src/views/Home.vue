<template>
  <Swiper />
  <ItemsWrap />
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '~/store/auth'
import Swiper from '~/views/Swiper.vue'
import ItemsWrap from '~/views/layout/ItemsWrap.vue'

export default {
  components: {
    Swiper,
    ItemsWrap 
    
  },
  computed: {
    ...mapStores(useAuthStore)
  },
}
</script> 
