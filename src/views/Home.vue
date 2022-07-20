<template>
  <Swiper />
  <ItemsWrap />
  <DroppedList />
  <BrandList />
  <HomeBanner />
  <MostPopular />
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '~/store/auth'
import Swiper from '~/views/Swiper.vue'
import ItemsWrap from '~/views/layout/ItemsWrap.vue'
import DroppedList from '~/views/layout/DroppedList.vue'
import BrandList from '~/views/layout/BrandList.vue'
import HomeBanner from '~/views/layout/HomeBanner.vue'
import MostPopular from '~/views/layout/MostPopular.vue'

export default {
  components: {
    Swiper,
    ItemsWrap,
    DroppedList,
    BrandList,
    HomeBanner,
    MostPopular
  },
  computed: {
    ...mapStores(useAuthStore)
  },
}
</script> 
