<template>
  <div class="banner-bottom">
    <router-link
      to="#"
      class="banner-box first">
      <div
        class="banner-info">
        <strong class="sub-title">service guide</strong>
        <p class="main-title">
          KREAM은 처음이지? <br />
          서비스 소개를 확인해보세요.
        </p>
        <button class="banner-btn">
          서비스 안내
        </button>
      </div>
    </router-link>
    <router-link
      to="#"
      class="banner-box second">
      <div class="banner-info">
        <strong class="sub-title">download the app</strong>
        <p class="main-title">
          KREAM 앱을 설치하여  <br />
          한정판 스니커즈를 FLEX 하세요!
        </p>
        <button class="banner-btn">
          앱 설치하기
        </button>
      </div>
    </router-link>
  </div>
</template>

<script></script>

<style scoped lang="scss">
.banner-bottom {
  height: 200px;
  display: flex;
  padding-top: 160px;
  .banner-box {
    position: relative;
    padding: 36px 32px 0;
    width: 100%;
    text-decoration: none;
    .banner-info {
      max-width: 300px;
      color: $color-white;
      .sub-title {
        font-size: 12px;
        text-transform: uppercase;
      }
      .main-title {
        font-size: 16px;
        padding-top: 12px;
        line-height: 1.3;
      }
    }
  }
    .first {
      background: {
        color: #565656;
        image: url('/src/assets/home/footer/banner_bottom_01.png'); 
        size: 350px 200px; 
        repeat: no-repeat;
        position: 100% 0px;
      };
    }
    .second {
      background: {
        color: #3b3a3c;
        image: url('/src/assets/home/footer/banner_bottom_02.png'); 
        size: 350px 200px; 
        repeat: no-repeat;
        position: 100% 0px;
      };
    }
  .banner-btn {
    height: 29px;
    font-size: 12px;
    margin-top: 16px;
    padding: 0 7px;
    border: 1px solid $color-white;
    color: $color-white;
    border-radius: 6px;
    background-color: transparent;
  }
}
</style>
