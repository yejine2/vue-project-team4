<template>
  <div class="my_purchase">
    <div class="content_title">
      <div class="title">
        <h3>구매 내역</h3>
      </div>
    </div>
    <div class="purchase_list_tab">
      <div class="tab_item">
        <div
          v-for="nav in navigations"
          :key="nav.title"
          class="tab_box">
          <span class="count">0</span>
          <h5 class="title">
            {{ nav.title }}
          </h5>
        </div>
      </div>
    </div>
    <div class="purchase_head"></div>
    <div class="purchase_body">
    </div>
    <button @click="getBoughtList">
      구매내역
    </button>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'

export default {
  data() {
    return {
      navigations: [
        { title: '전체' },
        { title: '확정 대기' },
        { title: '구매 확정' }
      ]
    }
  },
  computed: {
    ...mapStores(useUserStore)
  },
  methods: {
    getBoughtList() {
      this.userStore.getBoughtList()
    }
  }
}
</script>
