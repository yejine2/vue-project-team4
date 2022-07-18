<template>
  <div class="box">
    <SearchHeader @search_text="search_product" />
    <SearchTrends />
  
    <div class="banner">
      <div class="banner__box">
        <div class="slider_box">
          <router-link
            to="#"
            class="banner_01 slider showing">
            <img
              src="../../assets/search/banners/banner_01.png"
              alt="광고배너01"
              class="banner_img" />
          </router-link>
          <router-link
            to="#"
            class="banner_02 slider">
            <img
              src="../../assets/search/banners/banner_02.png"
              alt="광고배너02"
              class="banner_img" />
          </router-link>
          <router-link
            to="#"
            class="banner_03 slider">
            <img
              src="../../assets/search/banners/banner_03.png"
              alt="광고배너03"
              class="banner_img" />
          </router-link>
          <router-link
            to="#"
            class="banner_04 slider">
            <img
              src="../../assets/search/banners/banner_04.png"
              alt="광고배너04"
              class="banner_img" />
          </router-link>
          <router-link
            to="#"
            class="banner_05 slider">
            <img
              src="../../assets/search/banners/banner_05.png"
              alt="광고배너05"
              class="banner_img" />
          </router-link>
          <router-link
            to="#"
            class="banner_06 slider">
            <img
              src="../../assets/search/banners/banner_06.png"
              alt="광고배너06"
              class="banner_img" />
          </router-link>
          <router-link
            to="#"
            class="banner_07 slider">
            <img
              src="../../assets/search/banners/banner_07.png"
              alt="광고배너07"
              class="banner_img" />
          </router-link>
          <router-link
            to="#"
            class="banner_08 slider">
            <img
              src="../../assets/search/banners/banner_08.png"
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
    <div class="content">
      <SearchFilter />
      <SearchResult />
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useSearchStore } from '~/store/search'
import SearchHeader from '~/views/search/SearchHeader.vue'
import SearchTrends from '~/views/search/SearchTrends.vue'
import SearchFilter from '~/components/search/SearchFilter.vue'
import SearchResult from '~/components/search/SearchResult.vue'


export default {
  components: {
    SearchHeader,
    SearchTrends,
    SearchFilter,
    SearchResult,
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
    ...mapStores(useSearchStore)
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
      await this.searchStore.searchProducts(search_text)
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
  .content {
    width: 1200px;
    display: flex;
    position: relative;
    margin: 0 auto;
    padding: 0 40px 80px;
  }
}

</style>
