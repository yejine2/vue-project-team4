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
              @change="selectFile" />
            <button @click="$refs.addImg.click()">
              이미지 변경
            </button>
            <button @click="selectFile">
              이미지 삭제
            </button>
          </div>
        </div>
      </div>
      <div class="profile_info">
        <div class="profile_group">
          <h4>사용자 정보</h4>
          <template v-if="editName">
            <div class="unit_name show">
              <h5 class="title">
                이름
              </h5>
              <p class="desc">
                {{ userStore.user.displayName }}
              </p>
              <button
                ref="editname"
                class="btn btn_modify"
                @click="editName = !editName">
                변경
              </button>
            </div>
          </template>
          <template v-else>
            <div class="modify_name">
              <h5 class="title">
                이름
              </h5>
              <div class="input_box">
                <h6 class="input_title">
                  새로운 이름
                </h6>
                <div class="input_item">
                  <input
                    v-model="displayName"
                    type="text"
                    placeholder="고객님의 이름" 
                    @keydown.enter="editUserName(displayName)" />
                </div>
              </div>
              <div class="modify_btn_box">
                <button @click="editName = !editName">
                  취소
                </button>
                <button @click="editUserName(displayName), editName = !editName">
                  저장
                </button>
              </div>
            </div>
          </template>
          <div class="unit_email">
            <h5 class="title">
              이메일 주소
            </h5>
            <p class="email">
              {{ userEmailMasking }}
            </p>
          </div>
          <template v-if="editPassword">
            <div class="unit_password">
              <h5 class="title">
                비밀번호
              </h5>
              <p class="password">
                ●●●●●●●●●
              </p>
              <button
                class="btn btn_modify"
                @click="editPassword = !editPassword">
                변경
              </button>
            </div>
          </template>
          <template v-else>
            <div class="modify_password">
              <h5 class="title">
                비밀번호 변경
              </h5>
              <div class="input_box">
                <h6 class="input_title">
                  이전 비밀번호
                </h6>
                <div class="input_item">
                  <input
                    v-model="oldPassword"
                    type="password" />
                </div>
              </div>
              <div class="input_box">
                <h6 class="input_title">
                  새 비밀번호
                </h6>
                <div class="input_item">
                  <input
                    v-model="newPassword"
                    type="password" />
                </div>
              </div>
              <div class="modify_btn_box">
                <button @click="editPassword = !editPassword">
                  취소
                </button>
                <button @click="editUserPassword(oldPassword, newPassword), editPassword = !editPassword">
                  저장
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
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
      oldPassword: '',
      newPassword: '',
      editName: true,
      editPassword: true,
      profileImg: false
    }
  },
  computed: {
    ...mapStores(useUserStore),
    userEmailMasking(){
      return this.userStore.userEmailMasking(this.userStore.user.email)
    }
  },
  methods: {
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
    selectFile(event) {
      // console.log('xxxxx',event.target.files)
      let profileImgBase64 = null
      if (event.target.files) {
        const reader = new FileReader()
        for (const file of event.target.files){
          // console.log(file)
          reader.readAsDataURL(file)
          reader.addEventListener('load', e => {
            // console.log('이미지 추가::',e.target.result)  // base64
            profileImgBase64 = e.target.result.split(',')[1]
            this.userStore.editUserInfo({profileImgBase64})
            this.$refs.addImg.value = ''
          })
        }
      } else {
        
        this.userStore.editUserInfo({profileImgBase64})
      }
      
    }
  }  
}

</script>

<style lang="scss">
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
        line-height: 32px;
        color: #000;
      }
      .profile_btn_box {
        margin-top: 8px;
        .hidden {
          display: none;
        }

      }
    }
  }
}
</style>
