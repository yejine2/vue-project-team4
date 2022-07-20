<template>
  <div class="container">
    <img
      v-if="product.thumbnail"
      style="width: 300px; height: 300px; border: 1px solid lightgray;"
      :src="product.thumbnail"
      :alt="product.title"
      @click="$router.push(`/admin/products/detail/${product.id}`)" />
    <h4>{{ product.title }}</h4>
    <h4>{{ product.tags.join(' / ') }}</h4>
    <h4>{{ getPrice }}원</h4>
    <RouterLink
      :to="{
        name: 'EditProduct',
        params: {
          id: product.id,
          oldTitle: product.title,
          oldPrice: product.price,
          oldDescription: product.description,
          oldTags: product.tags.toString(),
          oldThumbnailBase64: product.thumbnails,
          oldIsSoldOut: product.isSoldOut
        }
      }"
      class="btn btn-outline-secondary">
      제품 수정
    </RouterLink>
    <button
      class="btn btn-outline-danger"
      @click="deleteProduct(product.id)">
      제품 삭제
    </button>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useIndexStore } from '~/store/admin.js'

export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapStores(useIndexStore),
        getPrice() {
      return this.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },
  methods: {
    deleteProduct(id) {
      this.indexStore.deleteProduct(id)
   }
  }
}
</script>

<style lang="scss" scoped>
</style>
