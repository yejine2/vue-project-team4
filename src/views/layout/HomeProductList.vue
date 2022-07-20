<template>
  <div class="item-container">
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
				]
			}
  }
}
</script>

<style scoped lang="scss">
.item-container {
  max-width: 1280px;
  margin: 50px auto 0 auto;
}
.item-list {
  max-width: 1280px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 0 28px;
  margin: 0 auto;
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
  width: 100%;
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
    color: rgb(201, 201, 201);
    margin-top: 2px;
  }
  }

}
</style>
