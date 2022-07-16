<template>
  <div class="box">
    <div class="search_filter">
      <div class="filter_title">
        <strong class="title">필터</strong>
        <p class="filter_number">
          {{ filter_number }}
        </p>
        <p class="filter_delete">
          모두 삭제
        </p>
      </div>
      <FilterCategory />
      <FilterBrand />
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useSearchStore } from '~/store/search'
import FilterCategory from '~/views/search/FilterCategory.vue'
import FilterBrand from '~/views/search/FilterBrand.vue'

export default {
  components: {
    FilterCategory,
    FilterBrand
  },
  data() {
    return {
      filter_number: 1
    }
  },
  computed: {
    ...mapStores(useSearchStore)
  }
}
</script>

<style scoped lang="scss">
.box {
  
  .search_filter {
    width: 210px;
    margin-right: 10px;
    padding-right: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    .filter_title {
      display: flex;
      align-items: center;
      padding: 23px 0 15px;
      .title {
        font-size: 14px;
        font-weight: 600;
      }
      .filter_number {
        background-color: #222;
        width: 20px;
        height: 18px;
        margin-left: 4px;
        border-radius: 30px;
        color: #fff;
        font-size: 11px;
        font-weight: 700;
        line-height: 19px;
        text-align: center;
      }
      .filter_delete {
        margin-left: auto;
        font-size: 13px;
        color: rgba(34,34,34,.5);
      }
    }
    
  }
}
</style>
