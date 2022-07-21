<template>
  <nav class="navbar">
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
  
    <div
      ref="bottom"
      class="main-nav">
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
        <img
          src="../assets/search.png"
          alt="검색버튼"
          class="search_btn" />
      </div>
    </div>
  </nav>
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '~/store/auth'

export default {
  computed: {
    ...mapStores(useAuthStore)
  },
  mounted() {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 150) {
        this.$refs.bottom.classList.add('bottom')
      }
    })
  },
  unmounted() {
    window.removeEventListener('scroll', () => {
      if(window.scrollY > 150) {
        this.$refs.bottom.classList.add('bottom')
      }
    })
  }
}
</script>

<style scoped lang="scss">

.navbar {
  width: 100%;
  position: fixed;
  background-color: $color-white;
  top:0;
  left: 0;
  right: 0;
  z-index: 3;
}
.top-nav{
  height: 32px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 40px;
  border-bottom: 1px solid #e9e9e9;
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
    .search_btn {
      height: 34px;
      margin-left: 30px;
    }
  }
}
.bottom {
  border-bottom: 1px solid #e9e9e9;
}
</style>
