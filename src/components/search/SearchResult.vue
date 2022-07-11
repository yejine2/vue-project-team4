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
      <div class="filter_list">
        <div class="filter_box">
          <div class="filter_name">
            카테고리
          </div>
          <p class="all_category">
            모든 카테고리
          </p>
        </div>
        <i class="bi bi-plus-lg"></i>
      </div>
    </div>
    <div class="search_result">
      Little
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useSearchStore } from '~/store/search'

export default {
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
  width: 1200px;
  display: flex;
  position: relative;
  margin: 0 auto;
  padding: 0 40px 80px;
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
    .filter_list {
      display: flex;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid #ebebeb;
      .filter_box {
        .filter_name {
          position: relative;
          font-size: 13px;
          font-weight: 600;
        }
        .all_category {
          margin-top: 4px;
          font-size: 15px;
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
  }
}
</style>
