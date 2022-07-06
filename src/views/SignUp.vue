<template>
  <div class="container-signup">
    <div class="sign-up-area">
      <h2 class="sign-up-title">
        회원가입
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
          :class="{ 'title-danger': passwordHasError }"
          class="input-title">
          비밀번호
        </h3>
        <input
          v-model="password"
          :class="{ 'input-danger': passwordHasError }"
          class="input-item"
          minlength="8"
          maxlength="16"
          type="password"
          placeholder="영문, 숫자, 특수문자 조합 8-16자" />
        <p
          v-show="valid.password"
          class="input-error">
          영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-16자)
        </p>
      </div>

      <!-- 이름 입력 -->
      <div class="input-box">
        <h3
          :class="{ 'title-danger': nameHasError }"
          class="input-title">
          이름
        </h3>
        <input
          v-model="displayName"
          :class="{ 'input-danger': nameHasError }"
          class="input-item"
          maxlength="20"
          type="text"
          placeholder="최대 20자"
          @input="test" />
        <p
          v-show="valid.displayName"
          class="input-error">
          이름을 입력해주세요. (최대 20자)
        </p>
      </div>
      <div class="sign-up-box">
        <button 
          class="sign-up-btn"
          @click="signUp">
          가입하기
        </button>
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
      email: '',
      password: '',
      displayName: '',
      valid: {
        email: false,
        password: false,
        displayName: false,
      },
        emailHasError: false,
        passwordHasError: false,
        nameHasError: false,
    }
  },
  computed: {
    ...mapStores(useAuthStore),
    
  },  
  watch: {
    'email': function() {
      this.checkEmail()
    },
    'password': function() {
      this.checkPassword()
    },
    'displayName': function() {
      this.checkDisplayName()
    }
  },
  methods: {
    checkEmail() {
      //이메일 형식이 빈칸 또는, 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우
      const validateEmail = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/
      if (!validateEmail.test(this.email) || !this.email) {
        this.valid.email = true
        this.emailHasError = true
        return
      } this.valid.email = false
        this.emailHasError = false
    },
    checkPassword() {
        if (!this.password) {
        this.valid.password = true
        this.passwordHasError = true
        return
      } this.valid.password = false
        this.passwordHasError = false
    },
    checkDisplayName() {
        if (!this.displayName) {
        this.valid.displayName = true
        this.nameHasError = true
        return
      } this.valid.displayName  = false
        this.nameHasError = false
    },

    async signUp() {
      if (!this.email.trim() && !this.password.trim() && !this.displayName.trim()) return
      try {
        await this.authStore.signUp({
        email: this.email,
        password: this.password,
        displayName: this.displayName
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
.container-signup {
  margin: 0 auto;
  padding: 0 40px;
  max-width: 1280px;
  .sign-up-area {
  margin: 0 auto;
  padding: 60px 0 160px;
  width: 400px;
  .sign-up-title {
    padding-bottom: 42px;
    font-size: 32px;
    font-weight: 600;
    color: $color-black;
    margin: 0 auto;
    justify-content: center;
    display: flex;
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
  .sign-up-box {
    padding-top: 20px;
    .sign-up-btn {
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
// Error
  .input-error {
    line-height: 16px;
    font-size: 11px;
    color: #f15746;
  }
  .title-danger {
    color: #f15746;
  }
  .input-danger {
    border-bottom: 1px solid #f15746 !important;
  }
}
}

</style>
