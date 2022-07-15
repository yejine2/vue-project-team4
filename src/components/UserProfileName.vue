<template>
  <div
    v-show="!editMode"
    class="unit unit_name">
    <h5 class="title">
      이름
    </h5>
    <p class="desc">
      {{ userStore.user.displayName }}
    </p>
    <button
      class="btn_modify"
      @click="onEditMode()">
      변경
    </button>
  </div>
  <div
    v-show="editMode"
    class="modify_name">
    <h5 class="title">
      이름
    </h5>
    <div
      class="input_box"
      :class="{ 'has_error': displayNameHasError }">
      <h6 class="input_title">
        새로운 이름
      </h6>
      <div class="input_item">
        <input
          ref="nameInput"
          v-model="displayName"
          type="text" 
          placeholder="고객님의 이름"
          autocomplete="off"
          class="input_txt"
          @input="displayName = $event.target.value"
          @keydown.enter="editUserName(); offEditMode()"
          @keydown.esc="offEditMode" />
        <p
          v-show="valid.displayName"
          class="input-error">
          올바른 이름을 입력해주세요. (2-50자)
        </p>
      </div>
    </div>
    <div class="modify_btn_box">
      <button @click="offEditMode">
        취소
      </button>
      <button
        :disabled="able"
        :class="{ disabled: able }"
        @click="editUserName(); offEditMode()">
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
      displayName: '',
      editMode: false,
      able: true,
      valid: {
        displayName: false
      },
      displayNameHasError: false
    }
  },
  computed: {
    ...mapStores(useUserStore),
    value() {
      // console.log(this.value.displayName)
      return console.log(this.displayNameHasError)
    }
  },
  watch: {
    'displayName': function() {
      this.checkName()
    }
  },
  methods: {
    async onEditMode() {
      this.editMode = true
      await this.$nextTick()
      this.$refs.nameInput.focus()
    },
    async offEditMode() {
        this.displayName = ''
        await this.$nextTick()
        this.displayNameHasError = false
        this.valid.displayName = false
        this.editMode = false
    },
    async editUserName() {
      await this.userStore.editUserInfo({
        displayName: this.displayName
      })
      this.displayName = ''
    },
    checkName() {
      // 이름 형식 검사
      const validateName = /^(?=.*[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9!@#$%^&*()._-])[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9!@#$%^&*()._-]{2,50}$/
      
      if (!validateName.test(this.displayName) || !this.displayName) {
        this.valid.displayName = true
        this.displayNameHasError = true
        this.able = true
        console.log('valid.name:', this.valid.displayName)
        console.log('nameHasError:', this.displayNameHasError)
        return
      } this.valid.displayName = false
        this.displayNameHasError = false
        this.able = false
        
        console.log('valid.name:', this.valid.displayName)
        console.log('nameHasError:', this.displayNameHasError)
    }
  }
}
</script>

<style lang="scss" scoped>
.title, .input_title {
  font-size: 13px;
  font-weight: 700;
}
.unit_name {
  position: relative;
  padding: 25px 60px 18px 0;
  border-bottom: 1px solid #ebebeb;
  .title {
    color: rgba(34, 34, 34, .5)
  }
  .desc {
    padding-top: 6px;
    font-size: 16px;
    color: #222;
  }
  .btn_modify {
    position: absolute;
    right: 0;
    bottom: 15px;
  }
}
  .modify_name {
    padding-top: 25px;
    .title {
      padding-bottom: 22px;
      color: #222
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
        background-color: #fff;
        cursor: pointer;
        &:nth-child(2) {
          font-weight: 700;
          margin-left: 8px;
          background-color: #222;
          color: #fff;
        }
        &:disabled {
          border: 0;
          background-color: #ebebeb;
          color: #fff;
          cursor: default;
        }
      }
    }
  }
</style>
