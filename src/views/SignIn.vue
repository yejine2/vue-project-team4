<template>
  <div class="container login">
    <h1>로그인하세요</h1>
    <div>
      <input
        v-model="email"
        type="text"
        placeholder="Email" />
    </div>
    <div>
      <input
        v-model="password"
        type="text"
        placeholder="Password" />
    </div>
    <button @click="signIn">
      로그인
    </button>
    <div>
      <RouterLink to="/join">
        회원가입
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '~/store/auth'

export default {
  data() {
    return {
      email: 'user_test1@gmail.com',
      password: '1234qwer',
    }
  }, 
  computed: {
    ...mapStores(useAuthStore)
  },  
  methods: {
    signIn() {
        this.authStore.signIn({
        email: this.email,
        password: this.password
      })
      this.$router.push('/')
    }
  }
}

</script>
