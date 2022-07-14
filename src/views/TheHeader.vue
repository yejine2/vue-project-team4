<template>
  <div class="top-nav">
    <RouterLink
      to="/my"
      class="top-nav__link">
      마이페이지
    </RouterLink>
    <!-- LogIn / LogOut -->
    <template v-if="authStore.logInLoading">
      Loading...
    </template>
    <template v-else-if="!authStore.user">
      <RouterLink
        to="/login"
        class="top-nav__link">
        로그인
      </RouterLink>
    </template>
    <template v-else>
      <RouterLink 
        to="/"
        class="top-nav__link"
        @click="authStore.signOut">
        로그아웃
      </RouterLink>
    </template>
  </div>
  
  <div class="main-nav">
    <div class="logo-nav">
      <RouterLink
        to="/"
        class="top-nav__link">
        <img
          class="main-nav__logo"
          src="../assets/logo.png"
          alt="kream" />
      </RouterLink>
    </div>
    <div class="link-nav">
      <RouterLink
        to="/search"
        class="main-nav__link">
        SHOP
      </RouterLink>
      <!-- 검색 버튼 -->
      <img
        src="../assets/search.png"
        alt="검색버튼"
        class="search_btn" />
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '~/store/auth'

export default {
  computed: {
    ...mapStores(useAuthStore)
  }
}
</script>

<style scoped lang="scss">

.top-nav{
  display: flex;
  justify-content: flex-end;
  padding: 8px 40px;
}
.top-nav__link {
  color: $color-black;
  text-decoration: none;
  font-size: 12px;
  padding: .7rem;
}
.main-nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 40px;
  .main-nav__logo {
    width: 120px;
    flex-grow: 3;
  }
  .link-nav {
    display: flex;
    align-items: center;

    .main-nav__link {
      color: $color-black;
      font-size: 16px;
      text-decoration: none;
      padding: 8px
    }
    .search_btn {
      height: 34px;
      margin-left: 30px;
    }
  }
}


</style>
