<template>
  <Swiper />
  <ItemsWrap />
  <DroppedList />
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '~/store/auth'
import Swiper from '~/views/Swiper.vue'
import ItemsWrap from '~/views/layout/ItemsWrap.vue'
import DroppedList from '~/views/layout/DroppedList.vue'

export default {
  components: {
    Swiper,
    ItemsWrap,
    DroppedList
  },
  computed: {
    ...mapStores(useAuthStore)
  },
}
</script> 
