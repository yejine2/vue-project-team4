<template>
  <div class="container">
    <AdminNav />
    <BarChart />
  </div>
</template>

<script>
import AdminNav from '~/components/product/AdminNav.vue'
import BarChart from '~/components/product/BarChart.vue'

export default {
  components: {
    AdminNav,
    BarChart
  }
}
</script>

<style lang="scss" scoped>
</style>
