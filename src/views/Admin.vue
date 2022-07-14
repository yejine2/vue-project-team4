<template lang="">
  <div class="container">
    <AdminNav />
    <p class="btn btn-secondary">
      전체 거래(판매) 내역 완료/취소 및 해제
    </p>
   
    <p class="btn btn-warning">
      제품 수정  id 연결하기
    </p>
 
    <p class="btn btn-primary">
      단일 제품 상세 조회 페이지 만들기
    </p>
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
@import '../../node_modules/bootstrap/scss/bootstrap.scss';
</style>
