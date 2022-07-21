<template>
  <div class="content_area">
    <UserProfileImg />
    <div class="profile_info">
      <div class="profile_group">
        <h4 class="group_title">
          로그인 정보
        </h4>
        <UserProfileName />
        <UserProfileEmail />
        <UserProfilePassword />
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileImg from '~/components/my/MyProfileImg.vue'
import UserProfileName from '~/components/my/MyProfileName.vue'
import UserProfileEmail from '~/components/my/MyProfileEmail.vue'
import UserProfilePassword from '~/components/my/MyProfilePassword.vue'

export default {
  components: {
    UserProfileImg,
    UserProfileName,
    UserProfileEmail,
    UserProfilePassword
  }
}

</script>

<style lang="scss" scoped>
.content_area {
  .profile_info {
    padding-top: 38px;
    max-width: 480px;
    .group_title {
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
