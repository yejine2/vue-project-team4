<template>
  <Swiper />
  <ItemsWrap />
  <HomeProductList />
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '~/store/auth'
import Swiper from '~/views/Swiper.vue'
import ItemsWrap from '~/views/layout/ItemsWrap.vue'
import HomeProductList from '~/views/layout/HomeProductList.vue'

export default {
  components: {
    Swiper,
    ItemsWrap,
    HomeProductList
  },
  computed: {
    ...mapStores(useAuthStore)
  },
}
</script> 
