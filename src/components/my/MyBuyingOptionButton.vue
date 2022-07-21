<template>
  <div class="tab_item">
    <div
      v-for="nav, index in navigations"
      :key="nav.title"
      :ref="`tab_${index}`"
      class="tab_box"
      @click="filterList(nav.value);">
      <span class="count">{{ nav.count }}</span>
      <h5 class="title">
        {{ nav.title }}
      </h5>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'

export default {
  data() {
    return {
      navigations: [
        { title: '전체', value: 'All', count: 0 },
        { title: '확정 대기', value: 'wait', count: 0 },
        { title: '구매 확정', value: 'done', count: 0 },
        { title: '구매 취소', value: 'canceled', count: 0 }
      ]
    }
  },
  computed: {
    ...mapStores(useUserStore)
  },
  async created() {
    const res = await this.userStore.readTransactionList()
    this.navigations[0].count = res.length
    res.forEach(list => {
      if (list.done == false && list.isCanceled == false) {
          this.navigations[1].count += 1
        } else if (list.done == true && list.isCanceled == false) {
          this.navigations[2].count += 1
        } else if (list.isCanceled == true) {
          this.navigations[3].count += 1
        }
    })
  },
  methods: {
    filterList(value) {
      this.userStore.transactionFilter = value
    },
    info(event) {
      // if (event == this.$refs.tab_0) {

      // }
      // console.log(this.$refs)
      console.log(event)
      console.log(this.$refs.tab_0)
      
    }
  }
}
</script>

<style lang="scss" scoped>
.tab_item {
  display: flex;
  width: 100%;
  justify-content: space-between;
  .tab_box {
    width: 25%;
    text-align: center;
    .count {
      font-size: 20px;
      color: #222;
    }
    .title {
      font-size: 13px;
      color: rgba(#222, .5);
    }
  }
}
</style>
