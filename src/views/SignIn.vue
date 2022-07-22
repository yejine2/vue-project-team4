<template>
  <div class="container-login">
    <div class="login-area">
      <h2 class="login-title">
      </h2>
      
      <!-- 이메일 입력 -->
      <div class="input-box">
        <h3
          class="input-title"
          :class="{ 'title-danger': emailHasError }">
          이메일 주소
        </h3>
        <input
          v-model="email"
          class="input-item"
          type="text"
          placeholder="예) kream@kream.co.kr"
          :class="{ 'input-danger': emailHasError }" />
        <p
          v-show="valid.email"
          class="input-error">
          이메일 주소를 정확히 입력해주세요.
        </p>
      </div>

      <!-- 비밀번호 입력 -->
      <div class="input-box">
        <h3
          class="input-title"
          :class="{ 'title-danger': passwordHasError }">
          비밀번호
        </h3>
        <input
          v-model="password"
          :class="{ 'input-danger': passwordHasError }"
          class="input-item"
          type="password"
          minlength="8"
          maxlength="16"
          placeholder="영문, 숫자, 특수문자 조합 8-16자" />
        <p
          v-show="valid.password"
          class="input-error">
          영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-16자)
        </p>
      </div>

      <div class="login-btn-box">
        <button
          :class="{ 'disabled-button': !isCompleted }"
          :disabled="!isCompleted"
          class="active-button"
          @click="signIn">
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
  <BannerBottom />
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '~/store/auth'
import BannerBottom from '~/views/layout/BannerBottom.vue'

export default {
  components: {
    BannerBottom
  },
  data() {
    return {
      email: '',
      password: '',
      valid: {
        email: false,
        password: false,
      },
        emailHasError: false,
        passwordHasError: false,
    }
  }, 
  computed: {
    ...mapStores(useAuthStore),
    // 유효성 검사 통과 시에만 로그인 버튼 활성화
    isCompleted () {
    return !this.valid.email && !this.valid.password && this.email && this.password
  }
  },
  watch: {
    'email': function() {
      this.checkEmail()
    },
    'password': function() {
      this.checkPassword()
    },
  },
  methods: {
    checkEmail() {
      // 이메일 형식 검사
      const validateEmail = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/

      if (!validateEmail.test(this.email) || !this.email) {
        this.valid.email = true
        this.emailHasError = true
        return
      } this.valid.email = false
        this.emailHasError = false
    },
    checkPassword() {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      const validatePassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/

        if (!validatePassword.test(this.password) || !this.password) {
        this.valid.password = true
        this.passwordHasError = true
        return
      } 
        this.valid.password = false
        this.passwordHasError = false
    },

    async signIn() {
      if (!this.email.trim() && !this.password.trim()) return
      try {
        this.authStore.signIn({
        email: this.email,
        password: this.password
      })
      this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
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
  padding-top: 80px;
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
    &::placeholder {
      color: #cdcdcd;
      font-weight: 400;
    }
    }
  }
  .login-btn-box {
    padding-top: 20px;
    .active-button {
      width: 100%;
      height: 52px;
      border-radius: 12px;
      color: $color-white;
      background-color: $color-black;
      font-size: 16px;
      cursor: pointer;
      border: 0px solid $color-white;
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
  // Error
  .input-error {
    line-height: 16px;
    font-size: 11px;
    color: $color-error;
  }
  .title-danger {
    color: $color-error;
  }
  .input-danger {
    border-bottom: 1px solid $color-error !important;
  }
  .disabled-button {
    width: 100%;
    height: 52px;
    border-radius: 12px;
    color: $color-white;
    font-size: 16px;
    border: 0px solid $color-white;
    background-color: #ebebeb !important ; 
    cursor: default !important;
  }
}
}


</style>
