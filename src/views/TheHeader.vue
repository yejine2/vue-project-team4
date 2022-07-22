<template>
  <nav
    ref="nav"
    class="navbar">
    <div class="top-nav">
      <RouterLink
        to="/my"
        class="top-nav__link">
        마이페이지
      </RouterLink>
      <!-- LogIn / LogOut -->
      <template v-if="authStore.logInLoading">
        <img
          class="login-icon"
          src="/assets/login.png"
          alt="Login" />
      </template>
      <template v-else-if="!authStore.user">
        <RouterLink
          to="/login"
          class="top-nav__link">
          로그인
        </RouterLink>
      </template>
      <template v-else>
        <RouterLink 
          to="/"
          class="top-nav__link"
          @click="authStore.signOut">
          로그아웃
        </RouterLink>
      </template>
    </div>
  
    <div
      ref="bottom"
      class="main-nav">
      <div class="logo-nav">
        <RouterLink
          to="/"
          class="top-nav__logo">
          <img
            class="main-nav__logo"
            src="/assets/logo.png"
            alt="kream" />
        </RouterLink>
      </div>
      <div class="link-nav">
        <RouterLink
          to="/search"
          class="main-nav__link"
          @click="is_header_search">
          SHOP
        </RouterLink>
        <!-- 검색 버튼 -->
        <img
          src="/assets/search.png"
          alt="검색버튼"
          class="search_btn"
          @click="search = true" />
      </div>
    </div>
    <!-- 검색 모달 -->
    <div
      v-show="search"
      class="search">
      <div class="search_box">
        <div class="search_text">
          <div class="text_box">
            <img
              src="/assets/search.png"
              alt="검색 아이콘"
              class="search_icon" />
            <input
              ref="search_input"
              type="text"
              class="search_input"
              placeholder="모델명"
              @keypress.enter="recent($event.currentTarget.value)" />
          </div>
          <div
            class="cancel"
            @click="search = false">
            취소
          </div>
        </div>
        <div class="recent_text">
          <div class="recent_title">
            <strong>최근 검색어</strong>
            <i
              class="bi bi-x-circle"
              @click="delete_recent"></i>
          </div>
          <ul class="recent_list">
            <li
              v-for="get_recent in get_recents"
              :key="get_recent"
              class="inner_list"
              @click="recent(get_recent)">
              {{ get_recent }}
            </li>
          </ul>
        </div>
        <div class="brand_list">
          <router-link
            v-for="brand in brands"
            :key="brand.name"
            class="brand"
            to="/search"
            @click="recent(brand.name)">
            <img
              :src="brand.num"
              alt="인기상품"
              class="brand_img" />
            <p>{{ brand.name }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '~/store/auth'
import { useSearchStore } from '~/store/search'

export default {
  data() {
    return {
      recent_value: [],
      get_recents: [],
      search: false,
      brands: [
        {num: '/assets/home/just-dropped/dropped_01.jpg', name: 'Nike'},
        {num: '/assets/home/just-dropped/dropped_02.jpg', name: 'Asics'},
        {num: '/assets/home/just-dropped/dropped_03.jpg', name: 'Nike'},
        {num: '/assets/home/just-dropped/dropped_04.jpg', name: 'Jordan'},
        {num: '/assets/home/just-dropped/dropped_05.jpg', name: 'Louis Vuitton'},
        {num: '/assets/home/just-dropped/dropped_06.jpg', name: 'Louis Vuitton'}
      ]
    }
  },
  computed: {
    ...mapStores(useAuthStore),
    ...mapStores(useSearchStore)
  },
  watch: {
  
  },
  created() {
    const get_recent_arr = window.localStorage.getItem('recent_search')
    this.get_recents = JSON.parse(get_recent_arr)
  },
  mounted() {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 150) {
        this.$refs.bottom.classList.add('bottom')
      }
    })
  },
  unmounted() {
    window.removeEventListener('scroll', () => {
      if(window.scrollY > 150) {
        this.$refs.bottom.classList.add('bottom')
      }
    })
  },
  methods: {
    recent(value) {
      const get_recent_arr = window.localStorage.getItem('recent_search')
      if(value !== '') {
        if(get_recent_arr) {
          this.get_recents = JSON.parse(get_recent_arr)
          this.get_recents.unshift(value)
          if(this.get_recents.length > 5) {
            this.get_recents.splice(4, 1)
          }
          const recent = JSON.stringify(this.get_recents)
          window.localStorage.setItem('recent_search', recent)
          this.$refs.search_input.value = ''
          // 헤더 검색인지 판단
          window.sessionStorage.setItem('is_header_search', 'true')

          window.location.href='/search'
        } else {
          // 사이트 첫 검색시
          this.recent_value.unshift(value)
          this.get_recents = [ value ]
          const recent = JSON.stringify(this.recent_value)
          window.localStorage.setItem('recent_search', recent)
          // 헤더 검색인지 판단
          window.sessionStorage.setItem('is_header_search', 'true')
          window.location.href='/search'
        }
      } else {
        // 빈문자 검색일때
        window.location.href='/search'
      }
    },
    is_header_search() {
      window.sessionStorage.setItem('is_header_search', 'false')
    },
    delete_recent() {
      this.get_recents = []
      window.localStorage.removeItem('recent_search')
    }
  }
}
</script>

<style scoped lang="scss">
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css");
@import '~/scss/SearchCommon.scss';

.navbar {
  width: 100%;
  position: fixed;
  background-color: $color-white;
  top:0;
  left: 0;
  right: 0;
  z-index: 3;
}
.top-nav{
  height: 32px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 40px;
  border-bottom: 1px solid #e9e9e9;
  .top-nav__link {
    color: #707070;
    text-decoration: none;
    font-size: 12px;
    padding: 10px;
  }
  .login-icon {
    width: 20px;
    color: #707070;
  }
}
.main-nav{
  height: 67px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 40px;
  .logo-nav {
    font-size:0;
  }
  .main-nav__logo {
    width: 120px;
  }
  .link-nav {
    display: flex;
    align-items: center;
    .main-nav__link {
      color: $color-black;
      font-size: 16px;
      text-decoration: none;
      padding: 8px;
      cursor: pointer;
    }
    .search_btn {
      height: 34px;
      margin-left: 30px;
      cursor: pointer;
    }
  }
}
.search {
  background-color: #fff;
  width: 100vw;
  position: absolute;
  top: 0;
  .search_box {
    width: 704px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .search_text {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 25px 0 19px;
      .text_box {
        background-color: #f4f4f4;
        width: 88%;
        height: 40px;
        display: flex;
        padding-right: 40px;
        text-align: left;
        border-radius: 8px;
        .search_icon {
          width: 28px;
          height: 28px;
          opacity: .2;
          margin: auto 6px;
          user-select: none;
        }
        .search_input {
          background-color: transparent;
          width: 100%;
          font-size: 14px;
        }
        .search_input::placeholder {
          font-size: 14px;
        }
      }
      .cancel {

        font-size: 14px;
        color: rgb(34, 34, 34, .8);
        cursor: pointer;
      }
    }
    .recent_text {
      width: 100%;
      margin-top: 10px;
      .recent_title {
        strong {
          font-size: 12px;
          font-weight: 600;
        }
        .bi-x-circle {
          margin-left: 12px;
          font-size: 12px;
          opacity: .5;
          cursor: pointer;
        }
      }
      .recent_list {
        .inner_list {
          width: 650px;
          margin: 18px 0;
          font-size: 13px;
          color: rgba(34,34,34,.8);
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .brand_list {
      display: flex;
      margin-bottom: 56px;
      .brand {
        margin-left: 20px;
        .brand_img {
          width: 100px;
          height: 100px;
          cursor: pointer;
        }
        p {
          margin-top: -12px;
          font-size: 13px;
        }
      }
    }
  }
}
.bottom {
  border-bottom: 1px solid #e9e9e9;
}
</style>
