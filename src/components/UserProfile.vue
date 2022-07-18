<template>
  <div class="my_profile">
    <div class="content_title">
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
            @change="changeUserImg" />
          <button
            class="btn_modify"
            @click="$refs.addImg.click()">
            이미지 변경
          </button>
          <button
            class="btn_modify"
            @click="deleteUserImg">
            삭제
          </button>
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
  computed: {
    ...mapStores(useUserStore)
  },
  methods: {
    changeUserImg(event) {
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
    deleteUserImg() {
      this.userStore.editUserInfo({profileImgBase64})
    }
  }
}
</script>

<style lang="scss" scoped>
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
}
</style>
