<template>
  <div class="top-nav">
    <RouterLink
      to="/"
      class="top-nav__link">
      홈(임시)
    </RouterLink>
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
  <div class="main-nav"></div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '~/store/auth'

export default {
  computed: {
    ...mapStores(useAuthStore)
  },
  // watch: {
  //   ['authStore.user'](user) {
  //     console.log('user::::', user)
  //   }
  // },
  // created() {
  //   console.log(this.authStore.user)
  // }
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

</style>
