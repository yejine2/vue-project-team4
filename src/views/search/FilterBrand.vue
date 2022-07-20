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
      v-show="more"
      class="list">
      <div class="list_max">
        <ul class="filter_menu">
          <li
            v-for="brand in brands"
            :key="brand"
            class="brand_filter_one"
            @click="add_brand">
            <div class="brand_checkbox"></div>
            <p class="brand_name">
              {{ brand }}
            </p>
          </li>
        </ul>
      </div>
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
      minus_icon: true,
      brands: []
    }
  },
  computed: {
    ...mapStores(useSearchStore),
    brand_interaction() {return this.searchStore.brands.length}
  },
  watch: {
    // 브랜드 필터 <-> 결과 필터 단추 연동
    brand_interaction() {
      const brand_list = document.querySelectorAll('.brand_filter_one')
      const checkbox = document.querySelectorAll('.brand_checkbox')
      const brand_name = document.querySelectorAll('.brand_name')
      for(let i = 0; i < brand_name.length; i++) {
        if(brand_name[i].textContent === this.searchStore.brandInteract) {
          checkbox[i].classList.remove('checked')
          brand_list[i].classList.remove('bold')
        }
      }
      
    }
  },
  async created() {
    // store data brands는 결과 필터 데이터임 이것과 별개
    const brands_list = await this.searchStore.searchProducts()
      for(let i = 0; i < brands_list.length; i++) {
        this.brands.push(brands_list[i].tags[1]) // 제품 태그는 0: 카테고리, 1: 브랜드이다.
      }
  },
  methods: {
    async add_brand(e) {
      const brand_list = document.querySelectorAll('.brand_filter_one')
      const checkbox = document.querySelectorAll('.brand_checkbox')
      const brand_name = document.querySelectorAll('.brand_name')
      
      for(let i = 0; i < brand_list.length; i++) {
        const classes = checkbox[i].classList
        if(e.currentTarget === brand_list[i]) {
          if(classes.contains('checked')) {
            checkbox[i].classList.remove('checked')
            brand_list[i].classList.remove('bold')
            const brand_number = this.searchStore.brands.findIndex( item => item === brand_name[i].textContent)
            const tag_number = this.searchStore.searchTags.findIndex( item => item === brand_name.item(i).textContent)
            this.searchStore.brands.splice(brand_number, 1)
            this.searchStore.searchTags.splice(tag_number, 1)
            await this.searchStore.searchProducts()
          } else {
            checkbox[i].classList.add('checked')
            brand_list[i].classList.add('bold')
            this.searchStore.brands.push(brand_name[i].textContent)
            this.searchStore.searchTags.push(brand_name[i].textContent)
            await this.searchStore.searchProducts()
          }
        }
      }
    }
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
    .filter_menu {
      font-size: 14px;
      .brand_filter_one {
        display: flex;
        align-items: center;
        padding-top: 10px;
        cursor: pointer;
        .brand_checkbox {
          width: 16px;
          height: 17px;
          margin-right: 8px;
          border: 1px solid rgba(34,34,34,.3);;
          cursor: pointer;
        }
        .checked {
          background: url('src/assets/search/checkbox.png') no-repeat;
          background-position: center;
          background-size: 22px;
        }
      }
      .bold {
        font-weight: 600;
      }
    }
  }
}
}
</style>
