<template>
  <Swiper />
  <ItemsWrap />
  <DroppedList />
  <BrandList />
  <HomeBanner />
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '~/store/auth'
import Swiper from '~/views/Swiper.vue'
import ItemsWrap from '~/views/layout/ItemsWrap.vue'
import DroppedList from '~/views/layout/DroppedList.vue'
import BrandList from '~/views/layout/BrandList.vue'
import HomeBanner from '~/views/layout/HomeBanner.vue'



export default {
  components: {
    Swiper,
    ItemsWrap,
    DroppedList,
    BrandList,
    HomeBanner
  },
  computed: {
    ...mapStores(useAuthStore)
  },
}
</script> 
