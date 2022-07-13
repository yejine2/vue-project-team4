<template>
  <div class="content_area">
    <div class="my_profile">
      <div class="content_title border">
        <div class="title">
          <h3>프로필 정보</h3>
        </div>
      </div>
      <div class="user_profile">
        <div class="profile_thumb">
          <img
            :src="userStore.user.profileImg"
            alt="사용자 이미지" />
        </div>
        <div class="profile_detail">
          <strong class="name">
            {{ userStore.user.displayName }}
          </strong>
          <div class="profile_btn_box">
            <input
              id="profile_img"
              ref="addImg"
              class="hidden"
              type="file"
              @change="changeProfileImg" />
            <button
              class="btn_modify"
              @click="$refs.addImg.click()">
              이미지 변경
            </button>
            <button
              class="btn_modify"
              @click="deleteProfileImg">
              삭제
            </button>
          </div>
        </div>
      </div>
      <div class="profile_info">
        <div class="profile_group">
          <h4 class="group_title">
            로그인 정보
          </h4>

          <div
            v-show="!editName"
            class="unit unit_name">
            <h5 class="title">
              이름
            </h5>
            <p class="desc">
              {{ userStore.user.displayName }}
            </p>
            <button
              ref="editname"
              class="btn btn_modify"
              @click="onEditMode('name')">
              변경
            </button>
          </div>
          <div
            v-show="editName"
            class="modify_name">
            <h5 class="title">
              이름
            </h5>
            <div
              class="input_box"
              :class="{ 'has_error': nameHasError }">
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
                  @keydown.enter="editUserName(displayName); offEditMode('name')" />
                <p
                  v-show="valid.name"
                  class="input-error">
                  올바른 이름을 입력해주세요. (2-50자)
                </p>
              </div>
            </div>
            <div class="modify_btn_box">
              <button @click="offEditMode('name')">
                취소
              </button>
              <button @click="editUserName(displayName); offEditMode('name')">
                저장
              </button>
            </div>
          </div>
          <div class="unit unit_email">
            <h5 class="title">
              이메일 주소
            </h5>
            <p class="email">
              {{ userEmailMasking }}
            </p>
          </div>
          <div
            v-show="!editPassword"
            class="unit unit_password">
            <h5 class="title">
              비밀번호
            </h5>
            <p class="password">
              ●●●●●●●●●
            </p>
            <button
              class="btn btn_modify"
              @click="onEditMode('password')">
              변경
            </button>
          </div>
          <div
            v-show="editPassword"
            class="modify_password">
            <h5 class="title">
              비밀번호 변경
            </h5>
            <div
              class="input_box"
              :class="{ 'has_error': oldpasswordHasError }">
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
                  v-show="valid.oldpassword"
                  class="input-error">
                  영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-16자)
                </p>
              </div>
            </div>
            <div
              class="input_box"
              :class="{ 'has_error': newpasswordHasError }">
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
                  @keydown.enter="editUserPassword(oldPassword, newPassword), offEditMode('password')" />
                <p
                  v-show="valid.newpassword"
                  class="input-error">
                  영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-16자)
                </p>
              </div>
            </div>
            <div class="modify_btn_box">
              <button @click="offEditMode('password')">
                취소
              </button>
              <button @click="editUserPassword(oldPassword, newPassword), offEditMode('password')">
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'
import { profileImgBase64 } from '~/store/userDefaultImg'

export default {
  data() {
    return {
      displayName: '',
      oldPassword: '',
      newPassword: '',
      editName: false,
      editPassword: false,
      profileImg: false,
      valid: {
        name: false,
        oldpassword: false,
        newpassword: false,
      },
      nameHasError: false,
      oldpasswordHasError: false,
      newpasswordHasError: false
    }
  },
  computed: {
    ...mapStores(useUserStore),
    userEmailMasking(){
      return this.userStore.userEmailMasking(this.userStore.user.email)
    }
  },
  watch: {
    'displayName': function() {
      this.checkName()
    },
    'oldPassword': function() {
      this.checkoldPassword()
    },
    'newPassword': function() {
      this.checknewPassword()
    },
  },
  methods: {
    async onEditMode(value) {
      if (value == 'name') {
      this.editName = true
      await this.$nextTick()
      this.$refs.nameInput.focus()
      } else if (value == 'password') {
        this.editPassword = true
        await this.$nextTick()
        this.$refs.passwordInput.focus()
      }
    },
    async offEditMode(value) {
      if (value == 'name') {
        this.displayName = ''
        await this.$nextTick()
        this.nameHasError = false
        this.valid.name = false
        this.editName = false
      } else if (value == 'password') {
        this.oldPassword = ''
        this.newPassword = ''
        await this.$nextTick()
        this.oldpasswordHasError = false
        this.newpasswordHasError = false
        this.valid.oldpassword = false
        this.valid.newpassword = false
        this.editPassword = false
        console.log(123)
      }
    },
    async editUserName(displayName) {
      await this.userStore.editUserInfo({displayName})
      this.displayName = ''
    },
    inputName(event) {
      // console.log(event)
      this.displayName = event.target.value
    },
    async editUserPassword(oldPassword, newPassword) {
      console.log(oldPassword,' / ', newPassword)
      await this.userStore.editUserInfo({
        oldPassword,
        newPassword
      })
      this.oldPassword = ''
      this.newPassword = ''
    },
    changeProfileImg(event) {
      // console.log('xxxxx',event)
      if (event.target.files) {
        const reader = new FileReader()
        for (const file of event.target.files){
          // console.log('file::', file)
          reader.readAsDataURL(file)
          reader.addEventListener('load', e => {
            // console.log('이미지 추가::',e.target.result)  // base64
            const profileImgBase64 = e.target.result.split(',')[1]
            this.userStore.editUserInfo({profileImgBase64})
            this.$refs.addImg.value = ''
          })
        }
      }
    },
    deleteProfileImg() {
      this.userStore.editUserInfo({profileImgBase64})
    },
    checkName() {
      // 이름 형식 검사
      const validateName = /^(?=.*[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9!@#$%^&*()._-])[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9!@#$%^&*()._-]{2,50}$/
      console.log('valid.name:', this.valid.name)
      console.log('nameHasError:', this.nameHasError)
      if (!validateName.test(this.displayName) || !this.displayName) {
        this.valid.name = true
        this.nameHasError = true
        return
      } this.valid.name = false
        this.nameHasError = false
    },
    checkoldPassword() {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      const validatePassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/

      if (!validatePassword.test(this.oldPassword) || !this.oldPassword) {
        
        this.valid.oldpassword = true
        this.oldpasswordHasError = true
        return
      } this.valid.oldpassword = false
        this.oldpasswordHasError = false
        return
    },
    checknewPassword() {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      const validatePassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/

        if (!validatePassword.test(this.newPassword) || !this.newPassword) {
        this.valid.newpassword = true
        this.newpasswordHasError = true
        return
      } this.valid.newpassword = false
        this.newpasswordHasError = false
    }
  }  
}

</script>

<style scoped lang="scss">
.my_profile {
  .content_title {
    padding-bottom: 16px;
    border-bottom: 3px solid #222;
    .title {
      font-size: 24px;
      font-weight: 700;
    }
  }
  .user_profile {
    display: flex;
    align-items: center;
    padding: 50px 0 38px;
    border-bottom: 1px solid #ebebeb;
    .profile_thumb {
      flex: none;
      margin-right: 18px;
      width: 100px;
      height: 100px;
      border-radius: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .profile_detail {
      .name {
        font-size: 24px;
        font-weight: 700;
        line-height: 32px;
        color: #000;
      }
      .profile_btn_box {
        margin-top: 8px;
        .hidden {
          display: none;
        }
        .btn_modify {
          margin-top: 0;
          &:last-child {
            margin-left: 8px;
          }
        }
      }
    }
  }
  .profile_info {
    padding-top: 38px;
    max-width: 480px;
    .group_title {
      font-size: 18px;
      font-weight: 700;
    }
    .unit {
      position: relative;
      padding: 25px 60px 18px 0;
      border-bottom: 1px solid #ebebeb;
      .btn_modify {
        position: absolute;
        right: 0;
        bottom: 15px;
    }
    .title {
      font-size: 13px;
      color: rgba(34, 34, 34, .5)
    }
    p {
      padding-top: 6px;
      font-size: 16px;
    }
    
    }
    .modify_name {
      padding-top: 25px;
      .title {
        font-size: 13px;
        font-weight: 700;
        padding-bottom: 22px;
        color: #222
      }
      .input_box {
        padding: 10px 0 14px;
        &.has_error {
          color: red;
          .input_item {
            .input_txt {
              border-color: red;
              &:focus {
                border-bottom: 1px solid #f00;
              }
            }
          }
        }
        .input-error {
          display: block;
          position: absolute;
          line-height: 16px;
          font-size: 11px;
          color: $color-error;
        }
        .input_title {
          font-size: 13px;
          font-weight: 700;
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
    .modify_password {
      padding-top: 25px;
      .title {
        font-size: 13px;
        font-weight: 700;
        padding-bottom: 22px;
        color: #222
      }
      .input_box {
        padding: 10px 0 14px;
        box-sizing: border-box;
        &.has_error {
          color: red;
        }
        .input-error {
          display: block;
          position: absolute;
          line-height: 16px;
          font-size: 11px;
          color: $color-error;
        }
        .input_title {
          font-size: 13px;
          font-weight: 700;
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
  }
}
</style>
