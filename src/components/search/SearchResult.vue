<template>
  <div class="search_result">
    {{ searchStore.category }}
    <div
      v-for="brand in searchStore.brand"
      :key="brand">
      {{ brand }}
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useSearchStore } from '~/store/search'


export default {
  components: {
    
  },
  data() {
    return {
      filter_number: 1
    }
  },
  computed: {
    ...mapStores(useSearchStore)
  },
  watch: {

  }
}
</script>

<style scoped lang="scss">

</style>
