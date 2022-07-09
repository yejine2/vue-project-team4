<template lang="">
  <div>
    <AdminNav />
    <h1>전체 거래(판매) 내역 완료/취소 및 해제</h1>
   
    <button class="btn btn-warning">
      제품 수정
    </button>
    <button class="btn btn-danger">
      제품 삭제
    </button>
    <h3>단일 제품 상세 조회</h3>
  </div>
</template>

<script>
import AdminNav from '~/components/AdminNav.vue'

export default {
  components: {
    AdminNav
  }
}
</script>

<style lang="scss" scoped>

</style>
