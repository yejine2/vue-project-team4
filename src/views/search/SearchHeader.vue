<template>
  <!-- HEADER -->
  <header>
    <div class="header__box">
      <div class="page_title">
        <div class="search_box">
          <input
            ref="search_input"
            type="text"
            class="search"
            placeholder="모델명"
            @input="search_text = $event.target.value"
            @keypress.enter="search_product" />
          <i
            class="bi bi-x-lg"
            @click="input_init"></i>
        </div>
      </div>
      <div class="category">
        <div class="icon">
          <i class="bi bi-sliders"></i>
        </div>
        <div
          ref="luxury"
          class="btn_category"
          @click="category_btn(category_lux = !category_lux, $event)">
          <p class="name luxury_text">
            럭셔리
          </p>
        </div>
        <span class="vir_bar"></span>
        <div
          ref="shoes"
          class="btn_category"
          @click="category_btn(category.category_01 = !category.category_01, $event)">
          <p class="name">
            신발
          </p>
        </div>
        <div
          ref="cloth"
          class="btn_category"
          @click="category_btn(category.category_02 = !category.category_02, $event)">
          <p class="name">
            의류
          </p>
        </div>
        <div
          ref="acc"
          class="btn_category"
          @click="category_btn(category.category_03 = !category.category_03, $event)">
          <p class="name">
            패션 잡화
          </p>
        </div>
        <div
          ref="life"
          class="btn_category"
          @click="category_btn(category.category_04 = !category.category_04, $event)">
          <p class="name">
            라이프
          </p>
        </div>
        <div
          ref="tech"
          class="btn_category"
          @click="category_btn(category.category_05 = !category.category_05, $event)">
          <p class="name">
            테크
          </p>
        </div>
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
      },
      cate: [
        this.$refs.shoes,
        this.$refs.cloth,
        this.$refs.acc,
        this.$refs.life,
        this.$refs.tech
      ],
      get_recents: []
    }
  },
  computed: {
    ...mapStores(useSearchStore),
    cate_interaction() {return this.searchStore.categoryInteract}
  },
  watch: {
    // 검색결과에 필터를 끄는 아이콘을 클릭하면 실행
    cate_interaction() {
      const cate = [this.$refs.shoes, this.$refs.cloth, this.$refs.acc, this.$refs.life, this.$refs.tech]

      for(let i = 0; i < cate.length; i++) {
        cate[i].style.backgroundColor = '#f4f4f4'
        cate[i].style.color = '#222'
        cate[i].style.fontWeight = '400'
      }
      this.searchStore.categoryInteract = false
    }
  },
  mounted() {
    const is_header_search = window.sessionStorage.getItem('is_header_search')
    // 루트 헤더 검색어 인풋 값으로 넣어주기
    if(is_header_search === 'true') {
      const get_recent_arr = window.localStorage.getItem('recent_search')
      this.get_recents = JSON.parse(get_recent_arr)
      console.log(this.get_recents)
      this.$refs.search_input.value = this.get_recents[0]
    }
  },
  methods: {
    search_product() {
      this.$emit('search_text', this.search_text)
    },
    input_init() {
      this.$refs.search_input.value = null
    },
    async category_btn(category, e) {
      const cate = [this.$refs.shoes, this.$refs.cloth, this.$refs.acc, this.$refs.life, this.$refs.tech]
      const cate_name = ['신발', '의류', '패션잡화', '라이프', '테크']

      function btn_on(payload) {
        payload.style.backgroundColor = '#fef7f6'
        payload.style.color = '#f15746'
        payload.style.fontWeight = '700'
      }
      function btn_off(payload) {
        console.log(payload)
        payload.style.backgroundColor = '#f4f4f4'
        payload.style.color = '#222'
        payload.style.fontWeight = '400'
      }
      for(let i = 0; i < cate.length; i++) {
        if(e.currentTarget === cate[i]) {
          if(category) {
            btn_on(cate[i])
            for(let k = 0; k < cate_name.length; k++) {
              if(this.searchStore.searchTags.find(item => item === cate_name[k])) {
                this.searchStore.searchTags.splice(0, 1)
              }
            }
            this.searchStore.searchTags.unshift(cate_name[i])
            this.searchStore.category = cate_name[i]
            await this.searchStore.searchProducts()
          } else {
            btn_off(cate[i])
            for(let k = 0; k < cate_name.length; k++) {
              if(this.searchStore.searchTags.find(item => item === cate_name[k])) {
                this.searchStore.searchTags.splice(0, 1)
              }
            }
            this.searchStore.category = ''
            // 필터 카테고리 꺼짐
            this.searchStore.categoryInteract = true
            await this.searchStore.searchProducts()
          }
        } else if(e.currentTarget === this.$refs.luxury) {
          if(category) {
            btn_on(this.$refs.luxury)
          } else {
            btn_off(this.$refs.luxury)
          }
        } else if(e.currentTarget !== cate[i]) {
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
    }
  }
}
</script>

<style scoped lang="scss">
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css");
@import '~/scss/SearchCommon.scss';

header {
    background-color: #fff;
    // width: 100%;
    // position: fixed;
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
          margin: 0 8px 12px 8px;
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
          cursor: pointer;
          .name {
            line-height: 18px;
            font-size: 15px;
          }
          .luxury_text {
            text-decoration: line-through;
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
