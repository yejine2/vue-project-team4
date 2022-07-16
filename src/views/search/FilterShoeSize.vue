<template>
  <section>
    <div
      class="filter_list">
      <div class="filter_box">
        <div class="filter_name">
          브랜드
        </div>
        <p
          v-if="hide"
          class="all_category">
          모든 브랜드
        </p>
      </div>
      <i
        v-if="minus_icon"
        class="bi bi-plus-lg"
        @click="hide = !hide, more = !more, minus_icon = !minus_icon"></i>
      <i
        v-else
        class="bi bi-dash-lg"
        @click="hide = !hide, more = !more, minus_icon = !minus_icon"></i>
    </div>
    <!-- 카테고리 리스트 -->
    <div
      v-if="more"
      class="list">
      <div class="list_max"></div>
    </div>
  </section>
</template>

<script>
import { mapStores } from 'pinia'
import { useSearchStore } from '~/store/search'

export default {
  data() {
    return {
      hide: true,
      more: false,
      minus_icon: true
    }
  },
  computed: {
    ...mapStores(useSearchStore)
  }
}
</script>

<style scoped lang="scss">
section {
  border-bottom: 1px solid #ebebeb;
.filter_list {
  display: flex;
  align-items: center;
  padding: 16px 0;
    
  .filter_box {
    .filter_name {
      position: relative;
      font-size: 13px;
      font-weight: 500;
    }
    .all_category {
      margin-top: 8px;
      font-size: 15px;
      font-weight: 400;
      color: rgba(34,34,34,.5);
    }
  }
  .bi {
    width: 20px;
    height: 20px;
    margin-left: auto;
    color: rgba(34,34,34,.5);
  }
}
.list {
  padding-bottom: 24px;
  user-select: none;
  .list_max {
    max-height: 339px;
    overflow-y: scroll;
  }
}
}
</style>
