<template>
  <div class="box">
    <SearchHeader @search_text="search_product" />
    <!-- TREND -->
    <div class="trend">
      <router-link
        to=""
        class="btn_trend"
        @click="trend__link('애플')">
        <img
          src="../assets/search/trends/apple.png"
          alt="트렌드"
          class="trend_img" />
        <p class="trend_name">
          애플
        </p>
      </router-link>
      <router-link
        to=""
        class="btn_trend"
        @click="trend__link('뉴발란스')">
        <img
          src="../assets/search/trends/newBalance.png"
          alt="트렌드"
          class="trend_img" />
        <p class="trend_name">
          뉴발란스
        </p>
      </router-link>
      <router-link
        to=""
        class="btn_trend"
        @click="trend__link('레고')">
        <img
          src="../assets/search/trends/lego.png"
          alt="트렌드 레고"
          class="trend_img" />
        <p class="trend_name">
          레고
        </p>
      </router-link>
      <router-link
        to=""
        class="btn_trend"
        @click="trend__link('샤넬')">
        <img
          src="../assets/search/trends/chanel.png"
          alt="트렌드"
          class="trend_img" />
        <p class="trend_name">
          샤넬
        </p>
      </router-link>
      <router-link
        to=""
        class="btn_trend"
        @click="trend__link('롤렉스')">
        <img
          src="../assets/search/trends/rolex.png"
          alt="트렌드"
          class="trend_img" />
        <p class="trend_name">
          롤렉스
        </p>
      </router-link>
      <router-link
        to=""
        class="btn_trend"
        @click="trend__link('헬리녹스')">
        <img
          src="../assets/search/trends/helinox.png"
          alt="트렌드"
          class="trend_img" />
        <p class="trend_name">
          헬리녹스
        </p>
      </router-link>
      <router-link
        to=""
        class="btn_trend"
        @click="trend__link('우영미')">
        <img
          src="../assets/search/trends/wooyoungmi.png"
          alt="트렌드"
          class="trend_img" />
        <p class="trend_name">
          우영미
        </p>
      </router-link>
      <router-link
        to=""
        class="btn_trend"
        @click="trend__link('에어포스')">
        <img
          src="../assets/search/trends/airForce.png"
          alt="트렌드"
          class="trend_img" />
        <p class="trend_name">
          에어포스
        </p>
      </router-link>
      <router-link
        to=""
        class="btn_trend"
        @click="trend__link('다이슨')">
        <img
          src="../assets/search/trends/dyson.png"
          alt="트렌드"
          class="trend_img" />
        <p class="trend_name">
          다이슨
        </p>
      </router-link>
      <router-link
        to=""
        class="btn_trend"
        @click="trend__link('IAB Studio')">
        <img
          src="../assets/search/trends/iab.png"
          alt="트렌드"
          class="trend_img" />
        <p class="trend_name">
          IAB Studio
        </p>
      </router-link>
    </div>
    <div class="banner">
      <div class="banner__box">
        <div class="slider_box">
          <router-link
            to=""
            class="banner_01 slider showing">
            <img
              src="../assets/search/banners/banner_01.png"
              alt="광고배너01"
              class="banner_img" />
          </router-link>
          <router-link
            to=""
            class="banner_02 slider">
            <img
              src="../assets/search/banners/banner_02.png"
              alt="광고배너02"
              class="banner_img" />
          </router-link>
          <router-link
            to=""
            class="banner_03 slider">
            <img
              src="../assets/search/banners/banner_03.png"
              alt="광고배너03"
              class="banner_img" />
          </router-link>
          <router-link
            to=""
            class="banner_04 slider">
            <img
              src="../assets/search/banners/banner_04.png"
              alt="광고배너04"
              class="banner_img" />
          </router-link>
          <router-link
            to=""
            class="banner_05 slider">
            <img
              src="../assets/search/banners/banner_05.png"
              alt="광고배너05"
              class="banner_img" />
          </router-link>
          <router-link
            to=""
            class="banner_06 slider">
            <img
              src="../assets/search/banners/banner_06.png"
              alt="광고배너06"
              class="banner_img" />
          </router-link>
          <router-link
            to=""
            class="banner_07 slider">
            <img
              src="../assets/search/banners/banner_07.png"
              alt="광고배너07"
              class="banner_img" />
          </router-link>
          <router-link
            to=""
            class="banner_08 slider">
            <img
              src="../assets/search/banners/banner_08.png"
              alt="광고배너08"
              class="banner_img" />
          </router-link>
        </div>
        <div class="banner__btn">
          <div
            class="left"
            @click="handle_pre">
            <i class="bi bi-chevron-left"></i>
          </div>
          <div class="slide_page">
            {{ slide_current }}/8
          </div>
          <div
            class="right"
            @click="handle_next">
            <i class="bi bi-chevron-right"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="content"></div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '~/store/auth'
import SearchHeader from '~/components/SearchHeader.vue'

export default {
  components: {
    SearchHeader
  },
  emit: [
    'search_text'
  ],
  data() {
    return {
      slide_current: 1
    }
  },
  computed: {
    ...mapStores(useAuthStore, ['banks'])
  },
  mounted() {
    setInterval(() => {
      let target = document.querySelector(`.banner_0${this.slide_current}`)
      target.classList.remove('showing')
      this.slide_current = this.slide_current + 1 < 9 ? this.slide_current + 1 : 1
      target = document.querySelector(`.banner_0${this.slide_current}`)
      target.classList.add('showing')
    }, 3000)
  },
  methods: {
    async search_product(search_text) {
      console.log(search_text)
      // await this.authStore.searchProduct()
    },
    async trend__link(payload) {
      const search = document.querySelector('.search')
      search.value = payload
      // await this.authStore.searchProduct()
    },
    handle_pre() {
      let target = document.querySelector(`.banner_0${this.slide_current}`)
      target.classList.remove('showing')
      this.slide_current = this.slide_current - 1 > 0 ? this.slide_current - 1 : 8
      target = document.querySelector(`.banner_0${this.slide_current}`)
      target.classList.add('showing')
    },
    handle_next() {
      let target = document.querySelector(`.banner_0${this.slide_current}`)
      target.classList.remove('showing')
      this.slide_current = this.slide_current + 1 < 9 ? this.slide_current + 1 : 1
      target = document.querySelector(`.banner_0${this.slide_current}`)
      target.classList.add('showing')
    }
  }
}

</script>

<style scoped lang="scss">
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css");
@import '~/scss/SearchCommon.scss';

.box {
  .trend {
    width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    padding-bottom: 16px;
    .btn_trend {
      flex-grow: 1;
      width: 84px;
      height: 82px;
      margin-left: 40px;
      text-align: center;
      .trend_img {
        width: 70px;
        height: 70px;
        vertical-align: top;
        user-select: none;
      }
      .trend_name {
        margin-top: -2px;
        font-size: 13px;
        font-weight: 600;
      }
    }
    .btn_trend:first-child {
      margin-left: 0;
    }
  }
  .banner {
    max-width: 1200px;
    position: relative;
    margin: 0 auto;
    padding: 0 40px;
    .banner__box {
      height: 100px;
      display: flex;
      position: relative;
      .slider_box {
        .slider {
          width: 1200px;
          height: 100px;
          position: absolute;
          opacity: 0;
          transition: .9s;
          .banner_img {
            height: 100px;
          }
        }
        .banner_01 {
          background-color: #24479C;
        }
        .banner_02 {
          background-color: #DBE0BF;
        }
        .banner_03 {
          background-color: #FFD952;
        }
        .banner_04 {
          background-color: #8892AE;
        }
        .banner_05 {
          background-color: #6E4AFE;
        }
        .banner_06 {
          background-color: #030423;
        }
        .banner_07 {
          background-color: #0CB459;
        }
        .banner_08 {
          background-color: #D4EBE8;
        }
      }
      .showing {
        z-index: 1;
        opacity: 1 !important;
        transition: 1s;
      }
      .banner__btn {
        background-color: rgba(34,34,34,.8);
        display: flex;
        align-items: center;
        position: absolute;
        right: 8px;
        bottom: 8px;
        padding: 5px 0;
        text-align: center;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
        color: rgb(255, 255, 255, .8);
        z-index: 9;
        .left, .right {
          padding: 0 5px;
          cursor: pointer;
        }
        .slide_page {
          cursor: default;
        }
      }
    }
  }
}

</style>
