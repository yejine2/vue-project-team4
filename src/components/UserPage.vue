<template>
  <h2>로그인 사용자만 볼 수 있는지 테스트</h2>
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '~/store/auth'

export default {
    computed: {
    ...mapStores(useAuthStore)
  },  
}
</script>
