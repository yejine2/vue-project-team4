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
      <div class="list_max">
        <ul class="filter_menu">
          <li
            v-for="brand in brands"
            :key="brand"
            class="filter_one"
            @click="add_brand">
            <div class="checkbox"></div>
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
    ...mapStores(useSearchStore)
  },
  created() {
    this.req_brands()
  },
  methods: {
    async req_brands() {
      const data = await this.searchStore.searchProducts()
      for(let i = 0; i < data.length; i++) {
        this.brands.push(data[i].tags[1]) // 제품 태그는 0: 카테고리, 1: 브랜드이다.
      }
    },
    add_brand(e) {
      const brand_list = document.querySelectorAll('.filter_one')
      const checkbox = document.querySelectorAll('.checkbox')
      const brand_name = document.querySelectorAll('.brand_name')
      // const classes = checkbox.classList
      
      for(let i = 0; i < brand_list.length; i++) {
        const classes = checkbox[i].classList
        if(e.currentTarget === brand_list[i]) {
          if(classes.contains('checked')) {
            checkbox[i].classList.remove('checked')
            const brand_number = this.searchStore.brand.findIndex( item => item === brand_name[i].textContent)
            const tag_number = this.searchStore.searchTags.findIndex( item => item === brand_name.item(i).textContent)
            this.searchStore.brand.splice(brand_number, 1)
            this.searchStore.searchTags.splice(tag_number, 1)
            console.log(this.searchStore.searchTags)
          } else {
            checkbox[i].classList.add('checked')
            this.searchStore.brand.push(brand_name[i].textContent)
            this.searchStore.searchTags.push(brand_name[i].textContent)
            console.log(this.searchStore.searchTags)
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
      .filter_one {
        display: flex;
        align-items: center;
        padding-top: 10px;
        cursor: pointer;
        .checkbox {
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
    }
  }
}
}
</style>
