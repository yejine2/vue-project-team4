<template>
  <div
    v-show="!editMode"
    class="unit_password">
    <h5 class="title">
      비밀번호
    </h5>
    <p class="password">
      ●●●●●●●●●
    </p>
    <button
      class="btn_modify"
      @click="onEditMode">
      변경
    </button>
  </div>
  <div
    v-show="editMode"
    class="modify_password">
    <h5 class="title">
      비밀번호 변경
    </h5>
    <div
      class="input_box"
      :class="{ 'has_error': oldPasswordHasError }">
      <h6 class="input_title">
        이전 비밀번호
      </h6>
      <div class="input_item">
        <input
          ref="passwordInput"
          v-model="oldPassword"
          class="input_txt"
          placeholder="영문, 숫자, 특수문자 조합 8-16자"
          type="password" />
        <p
          v-show="valid.oldPassword"
          class="input-error">
          영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-16자)
        </p>
      </div>
    </div>
    <div
      class="input_box"
      :class="{ 'has_error': newPasswordHasError }">
      <h6 class="input_title">
        새 비밀번호
      </h6>
      <div
        class="input_item">
        <input
          v-model="newPassword"
          class="input_txt"
          placeholder="영문, 숫자, 특수문자 조합 8-16자"
          type="password" 
          @keydown.enter="editUserPassword(); offEditMode()" />
        <p
          v-show="valid.newPassword"
          class="input-error">
          영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-16자)
        </p>
      </div>
    </div>
    <div class="modify_btn_box">
      <button @click="offEditMode">
        취소
      </button>
      <button @click="editUserPassword(), offEditMode()">
        저장
      </button>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'

export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      editMode: false,
      valid: {
        oldPassword: false,
        newPassword: false,
      },
      oldPasswordHasError: false,
      newPasswordHasError: false
    }
  },
  computed: {
    ...mapStores(useUserStore)
  },
  watch: {
    'oldPassword': function() {
      this.checkoldPassword()
    },
    'newPassword': function() {
      this.checknewPassword()
    },
  },
  methods: {
    async onEditMode() {
      this.editMode = true
      await this.$nextTick()
      this.$refs.passwordInput.focus()
    },
    async offEditMode() {
      this.oldPassword = ''
      this.newPassword = ''
      await this.$nextTick()
      this.oldPasswordHasError = false
      this.newPasswordHasError = false
      this.valid.oldPassword = false
      this.valid.newPassword = false
      this.editMode = false
    },
    async editUserPassword() {
      await this.userStore.editUserInfo({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      })
      this.oldPassword = ''
      this.newPassword = ''
    },
    checkoldPassword() {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      const validatePassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/

      if (!validatePassword.test(this.oldPassword) || !this.oldPassword) {
        
        this.valid.oldPassword = true
        this.oldPasswordHasError = true
        return
      } this.valid.oldPassword = false
        this.oldPasswordHasError = false
        return
    },
    checknewPassword() {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      const validatePassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/

        if (!validatePassword.test(this.newPassword) || !this.newPassword) {
        this.valid.newPassword = true
        this.newPasswordHasError = true
        return
      } this.valid.newPassword = false
        this.newPasswordHasError = false
    }
  }
}
</script>

<style lang="scss" scoped>
.title, .input_title {
  font-size: 13px;
  font-weight: 700;
}
.unit_password {
  position: relative;
  padding: 25px 60px 18px 0;
  border-bottom: 1px solid #ebebeb;
  .title {
    color: rgba(34, 34, 34, .5)
  }
  .password {
    padding-top: 6px;
    font-size: 14px;
    color: #222;
  }
  .btn_modify {
    position: absolute;
    right: 0;
    bottom: 15px;
  }
}
.modify_password {
  padding-top: 25px;
  .title {
    padding-bottom: 22px;
    color: #222
  }
  .password {
    padding-top: 6px;
    font-size: 16px;
  }
  .input_box {
    padding: 10px 0 14px;
    &.has_error {
      color: $color-error;
      .input_item {
        .input_txt {
          border-color: $color-error;
          &:focus {
            border-bottom: 1px solid $color-error;
          }
        }
        .input-error {
          display: block;
          position: absolute;
          line-height: 16px;
          font-size: 11px;
          color: $color-error;
        }
      }
    }
    .input_title {
      line-height: 18px;
    }
    .input_item {
      .input_txt {
        padding: 7px 0;
        width: 100%;
        height: 37px;
        font-size: 15px;
        line-height: 22px;
        border: 0;
        outline: 0;
        border-bottom: 1px solid #ebebeb;
        box-sizing: border-box;
        &::placeholder {
          color: #bcbcbc
        }
        &:focus {
          border-bottom: 2px solid #333;
          &::placeholder {
            color: transparent;
          }
        }
      }
    }
  }
  .modify_btn_box {
    padding-top: 28px;
    text-align: center;
    
    button {
      padding: 0 38px;
      height: 42px;
      font-size: 14px;
      line-height: 40px;
      border: 1px solid #d3d3d3;
      border-radius: 12px;
      color: rgba(34, 34, 34, .8);
      cursor: pointer;
      &:nth-child(2) {
        margin-left: 8px;
      }
    }
  }
}
</style>
