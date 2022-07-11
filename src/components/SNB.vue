<template>
  <RouterLink to="/my">
    <h2>사이드 네비 바</h2>
  </RouterLink>
  <nav>
    <ul class="snb_list">
      <RouterLink
        v-for="nav in navigations"
        :key="nav.path"
        :to="nav.path">
        <li>
          {{ nav.name }}
        </li>
      </RouterLink>
    </ul>
  </nav>
</template>

<script>

export default {
  data() {
    return {
      navigations: [
        { path: '/my/profile', name: '프로필 수정' },
        { path: '/my/account', name: '계좌 관리' }
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
