<template>
  <div class="box">
    <header>
      <div class="filter_express">
        <div class="express_btn">
          <img
            src="src/assets/search/express.png"
            alt="빠른배송"
            class="express_img" />
          <p class="express_text">
            빠른배송
          </p>
        </div>
      </div>
      <div class="popular">
        제품 등록순
        <img
          src="src/assets/search/popularBtn.png"
          alt="인기순"
          class="popular_icon" />
      </div>
    </header>
    <div class="filter">
      <div
        v-if="searchStore.category"
        class="filter__tag">
        <p class="tag_cate">
          {{ searchStore.category }}
        </p>
        <i
          class="bi bi-x"
          @click="delete_btn('tag_cate')"></i>
      </div>
      <div
        v-for="brand in searchStore.brands"
        :key="brand"
        class="filter__tag">
        <p class="tag_brand">
          {{ brand }}
        </p>
        <i
          class="bi bi-x bi_brand"
          @click="delete_btn('tag_brand', $event)"></i>
      </div>
      <div
        v-if="searchStore.price"
        class="filter__tag">
        <p class="tag_price">
          {{ searchStore.price }}
        </p>
        <i
          class="bi bi-x"
          @click="delete_btn('tag_price')"></i>
      </div>
    </div>
    <div class="contents">
      <div
        v-for="result in searchStore.results"
        :key="result"
        class="contents__box">
        <router-link
          to="#"
          class="contents__item">
          <div class="item_img">
            <img
              :src="result.thumbnail"
              alt="제품 사진" />
          </div>
          <div class="item_info">
            <div class="title">
              <p class="brand"></p>
              <p class="name">
                {{ result.title }}
              </p>
              <p class="description">
                {{ result.description }}
              </p>
            </div>
            <div class="price">
              <p class="number">
                {{ result.price.toLocaleString('ko-KR') }}
              </p>
              <p class="guide">
                즉시 구매가
              </p>
            </div>
            <div class="express">
              빠른배송
            </div>
          </div>
        </router-link>
        <div class="interest">
          <div class="interest_btn">
            <router-link
              to="#"
              class="btn_icon">
              <i class="bi bi-bookmark"></i>
            </router-link>
            <p class="interest_num num"></p>
          </div>
          <div class="interest_btn">
            <router-link
              to="#"
              class="btn_icon">
              <i class="bi bi-file-earmark-richtext"></i>
            </router-link>
            <p class="review_num num"></p>
          </div>
        </div>
      </div>
      <div
        v-if="fail_result"
        class="fail_result">
        <strong>검색하신 결과가 없습니다.</strong>
        <p>상품 등록 요청은 앱 1:1 문의하기로 요청해주세요.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useSearchStore } from '~/store/search'


export default {
  data() {
    return {
      fail_result: false
    }
  },
  computed: {
    ...mapStores(useSearchStore),
    results() {return this.searchStore.results},
    category() {return this.searchStore.category}
  },
  watch: {
    results() {
      // 검색 결과가 없을시
      if(this.searchStore.results.length === 0) {
        this.fail_result = true
      } else {
        this.fail_result = false
        setTimeout(() => {
        this.random_num()
      }, 200) 
      }
    },
    category() {
      if(this.searchStore.category === '') {
        this.searchStore.categoryInteract = true
      }
    }
  },
  async created() {
    setInterval(() => {
      const brand = document.querySelectorAll('.brand')
      for(let i = 0; i < brand.length; i++) {
        brand[i].textContent = this.searchStore.results[i].tags[1]
      }
    }, 200)
  },
  mounted() {
    setTimeout(() => {
      this.random_num()
    }, 200) 
  },
  methods: {
    random_num() {
      const interest_num = document.querySelectorAll('.interest_num')
      const review_num = document.querySelectorAll('.review_num')
      for(let i = 0; i < interest_num.length; i++) {
        const interest = (Math.random() * 9) + 2
        const review = Math.floor(Math.random() * 9100) + 900
        interest_num[i].textContent = interest.toFixed(1) + '만'
        review_num[i].textContent = review.toLocaleString('ko-KR')
      }
    },
    async delete_btn(tag, e) {
      if(tag === 'tag_cate') {
        this.searchStore.category = ''
        this.searchStore.searchTags.splice(0, 1)
        await this.searchStore.searchProducts()
      }
      else if(tag === 'tag_brand') {
        const tag_brand = document.querySelectorAll('.tag_brand')
        const bi_brand = document.querySelectorAll('.bi_brand')

        for(let i =0; i < bi_brand.length; i++) {
          if(e.currentTarget === bi_brand[i]) {
            this.searchStore.brandInteract = tag_brand[i].textContent
            const number = this.searchStore.brands.findIndex( item => item === tag_brand[i].textContent)
            this.searchStore.brands.splice(number, 1)
            const tag_num = this.searchStore.searchTags.findIndex( item => item === tag_brand[i].textContent)
            this.searchStore.searchTags.splice(tag_num, 1)
            await this.searchStore.searchProducts()
          }
        }
      }
      else if(tag === 'tag_price') {
        this.searchStore.priceInteract = this.searchStore.price
        this.searchStore.price = ''
        await this.searchStore.searchProducts()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  header {
    width: 980px;
    height: 68px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // margin-top: 20px;
    .filter_express {
      .express_btn{
        height: 28px;
        display: flex;
        align-items: center;
        padding: 0 9px;
        border: 1px solid #ebebeb;
        border-radius: 17px;
        .express_img {
          width: 10px;
          height: 12px;
          margin-top: 2px;
        }
        .express_text {
          margin-left: 3px;
          line-height: 20px;
          font-size: 13px;
          font-weight: 400;
          text-decoration: line-through;
        }
      }
    }
    .popular {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      color: #222;
      text-decoration: line-through;
      cursor: pointer;
      .popular_icon {
        width: 16px;
        height: 16px;
        margin-left: 4px;
      }
    }
  }
  .filter {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: -8px;
    .filter__tag {
      background-color: #f4f4f4;
      display: flex;
      align-items: center;
      margin: 8px 8px 0 0;
      padding: 4px 2px 4px 10px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      border-radius: 6px;
    }
    .bi {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      font-size: 20px;
      color: rgba(34,34,34,.5);
      cursor: pointer;
    }
  }
  .contents {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
    .contents__box {
      width: 230px;
      margin: 20px 0;
      padding: 0 10px;
      .contents__item {
        color: #000;
        text-decoration: none;
        .item_img {
          background-color: #ebf0f5;
          height: 230px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 12px;
          overflow: hidden;
          img {
            width: 81.5%;
          }
        }
        .item_info {
          margin-left: 2px;
          padding-top: 10px;
          .title {
            .brand {
              display: inline-block;
              vertical-align: top;
              line-height: 16px;
              font-size: 14px;
              letter-spacing: -.21px;
              font-weight: 600;
              color: #333;
            }
            .name {
              margin-top: 5px;
              line-height: 16px;
              font-size: 13px;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            .description {
              width: 230px;
              height: 13px;
              margin-top: 3px;
              line-height: 14px;
              font-size: 12px;
              letter-spacing: -.06px;
              color: rgba(34,34,34,.5);
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
          .price {
            padding-top: 11px;
            .number {
              line-height: 17px;
              font-size: 14px;
              font-weight: 600;
            }
            .guide {
              line-height: 13px;
              font-size: 11px;
              color: rgba(34,34,34,.5);
            }
          }
          .express {
            display: inline-block;
            position: relative;
            margin-top: 5px;
            padding: 3px 5.5px 4px 17px;
            vertical-align: top;
            line-height: 11px;
            font-size: 11px;
            letter-spacing: -.33px;
            color: #31b46e;
            border: 1px solid #31b46e;
            border-radius: 2px;
            &::before {
              content: "";
              position: absolute;
              left: 3.5px;
              top: 3px;
              width: 11px;
              height: 13px;
              background: url('src/assets/search/express.png') 0 0 no-repeat;
              background-size: 11px 13px;
            }
          }
        }
      }
      .interest {
        display: flex;
        padding-top: 12px;
        margin: 0;
        .interest_btn {
          height: 20px;
          display: flex;
          align-items: center;
          &:last-child {
            padding: 0 8px;
          }
          .btn_icon {
            text-decoration: none;
            color: #333;
          }
          .num {
            margin-left: 2px;
            font-size: 13px;
          }
        }
      }
    }
    .fail_result {
      width: 100%;
      position: relative;
      padding-top: 100px;
      text-align: center;
      strong {
        top: 50px;
        font-size: 18px;
        color: rgba(34,34,34,.8);
      }
      p {
        padding-top: 12px;
        font-size: 13px;
        color: rgba(34,34,34,.5);
      }
    }
  }
}
</style>
