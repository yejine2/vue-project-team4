<template>
  <div class="container">
    <h1>상품 상세 정보</h1>

    <img 
      :src="indexStore.product.thumbnail" 
      :alt="indexStore.product.title" />


    <div
      class="alert alert-secondary"
      role="alert">
      <h4 class="alert-heading">
        {{ indexStore.product.title }}
      </h4>
      <hr />
      <p>
        {{ Number(indexStore.product.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} 원
      </p>
      <hr />
      <p> {{ indexStore.product.description }}</p>
      <hr />
      <span
        v-for="tag in indexStore.product.tags"
        :key="tag"
        class="mb-0">
        # {{ tag }}
      </span>
    </div>

    <div>
      <img 
        :src="indexStore.product.photo" 
        :alt="'상세 제품 사진'" />
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useIndexStore } from '~/store/admin.js'

export default {
  data() {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    ...mapStores(useIndexStore),
    // getPrice() {
    //   return this.indexStore.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    // },
  },
  async created() {
    await this.indexStore.productDetail(this.id)
  },
  methods: {
    async productDetail() {
      await this.indexStore.productDetail({
        id: this.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../node_modules/bootstrap/scss/bootstrap.scss";
</style>
