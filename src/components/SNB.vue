<template>
  <div class="snb_area">
    <RouterLink to="/my">
      <h2>마이 페이지</h2>
    </RouterLink>
    <nav class="snb">
      <div class="snb_list">
        <strong class="snb_title">쇼핑 정보</strong>
        <ul class="snb_menu">
          <li class="menu_item">
            <RouterLink
              to="#"
              class="menu_link">
              구매 내역
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="snb_list">
        <strong class="snb_title">내 정보</strong>
        <ul class="snb_menu">
          <template
            v-for="nav in navigations"
            :key="nav.path">
            <li class="menu_item">
              <RouterLink
                :to="nav.path"
                class="menu_link">
                {{ nav.name }}
              </RouterLink>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  data() {
    return {
      navigations: [
        { path: '/my/profile', name: '프로필 정보' },
        { path: '/my/account', name: '계좌 정보' }
      ]
    }
  }
}
</script>

<style lang="scss">
.snb_area {
  min-width: 180px;
  margin-right: 20px;
  a{
    text-decoration: none;
    color: #000;
    h2 {
      padding-bottom: 30px;
      font-size: 24px;
      font-weight: 600;
    }
  }
  nav.snb {
    display: block;
    .snb_list {
      .snb_title {
        display: inline-block;
        margin-bottom: 12px;
        font-size: 18px;
        font-weight: 700;
        line-height: 22px;
        vertical-align: top;
      }
      .snb_menu {
        .menu_item {
          margin-top: 12px;
          .menu_link {
            font-size: 15px;
            line-height: 18px;
            color: rgba(34,34,34,.5);
            text-decoration: none;
            
          }
          &:first-child {
            margin-top: 0;
          }
        }
      }
      &:nth-child(2) {
        margin-top: 40px;
      }
    }
  }
}
</style>
