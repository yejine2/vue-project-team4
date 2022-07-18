<template>
  <div class="unit unit_email">
    <h5 class="title">
      이메일 주소
    </h5>
    <p class="email">
      {{ userEmailMasking }}
    </p>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'

export default {
  computed: {
    ...mapStores(useUserStore),
    userEmailMasking(){
      return this.userStore.userEmailMasking(this.userStore.user.email)
    }
  }
}
</script>

<style lang="scss" scoped>
.unit {
  position: relative;
  padding: 25px 60px 18px 0;
  border-bottom: 1px solid #ebebeb;
  color: rgba(34, 34, 34, .5);
  .title {
    font-size: 13px;
    font-weight: 700;
    color: rgba(34, 34, 34, .5);
  }
  .email {
    padding-top: 6px;
    font-size: 16px;
  }
}
</style>
