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
.container {
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
  display: flex;
}

</style>
