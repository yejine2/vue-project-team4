<template>
  <div class="container">
    <div class="snb_area">
      <SNB />
    </div>
    <div class="content_area">
      <RouterView />
      <template v-if="$route.path == '/my'">
        <h2>로그인 사용자만 볼 수 있는지 테스트</h2>
        <h3>{{ userStore.user.displayName }}</h3>
        <h3>{{ userEmailMasking }}</h3>
        <RouterLink to="/my/profile">
          수정
        </RouterLink>
      </template>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'
import { useAuthStore } from  '~/store/auth'
import SNB from '~/components/SNB.vue'

export default {
  components: {
    SNB
  },
  computed: {
    ...mapStores(useUserStore, useAuthStore),
    userEmailMasking(){
      return this.userStore.userEmailMasking(this.userStore.user.email)
    },
    selectableBanks() {
      return this.userStore.getSelectableBanks()
    }
  },
  methods: {
    route() {
      console.log(this.$route)
      console.log('user',this.userStore.user)
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
}
</style>
