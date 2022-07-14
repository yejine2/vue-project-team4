<template>
  <div class="top-nav">
    <RouterLink
      to="/my"
      class="top-nav__link">
      마이페이지
    </RouterLink>
    <!-- LogIn / LogOut -->
    <template v-if="authStore.logInLoading">
      <span class="login-icon material-symbols-outlined">
        login
      </span>
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
        class="top-nav__logo">
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
      <span class="search-icon material-symbols-outlined">
        search
      </span>
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
  height: 32px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 40px;
  .top-nav__link {
    color: #707070;
    text-decoration: none;
    font-size: 12px;
    padding: 10px;
  }
  .login-icon {
    font-size: 20px;
    color: #707070;
  }
}
.main-nav{
  height: 67px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 40px;
  border-top: 1px solid #e9e9e9;
  .logo-nav {
    font-size:0;
  }
  .main-nav__logo {
    width: 120px;
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
  .search-icon {
    font-size: 34px;
    margin-left: 20px;
    padding: 10px;
  }
  }
}
</style>
