<template>
  <section>
    <div
      class="filter_list">
      <div class="filter_box">
        <div class="filter_name">
          가격
        </div>
        <p
          v-if="hide"
          class="all_category">
          모든 가격
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
        <ul>
          <li
            class="price_filter_one"
            @click="list_btn.a = !list_btn.a, filter_price($event, list_btn.a)">
            <div class="price_checkbox"></div>
            <p class="price">
              10만원 이하
            </p>
          </li>
          <li
            class="price_filter_one"
            @click="list_btn.b = !list_btn.b, filter_price($event, list_btn.b)">
            <div class="price_checkbox"></div>
            <p class="price">
              10만원 - 30만원 이하
            </p>
          </li>
          <li
            class="price_filter_one"
            @click="list_btn.c = !list_btn.c, filter_price($event, list_btn.c)">
            <div class="price_checkbox"></div>
            <p class="price">
              30만원 - 50만원 이하
            </p>
          </li>
          <li
            class="price_filter_one"
            @click="list_btn.d = !list_btn.d, filter_price($event, list_btn.d)">
            <div class="price_checkbox"></div>
            <p class="price">
              50만원 이상
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
      list_btn: {
        a: false,
        b: false,
        c: false,
        d: false
      }
    }
  },
  computed: {
    ...mapStores(useSearchStore),
    price_interaction() {return this.searchStore.priceInteract}
  },
  watch: {
    // 검색결과 필터 단추 <-> 필터 가격 연동
    price_interaction() {
      const checkbox = document.querySelectorAll('.price_checkbox')
      const price = document.querySelectorAll('.price')
      for(let i = 0; i < price.length; i++) {
        if(price[i].textContent === this.searchStore.priceInteract) {
          checkbox[i].classList.remove('checked')
          price[i].classList.remove('bold')
        }
      }
    }
  },
  methods: {
    async filter_price(e, boolean) {
      const price_list = document.querySelectorAll('.price_filter_one')
      const checkbox = document.querySelectorAll('.price_checkbox')
      const price = document.querySelectorAll('.price')

      for(let i = 0; i < price_list.length; i++) {
        if(e.currentTarget === price_list[i]) {
          if(boolean) {
            checkbox[i].classList.add('checked')
            price[i].classList.add('bold')
            this.searchStore.price = price[i].textContent
            if(i === 0) {
              await this.searchStore.searchProducts()
              const result = this.searchStore.results.filter( item => {
                return item.price <= 100000
              })
              this.searchStore.results = result
            }
            if(i === 1) {
              await this.searchStore.searchProducts()
              const result = this.searchStore.results.filter( item => {
                return 100000 < item.price && item.price <= 300000
              })
              this.searchStore.results = result
            }
            if(i === 2) {
              await this.searchStore.searchProducts()
              const result = this.searchStore.results.filter( item => {
                return 300000 < item.price && item.price < 500000
              })
              this.searchStore.results = result
            }
            if(i === 3) {
              await this.searchStore.searchProducts()
              const result = this.searchStore.results.filter( item => {
                return 500000 < item.price
              })
              this.searchStore.results = result
            }
          } else {
            checkbox[i].classList.remove('checked')
            price[i].classList.remove('bold') 
            this.searchStore.price = ''
            await this.searchStore.searchProducts()
          }
        }
        else if(e.currentTarget !== price_list[i]) {
          checkbox[i].classList.remove('checked')
          price[i].classList.remove('bold')
          if(i === 0) {
            this.list_btn.a = false
          } else if(i === 1) {
            this.list_btn.b = false
          } else if (i === 2) {
            this.list_btn.c = false
          } else if(i === 3) {
            this.list_btn.d = false
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
    .price_filter_one {
      display: flex;
      align-items: center;
      padding-top: 10px;
      font-size: 14px;
      cursor: pointer;
      .price_checkbox {
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
      .bold {
        font-weight: 600;
      }
    }
  }
}
}
</style>
