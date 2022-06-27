<template>
  <div class="container">
    <h1>Home!</h1>
  </div>
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
