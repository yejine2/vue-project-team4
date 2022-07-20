<template>
  <div class="box">
    <div class="search_filter">
      <div class="filter_title">
        <strong class="title">필터</strong>
        <p
          v-if="tag_num"
          class="filter_number">
          {{ searchStore.searchTags.length }}
        </p>
        <p
          class="filter_delete"
          @click="delete_tag">
          모두 삭제
        </p>
      </div>
      <FilterCategory />
      <FilterBrand />
      <FilterPrice />
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useSearchStore } from '~/store/search'
import FilterCategory from '~/views/search/FilterCategory.vue'
import FilterBrand from '~/views/search/FilterBrand.vue'
import FilterPrice from '~/views/search/FilterPrice.vue'

export default {
  components: {
    FilterCategory,
    FilterBrand,
    FilterPrice
  },
  data() {
    return {
      tag_num: false
    }
  },
  computed: {
    ...mapStores(useSearchStore),
    tags() {
      return this.searchStore.searchTags.length
    }
  },
  watch: {
    tags() {
      if(this.searchStore.searchTags.length > 0) {
        this.tag_num = true
      } else {
        this.tag_num = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  
  .search_filter {
    width: 200px;
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
        text-decoration: line-through;
      }
    }
    
  }
}
</style>
