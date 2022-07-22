<template>
  <div class="snb-area">
    <RouterLink
      to="/admin">
      <h2 class="snb-main-title">
        관리자 페이지
      </h2>
    </RouterLink>
    <nav class="snb-nav">
      <div class="snb-list">
        <strong class="snb-title">제품 관리</strong>
        <ul class="snb-menu">
          <li class="menu-item">
            <RouterLink
              to="/admin/products"
              class="nav-link">
              전체 제품 조회
            </RouterLink>
          </li>
          <li class="menu-item">
            <RouterLink
              to="/admin/products/add"
              class="nav-link">
              제품 추가
            </RouterLink>
          </li>
        </ul>
      </div>
      <div
        class="snb-list"
        style="margin-top: 20px">
        <strong class="snb-title">판매 관리</strong>
        <ul class="snb-menu">
          <li class="menu-item">
            <RouterLink
              to="/admin/saleshistory"
              class="nav-link"
              href="#">
              전체 판매 내역
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>

li {
  list-style: none;
}
a {
  text-decoration: none;
}
.snb-area {
  width: 180px;
  margin-right: 20px;
  .snb-main-title {
    line-height: 29px;
    padding-bottom: 30px;
    font-size: 24px;
    font-weight: 700;
    color: $color-black;
  }
  .snb-list {
    width: 180px;
    height: 142px;
    .snb-title {
      line-height: 22px;
      margin-bottom: 12px;
      display: inline-block;
      vertical-align: top;
      font-size: 18px;
      font-weight: 700;
      color: $color-black;
    }
    .snb-menu {
      width: 180px;
      height: 108px;
      .menu-item {
        margin-top: 12px;
        .nav-link{
          color: rgba(34,34,34,.5);
          line-height: 18px;
          font-size: 15px;
      }
      }
    }
  }
}


</style>



  <!-- <div class="nav-container">
    <div class="sub-area">
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <RouterLink
            to="/admin"
            class="admin nav-link">
            관리자 페이지
          </RouterLink>
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
  </div> -->
