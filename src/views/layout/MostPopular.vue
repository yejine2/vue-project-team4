<template>
  <div class="item-container">
    <div class="product-title">
      <div class="title">
        Most Popular
      </div>
      <div class="sub-title">
        인기 상품
      </div>
    </div>
    <ul class="item-list">
      <li
        v-for="item in items"
        :key="item"
        class="item">
        <router-link to="/">
          <div class="image-box">
            <img
              class="image-box__image"
              :src="item.image" />
            <img
              class="image-box__bookmark"
              src="/src/assets/home/just-dropped/bookmark.png"
              alt="bookmark" />
          </div>
          <div class="item__info">
            <p class="item__info__brand">
              {{ item.brand }}
            </p>
            <p class="item__info__name">
              {{ item.name }}
            </p>
            <div class="item__info__icon">
              <p class="express_text">
                {{ item.icon }}
              </p>
            </div>
            <p class="item__info__price">
              {{ item.price }}
            </p>
            <p
              class="item__info__derc">
              {{ item.derc }}
            </p>
          </div>
        </router-link>
      </li>
    </ul>
    <div
      ref="more"
      class="more">
      <ul class="item-list">
        <li
          v-for="item in moreItems"
          :key="item"
          class="item">
          <router-link to="/">
            <div class="image-box">
              <img
                class="image-box__image"
                :src="item.image" />
              <img
                class="image-box__bookmark"
                src="/src/assets/home/just-dropped/bookmark.png"
                alt="bookmark" />
            </div>
            <div class="item__info">
              <p class="item__info__brand">
                {{ item.brand }}
              </p>
              <p class="item__info__name">
                {{ item.name }}
              </p>
              <div class="item__info__icon">
                <p class="express_text">
                  {{ item.icon }}
                </p>
              </div>
              <p class="item__info__price">
                {{ item.price }}
              </p>
              <p
                class="item__info__derc">
                {{ item.derc }}
              </p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <div class="btn-container">
    <button
      ref="button"
      class="more-button"
      @click="more">
      더보기
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
				items:[
					{
						image: '/src/assets/home/popular/popular_01.jpg',
						brand: 'Jordan',
            name: 'Jordan 1 Retro High OG Black Mocha',
            icon: '빠른배송',
            price: '569,000원',
            derc: '즉시 구매가'
					},
					{
						image: '/src/assets/home/popular/popular_02.jpg',
						brand: 'Nike',
            name: 'Nike Dunk Low Retro Black',
            icon: '빠른배송',
            price: '173,000원',
            derc: '즉시 구매가'
					},
					{
						image: '/src/assets/home/popular/popular_03.jpg',
						brand: 'Nike',
            name: 'Nike Air Force 1 \'07 Low White',
            icon: '빠른배송',
            price: '140,000원',
            derc: '즉시 구매가'
					},
					{
						image: '/src/assets/home/popular/popular_04.jpg',
						brand: 'New Balance',
            name: 'New Balance 992 Made in USA Grey - D Standard',
            icon: '빠른배송',
            price: '400,000원',
            derc: '즉시 구매가'
					},
				],
        moreItems:[
					{
						image: '/src/assets/home/popular/popular_05.jpg',
						brand: 'Nike',
            name: 'Nike Dunk Low Retro Wolf Grey',
            icon: '빠른배송',
            price: '228,000원',
            derc: '즉시 구매가'
					},
					{
						image: '/src/assets/home/popular/popular_06.jpg',
						brand: 'Nike',
            name: 'Nike Dunk Low Retro PRM Halloween',
            icon: '빠른배송',
            price: '219,000원',
            derc: '즉시 구매가'
					},
					{
						image: '/src/assets/home/popular/popular_07.jpg',
						brand: 'Jordan',
            name: 'Jordan 1 x Travis Scott x Fragment Retro Low OG SP Military Blue',
            icon: '빠른배송',
            price: '1,570,000원',
            derc: '즉시 구매가'
					},
					{
						image: '/src/assets/home/popular/popular_08.jpg',
						brand: 'Jordan',
            name: 'Jordan 1 Mid Light Smoke Grey Anthracite',
            icon: '빠른배송',
            price: '199,000원',
            derc: '즉시 구매가'
					},
				]
			}
  },
  methods: {
    more() {
      this.$refs.more.style.display = 'block'
      this.$refs.button.style.display = 'none'
    }
  }
}
</script>

<style scoped lang="scss">
.item-container {
  max-width: 1280px;
  margin: 50px auto 0 auto;
  .product-title {
    margin: 0 auto;
    padding: 0 40px;
    .title {
      font-size: 20px;
      font-weight: 700;
    }
    .sub-title {
      font-size: 14px;
      margin-top: 2px;
      color: #a5a5a5;
    }
  }
}
.item-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 0 28px;
}
.item { 
  margin: 20px 0;
  padding: 0 12px;
  a {
    text-decoration: none;
  }
  .image-box {
  background-color: rgb(235, 240, 245);
  width: 282px;
  height: 282px;
  position: relative;
  border-radius: 10px;
  .image-box__image {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 81.5%;
  transform: translate(-50%,-50%);
  }
  .image-box__bookmark {
  position: absolute;
  top: 5px;
  right: 3px;
  width: 29px;
  padding: 5px;
  z-index: 1;
  }
  }
  .item__info {
    padding: 9px 0 0;
  p {
    color: #222;
    text-align: left;
  }
  .item__info__brand {
    font-size: 14px;
    font-weight: 700;
    text-decoration: underline;
    line-height: 17px;
  }
  .item__info__name {
    font-size: 14px;
    line-height: 1.2;
    margin-top: 10px;
    max-height: 34px;
  }
  .item__info__icon {
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
      background: url('/src/assets/search/express.png') 0 0 no-repeat;
      background-size: 11px 13px;
    }
    .express_text{
      color: #31b46e;
    }
  }
  .item__info__price{
    font-size: 15px;
    font-weight: 700;
    padding: 10px 0 0
  }
  .item__info__derc{
    font-size: 11px;
    color: #a5a5a5;
    margin-top: 2px;
  }
  }
}
.btn-container {
  height: 62px;
  padding: 0 32px;
  text-align: center;
  .more-button {
    height: 42px;
    background-color: $color-white;
    border: 1px solid #d3d3d3;
    padding: 0 30px;
    margin-top: 20px;
    border-radius: 12px;
    font-size: 14px;
    color: rgba(34,34,34,.7);
  }
}
.more{
  display: none;
}
</style>
