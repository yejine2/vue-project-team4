<template>
  <div>
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <RouterLink
          to="/admin/products"
          class="nav-link">
          제품 조회
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink
          to="/admin/saleshistory"
          class="nav-link"
          href="#">
          판매 내역
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import "../node_modules/bootstrap/scss/bootstrap.scss";

</style>
