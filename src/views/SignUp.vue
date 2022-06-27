<template>
  <div class="container">
    <h1>회원가입</h1>
    <div class="signup-container">
      <div>
        <input
          v-model="email"
          type="text"
          placeholder="Email" />
      </div>
      <div>
        <input
          v-model="password"
          maxlength="8"
          type="text"
          placeholder="Password" />
      </div>
      <div>
        <input
          v-model="displayName"
          maxlength="20"
          type="text"
          placeholder="Name" />
      </div>
      <button @click="signUp">
        가입하기
      </button>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '~/store/auth'

export default {
  data() {
    return {
      email: '',
      password: '',
      displayName: ''
    }
  },
  computed: {
    ...mapStores(useAuthStore)
  },  
  methods: {
    signUp() {
      this.authStore.signUp({
        email: this.email,
        password: this.password,
        displayName: this.displayName
      })
    }
  }
}
</script>
