<template>
  <div class="item-container">
    <div class="product-title">
      <div class="title">
        Just Dropped
      </div>
      <div class="sub-title">
        발매 상품
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
              src="src/assets/home/just-dropped/bookmark.png"
              alt="bookmark" />
          </div>
          <div class="item__info">
            <p class="item__info__brand">
              {{ item.brand }}
            </p>
            <p class="item__info__name">
              {{ item.name }}
            </p> 
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
  <div ref="more" class="more">
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
              src="src/assets/home/just-dropped/bookmark.png"
              alt="bookmark" />
          </div>
          <div class="item__info">
            <p class="item__info__brand">
              {{ item.brand }}
            </p>
            <p class="item__info__name">
              {{ item.name }}
            </p> 
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
    <button ref="button" @click="more" class="more-button">
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
						image: 'src/assets/home/just-dropped/dropped_01.jpg',
						brand: 'Nike',
            name: 'Nike ACG Mountain Fly Low SE White and Black',
            price: '173,000원',
            derc: '즉시 구매가'
					},
					{
						image: 'src/assets/home/just-dropped/dropped_02.jpg',
						brand: 'Asics',
            name: 'Asics Actibreeze 3D Sandal Black',
            price: '155,000원',
            derc: '즉시 구매가'
					},
					{
						image: 'src/assets/home/just-dropped/dropped_03.jpg',
						brand: 'Nike',
            name: '(W) Nike Dunk Low Pink Oxford',
            price: '126,000원',
            derc: '즉시 구매가'
					},
					{
						image: 'src/assets/home/just-dropped/dropped_04.jpg',
						brand: 'Jordan',
            name: 'Jordan 1 KO White and Black',
            price: '160,000원',
            derc: '즉시 구매가'
					},
				],
        moreItems:[
					{
						image: 'src/assets/home/just-dropped/dropped_05.jpg',
						brand: 'Louis Vuitton',
            name: 'Louis Vuitton x Nike Air Force 1 Low by Virgil Abloh White Gym Green',
            price: '10,000,000원',
            derc: '즉시 구매가'
					},
					{
						image: 'src/assets/home/just-dropped/dropped_06.jpg',
						brand: 'Louis Vuitton',
            name: 'Louis Vuitton x Nike Air Force 1 Low by Virgil Abloh White Comet Red',
            price: '11,000,000원',
            derc: '즉시 구매가'
					},
					{
						image: 'src/assets/home/just-dropped/dropped_07.jpg',
						brand: 'Louis Vuitton',
            name: 'Louis Vuitton x Nike Air Force 1 Low by Virgil Abloh White Team Royal',
            price: '10,000,000원',
            derc: '즉시 구매가'
					},
					{
						image: 'src/assets/home/just-dropped/dropped_08.jpg',
						brand: 'Louis Vuitton',
            name: 'Louis Vuitton x Nike Air Force 1 Low by Virgil Abloh White',
            price: '12,500,000원',
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
  text-align: center;
  margin: 20px 0;
  padding: 0 12px;
  a {
    text-decoration: none;
  }
  .image-box {
  background-color: rgb(244, 244, 244);
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
    margin-top: 10px;
    max-height: 34px;
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
