<template>
  <div class="product-container">
    <div class="top-grop">
      <RouterLink
        to="/admin">
        <h2 class="main-title">
          관리자 페이지
        </h2>
      </RouterLink>
      <h3 class="product-title">
        전체 제품 조회
      </h3>
      <RouterLink
        to="/admin/products/add"
        class="btn btn-outline-primary">
        <i class="fa-solid fa-plus"></i>
      </RouterLink>
    </div>
    
    <div calss="product-list">
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

a {
  text-decoration: none;
}
.product-container {
  margin: 0 auto;
  padding: 40px 40px 160px;
  position: relative;

  .top-grop {
    margin-bottom: 30px;
  .main-title {
    line-height: 29px;
    padding-bottom: 10px;
    font-size: 16px;
    font-weight: 400;
    color: $color-black;;
  }
  .product-title {
    text-align: center;
    font-size: 24px;
    color: $color-black;
    padding-bottom: 40px;
  }
  .add-button {
  position: absolute;
  right: 40px;
  }
  }
  .product-list {
    display: flex;
    justify-content: center;
  }
  th {
    white-space: nowrap;
    vertical-align: middle;
    text-align: center;
    background-color: $color-black;
    color: $color-white;
  }
}

</style>
