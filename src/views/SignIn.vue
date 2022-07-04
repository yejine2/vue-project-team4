<template>
  <div class="container-login">
    <div class="login-area">
      <h2 class="login-title">
      </h2>
      <div class="input-box">
        <h3 class="input-title">
          이메일 주소
        </h3>
        <input
          v-model="email"
          class="input-item"
          type="text"
          placeholder="Email" />
      </div>
      <div class="input-box">
        <h3 class="input-title">
          비밀번호
        </h3>
        <input
          v-model="password"
          class="input-item"
          type="text"
          placeholder="Password" />
      </div>
      <div class="login-btn-box">
        <button @click="signIn">
          로그인
        </button>
      </div>
      <div class="sign-up-box">
        <RouterLink
          class="sign-up-link"
          to="/join">
          이메일 가입
        </RouterLink>
      </div>
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

<style scoped lang="scss">

.container-login {
  margin: 0 auto;
  padding: 0 40px;
  max-width: 1280px;
  .login-area {
  margin: 0 auto;
  padding: 60px 0 160px;
  width: 400px;
  .login-title {
    margin: 0 auto;
    padding-bottom: 50px;
    justify-content: center;
    display: flex;
    width: 250px;
    height: 56px;
    background: url(../assets/login_title.png) no-repeat;
    background-size: 250px 56px;
  }
  .input-box {
    padding: 10px 0 14px;
    .input-title {
      font: {
        size: 13px;
        weight: 600;
      }
    }
    .input-item {
    border: 0;
    padding: 8px 0;
    width: 100%;
    font-size: 15px;
    line-height: 22px;
    border-bottom: 1px solid #ebebeb;
    &:focus{
      outline: none;
      border-bottom: 2px solid $color-black;
    }
    }
  }
  .login-btn-box {
    padding-top: 20px;
    button {
      width: 100%;
      height: 52px;
      border-radius: 12px;
      color: $color-white;
      background-color: $color-black;
      font-size: 16px;
      cursor: pointer;
      border: 0px solid white;
    }
  }
  .sign-up-box {
      padding-top: 20px;
      text-align: center;
    .sign-up-link {
      text-decoration: none;
      color: $color-black;
      font-size: 13px;
    }
  }
}
}


</style>
