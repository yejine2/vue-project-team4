<template>
  <div class="tab_item">
    <div
      ref="tab_0"
      class="tab_all selected"
      @click="filterList('all'); select($refs.tab_0); showEl($refs.isAll)">
      <span
        ref="isAll"
        class="count all">{{ userStore.isAll }}</span>
      <h5 class="title">
        전체
      </h5>
    </div>
    <div
      ref="tab_1"
      class="tab_wait"
      @click="filterList('wait'); select($refs.tab_1); showEl($refs.isWait)">
      <span
        ref="isWait"
        class="count wait">{{ userStore.isWait }}</span>
      <h5 class="title">
        확정 대기
      </h5>
    </div>
    <div
      ref="tab_2"
      class="tab_done"
      @click="filterList('done'); select($refs.tab_2); showEl($refs.isDone)">
      <span 
        ref="isDone"
        class="count done">{{ userStore.isDone }}</span>
      <h5 class="title">
        구매 확정
      </h5>
    </div>
    <div
      ref="tab_3"
      class="tab_cancel"
      @click="filterList('canceled'); select($refs.tab_3); showEl($refs.isCanceled)">
      <span
        ref="isCanceled"
        class="count cancel">{{ userStore.isCanceled }}</span>
      <h5 class="title">
        구매 취소
      </h5>
    </div>
  </div>
  
  <div
    class="purchase_goods">
    <ul>
      <li
        :style="{display : noContent }">
        거내 내역이 없습니다.
      </li>
      <li
        :style="{display : noDone }">
        구매 확정 내용이 없습니다.
      </li>
      <li
        :style="{display : noCancel }">
        구매 취소 내용이 없습니다.
      </li>
    </ul>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'

export default {
  data() {
    return {
      selected: false,
      noContent: 'none',
      noDone: 'none',
      noCancel: 'none'
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
    },
    showEl(e) {
      if (e.classList[1] == 'done' && this.userStore.isDone == 0) {
        this.noContent = 'none'
        this.noDone = ''
        this.noCancel = 'none'
      } else if (e.classList[1] == 'all' && this.userStore.isAll == 0) {
        this.noContent = ''
        this.noDone = 'none'
        this.noCancel = 'none'
      } else if (e.classList[1] == 'cancel' && this.userStore.isCanceled == 0) {
        this.noContent = 'none'
        this.noDone = 'none'
        this.noCancel = ''
      } else {
        this.noContent = 'none'
        this.noDone = 'none'
        this.noCancel = 'none'
      }
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
.purchase_goods {
    ul {
      background-color: #fafafa;
      li {
        padding: 250px 0;
        text-align: center;
      }
    }
  }
</style>
