<template>
  <div class="tab_item">
    <div
      ref="tab_0"
      :class="{ selected: selected }"
      class="tab_all"
      @click="filterList('all'); select($refs.tab_0)">
      <span class="count">{{ userStore.isAll }}</span>
      <h5 class="title">
        전체
      </h5>
    </div>
    <div
      ref="tab_1"
      class="tab_wait"
      @click="filterList('wait'); select($refs.tab_1)">
      <span class="count">{{ userStore.isWait }}</span>
      <h5 class="title">
        확정 대기
      </h5>
    </div>
    <div
      ref="tab_2"
      class="tab_done"
      @click="filterList('done'); select($refs.tab_2)">
      <span class="count">{{ userStore.isDone }}</span>
      <h5 class="title">
        구매 확정
      </h5>
    </div>
    <div
      ref="tab_3"
      class="tab_cancel"
      @click="filterList('canceled'); select($refs.tab_3)">
      <span class="count">{{ userStore.isCanceled }}</span>
      <h5 class="title">
        구매 취소
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
      selected: false
    }
  },
  computed: {
    ...mapStores(useUserStore)
  },
  methods: {
    filterList(value) {
      this.userStore.transactionFilter = value
    },
    select(e) {
      this.$refs.tab_0.classList.remove('selected')
      this.$refs.tab_1.classList.remove('selected')
      this.$refs.tab_2.classList.remove('selected')
      this.$refs.tab_3.classList.remove('selected')
      e.classList.add('selected')
      
    }
  }
}
</script>

<style lang="scss" scoped>
.tab_item {
  display: flex;
  width: 100%;
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 68px;
    border-bottom: 1px solid #d3d3d3;
    cursor: pointer;
    &.selected {
      border-bottom: 2px solid #222;
      .count {
        color: #f15746;
      }
      .title {
        font-weight: 700;
        color: #222;
      }
    }
    .count {
      font-size: 20px;
      font-weight: 700;
      color: #222;
    }
    .title {
      margin-top: 5px;
      font-size: 13px;
      color: rgba(#222, .5);
    }
  }
}
</style>
