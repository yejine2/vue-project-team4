<template>
  <div class="container">
    <h1>제품 조회</h1>

    <RouterLink
      to="/admin/products/add"
      class="btn btn-outline-primary">
      <i class="fa-solid fa-plus"></i>
    </RouterLink>

    <table class="table table-light">
      <thead>
        <tr>
          <th scope="col">
            이미지
          </th>
          <th scope="col">
            상품명
          </th>
          <th scope="col">
            태그
          </th>
          <th scope="col">
            가격
          </th>
          <th scope="col">
          </th>
          <th scope="col">
          </th>
        </tr>
      </thead>
      <tbody>
        <ProductsList
          v-for="product in indexStore.allProducts"
          :key="product.id"
          :product="product" />
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useIndexStore } from '~/store/admin.js'
import ProductsList from '~/components/product/ProductsList.vue'

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
@import "../node_modules/bootstrap/scss/bootstrap.scss";

</style>
