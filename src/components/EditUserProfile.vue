<template>
  <h1>사용자 정보 수정 페이지</h1>
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
      editPassword: true
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
    }
  }
}
</script>

<style lang="scss">

</style>
