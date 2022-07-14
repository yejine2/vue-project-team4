<template>
  <section
    v-for="filter in filters"
    :key="filter.title"
    class="box">
    <div
      class="filter_list">
      <div class="filter_box">
        <div class="filter_name">
          {{ filter.title }}
        </div>
        <p
          v-if="false"
          class="all_category">
          모든 카테고리
        </p>
      </div>
      <i class="bi bi-plus-lg"></i>
    </div>
    <ul
      class="filter_menu">
      <li
        v-for="first in firsts"
        :key="first"
        class="filter_one">
        <div class="list_off">
          <input type="checkbox" />
          <p>{{ first }}</p>
        </div>
        <ul class="filter_two">
          <li
            v-for="second in seconds"
            :key="second"
            class="list_on">
            <input type="checkbox" />
            <p>{{ second }}</p>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapStores } from 'pinia'
import { useSearchStore } from '~/store/search'

export default {
  data() {
    return {
      filters: [
        {title: '카테고리'},
        {title: '브랜드'},
        {title: '성별'},
        {title: '컬렉션'},
        {title: '신발 사이즈'},
        {title: '의류 사이즈'},
        {title: '가격'}
      ],
      firsts: [
        '신발',
        '의류',
        '패션 잡화',
        '라이프',
        '테크'
      ],
      seconds: [
        [
        {one: '스니커즈'},
        {one: '샌들/슬리퍼'},
        {one: '로퍼/플랫'},
        {one: '부츠'}
        ],
      ]
    }
  },
  computed: {
    ...mapStores(useSearchStore)
  }
}
</script>

<style scoped lang="scss">
.box {
  border-bottom: 1px solid #ebebeb;
.filter_list {
  display: flex;
  align-items: center;
  padding: 16px 0;
    
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
.filter_menu {
  padding-bottom: 24px;
  .filter_one {
    
    padding-top: 10px;
    font-size: 14px;
    .list_off {
      display: flex;
      align-items: center;
    }
    .filter_two {
          padding: 16px 0 6px 25px;
      .list_on {
        display: flex;
        align-items: center;
        padding-top: 10px;
      }
    }
  }
  .filter_one:first-child {
    padding-top: 0;
  }
}
}
</style>
