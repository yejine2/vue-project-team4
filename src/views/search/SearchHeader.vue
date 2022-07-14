<template>
  <!-- HEADER -->
  <header>
    <div class="header__box">
      <div class="page_title">
        <!-- <h3 v-if="!search_bar">
            SHOP
          </h3> -->
        <!-- 검색바 들어갈 자리 -->
        <!-- 검색바가 나오면 page_title 패딩바텀 36px -->
        <div class="search_box">
          <input
            type="text"
            class="search"
            placeholder="브랜드명,모델명,모델번호 등"
            @input="search_text = $event.target.value"
            @keyup.enter.prevent="searchProduct" />
          <i
            class="bi bi-x-lg"
            @click="inputInit"></i>
        </div>
      </div>
      <div class="category">
        <div class="icon">
          <i class="bi bi-sliders"></i>
        </div>
        <router-link
          to="#"
          class="luxury btn_category"
          @click="category_btn(category_lux = !category_lux, $event)">
          <p class="name">
            럭셔리
          </p>
        </router-link>
        <span class="vir_bar"></span>
        <router-link
          to=""
          class="shoes btn_category"
          @click="category_btn(category.category_01 = !category.category_01, $event)">
          <p class="name">
            신발
          </p>
        </router-link>
        <router-link
          ref="cloth"
          to=""
          class="cloth btn_category"
          @click="category_btn(category.category_02 = !category.category_02, $event)">
          <p class="name">
            의류
          </p>
        </router-link>
        <router-link
          ref="acc"
          to=""
          class="acc btn_category"
          @click="category_btn(category.category_03 = !category.category_03, $event)">
          <p class="name">
            패션 잡화
          </p>
        </router-link>
        <router-link
          ref="life"
          to=""
          class="life btn_category"
          @click="category_btn(category.category_04 = !category.category_04, $event)">
          <p class="name">
            라이프
          </p>
        </router-link>
        <router-link
          ref="tech"
          to=""
          class="tech btn_category"
          @click="category_btn(category.category_05 = !category.category_05, $event)">
          <p class="name">
            테크
          </p>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapStores } from 'pinia'
import { useSearchStore } from '~/store/search'

export default {
  data() {
    return {
      search_text: '',
      category: {
        category_lux: false,
        category_01: false,
        category_02: false,
        category_03: false,
        category_04: false,
        category_05: false
      }
    }
  },
  computed: {
    ...mapStores(useSearchStore)
  },
  watch: {
    
  },
  methods: {
    searchProduct() {
      this.$emit('search_text', this.search_text)
      // console.log(this.search_text)
    },
    inputInit() {
      const search = document.querySelector('.search')
      search.value = null
    },
    async category_btn(category, event) {
      const $ref = {
        target: event.currentTarget,
        luxury: document.querySelector('.luxury'),
        shoes: document.querySelector('.shoes'),
        cloth: document.querySelector('.cloth'),
        acc: document.querySelector('.acc'),
        life: document.querySelector('.life'),
        tech: document.querySelector('.tech')
      }
      const cate = [$ref.shoes, $ref.cloth, $ref.acc, $ref.life, $ref.tech]
      const cate_name = ['신발', '의류', '패션잡화', '라이프', '테크']

      function btn_on(payload) {
        payload.style.backgroundColor = '#fef7f6'
        payload.style.color = '#f15746'
        payload.style.fontWeight = '700'
      }
      function btn_off(payload) {
        payload.style.backgroundColor = '#f4f4f4'
        payload.style.color = '#222'
        payload.style.fontWeight = '400'
      }
      
      for(let i = 0; i < cate.length; i++) {
        if($ref.target === cate[i]) {
          // 스타일, 스토어 카테고리값
          if(category) {
            btn_on(cate[i])
            this.searchStore.category = cate_name[i]
            console.log(this.searchStore.category)
          } else {
            btn_off(cate[i])
            this.searchStore.category = ''
            console.log(this.searchStore.category)
          }
        } else if($ref.target === $ref.luxury) {
          if(category) {
            btn_on($ref.luxury)
          } else {
            btn_off($ref.luxury)
          }
        } else if($ref.target !== cate[i]) {
          btn_off(cate[i])
          if(i === 0) {
            this.category.category_01 = false
          } else if(i === 1) {
            this.category.category_02 = false
          } else if(i === 2) {
            this.category.category_03 = false
          } else if(i === 3) {
            this.category.category_04 = false
          } else if(i === 4) {
            this.category.category_05 = false
          }
        }
      }
      // console.log(`this.category_01 ${this.category.category_01}`)
      // console.log(`this.category_02 ${this.category.category_02}`)
      // console.log(`this.category_03 ${this.category.category_03}`)
      // console.log(`this.category_04 ${this.category.category_04}`)
      // console.log(`this.category_05 ${this.category.category_05}`)
    }
  }
}
</script>

<style scoped lang="scss">
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css");
@import '~/scss/SearchCommon.scss';

header {
    background-color: #fff;
    padding: 8px 40px 0;
    z-index: 9999;
    .header__box {
      width: 1200px;
      margin: 0 auto;
      .page_title {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10% 24px;
        h3 {
          font-size: 28px;
          font-weight: 600;
          color: #000;
        }
        .search_box {
          width: 500px;
          margin: 0 8px;
          padding-bottom: 8px;
          border-bottom: 3px solid #000;
          .search {
            width: 468px;
            padding: 0 13px 0 1px;
            color: #000;
            font-size: 24px;
            font-weight: 600;
            line-height: 29px;
            letter-spacing: -.015em;
            text-overflow: ellipsis;
          }
          .search::placeholder {
            font-size: 20px;
            font-weight: 200;
            color: #b6b6b6;
          }
          .bi {
            cursor: pointer;
          }
        }
      }
      .category {
        display: flex;
        padding-bottom: 16px;
        .icon {
          background-color: #f4f4f4;
          width: 20px;
          height: 18px;
          margin-right: 8px;
          padding: 10px;
          border-radius: 12px;
          text-align: center;
          .bi {
            width: 20px;
            height: 20px;
            color: #222;
          }
        }
        .btn_category {
          background-color: #f4f4f4;
          height: 18px;
          position: relative;
          margin-left: 8px;
          padding: 10px 12px;
          border-radius: 12px;
          text-align: center;
          .name {
            line-height: 18px;
            font-size: 15px;
          }
        }
        .luxury, .shoes {
          margin-left: 0;
        }
        .vir_bar {
          height: 3px;
          position: relative;
          margin: 0 8px;
          &::after {
            content: "";
            background-color: #ebebeb;
            width: 1px;
            height: 32px;
            position: absolute;
            top: 100%;
            right: 0;
          }  
        }
      }
    }
  }
</style>
