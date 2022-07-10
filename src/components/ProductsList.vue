<template>
  <div>
    <img 
      v-if="product.thumbnail"
      :src="product.thumbnail" 
      :alt="product.title" />
    <h4>{{ product.title }}</h4>
    <h4>{{ product.tags }}</h4>
    <h4>{{ product.price }}원</h4>
    <RouterLink
      to="/admin/prodicts/edit"
      class="btn btn-secondary">
      제품 수정
    </RouterLink>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useIndexStore } from '~/store/admin.js'

export default {
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapStores(useIndexStore)
  }
}
</script>

