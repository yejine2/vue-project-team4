<template>
  <table class="table table-dark table-striped table-hover">
    <thead>
      <tr>
        <th scope="col">
          상품 이미지
        </th>
        <th scope="col">
          상품명
        </th>
        <th scope="col">
          상품 가격
        </th>
        <th scope="col">
          구매자
        </th>
        <th scope="col">
          이메일
        </th>
        <th scope="col">
          계좌정보
        </th>
        <th scope="col">
          구매일시
        </th>
        <th scope="col">
          구매취소
        </th>
        <th scope="col">
          구매확정
        </th>
        <th scope="col">
          저장
        </th>
      </tr>
    </thead>

    <tbody>
      <SalesItems
        v-for="product in indexStore.transactions"
        :key="product.id"
        :product="product" />
    </tbody>
  </table>
</template>

<script>
import { mapStores } from 'pinia'
import { useIndexStore } from '~/store/admin.js'
import SalesItems from '~/components/product/SalesItems.vue'

export default {
  components: {
    SalesItems
  },
  computed: {
    ...mapStores(useIndexStore)
  },
  async created() {
    await this.indexStore.allTransactions()
  }
}
</script>

<style lang="scss" scoped>
@import "../node_modules/bootstrap/scss/bootstrap.scss";

th {
  white-space: nowrap;
  vertical-align: middle;
  text-align: center;
}
</style>
