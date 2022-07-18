<template>
  <div class="container">
    <h1>제품 조회</h1>
    <RouterLink
      to="/admin/products/add"
      class="btn btn-primary">
      제품 추가
    </RouterLink>
    <ul>
      <ProductsList
        v-for="product in indexStore.allProducts"
        :key="product.id"
        :product="product" />
    </ul>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useIndexStore } from '~/store/admin.js'
import ProductsList from '~/components/ProductsList.vue'

export default {
  components: {
    ProductsList
  },
  computed: {
    ...mapStores(useIndexStore)
  },
  created() {
    this.indexStore.allProduct()
  },
  methods: {
    allProducts() {
      this.indexStore.allProduct({
        id: this.id,
        title: this.title,
        price: this.price,
        description: this.description,
        tags: this.tags.split(','),
        thumbnail: this. thumbnail,
        isSoldOut: this.isSoldOut
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../node_modules/bootstrap/scss/bootstrap.scss';
</style>
