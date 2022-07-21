<template>
  <RouterView />
  <template v-if="$route.path == '/my/buying'">
    <div class="my_purchase">
      <div class="content_title">
        <div class="title">
          <h3>구매 내역</h3>
        </div>
      </div>
      <div class="purchase_list_tab">
        <MyBuyingOptionButton />
      </div>
      <div class="purchase_head"></div>
      <div class="purchase_body">
      </div>
      <ul>
        <MyBuyingItem
          v-for="list in filteredList" 
          :key="list.detailId"
          :list="list" />
      </ul>
    </div>
  </template>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'
import MyBuyingOptionButton from '~/components/my/MyBuyingOptionButton.vue'
import MyBuyingItem from '~/components/my/MyBuyingItem.vue'

export default {
  components: {
    MyBuyingOptionButton,
    MyBuyingItem
  },
  computed: {
    ...mapStores(useUserStore),
    filteredList() {
      return this.userStore.filteredList()
    }
  },
  created() {
    this.userStore.readTransactionList()
  },
  methods: {
    filterList(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.my_purchase {
  .content_title {
    padding: 5px 0 6px;
    .title {
      font-size: 24px;
      font-weight: 700;
    }
  }
  .purchase_list_tab {
    margin-top: 20px;
    background-color: #fff;
  }
  ul {
    margin-top: 20px;
  }
}
</style>
