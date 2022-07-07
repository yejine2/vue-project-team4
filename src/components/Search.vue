<template>
  <div class="box">
    <header>
      <h3 v-if="true">
        SHOP
      </h3>
      <!-- 검색바 들어갈 자리 -->
      <div
        v-else
        class="search"></div>
    </header>
    <div class="category">
      <div class="icon">
        <i class="bi bi-sliders"></i>
      </div>
      <router-link
        to="#"
        class="luxury btn_category"
        @click="category_btn">
        <p class="name">
          럭셔리
        </p>
      </router-link>
      <span class="vir_bar"></span>
      <router-link
        ref="shoes"
        to=""
        class="shoes btn_category"
        @click="category_btn">
        <p class="name">
          신발
        </p>
      </router-link>
      <router-link
        ref="cloth"
        to=""
        class="cloth btn_category"
        @click="category_btn">
        <p class="name">
          의류
        </p>
      </router-link>
      <router-link
        ref="acc"
        to=""
        class="acc btn_category"
        @click="category_btn">
        <p class="name">
          패션 잡화
        </p>
      </router-link>
      <router-link
        ref="life"
        to=""
        class="life btn_category"
        @click="category_btn">
        <p class="name">
          라이프
        </p>
      </router-link>
      <router-link
        ref="tech"
        to=""
        class="tech btn_category"
        @click="category_btn">
        <p class="name">
          테크
        </p>
      </router-link>
    </div>
    <div class="trend"></div>
    <div class="banner"></div>
    <div class="content"></div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '~/store/auth'

export default {
  data() {
    return {
      category: false,
      trend: false
    }
  },
  computed: {
    ...mapStores(useAuthStore, ['banks'])
  },
  methods: {
    category_btn(event) {
      const target = event.currentTarget
      this.category = !this.category
      if(this.category) {
        target.style.color = '#f15746'
        target.style.backgroundColor = '#fef7f6'
        target.style.fontWeight = '700'
      } else {
        target.style.color = '#222'
        target.style.backgroundColor = '#f4f4f4'
        target.style.fontWeight = '400'
      }
      if(target !== this.$refs.shoes) {
        // 이벤트 외에 요소들 초기화
        style.color = '#222'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css");
@import '~/scss/SearchCommon.scss';

.box {
  margin: 0 100px;
  header {
    text-align: center;
    h3 {
      font-size: 28px;
      font-weight: 600;
      color: #000;
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
</style>
