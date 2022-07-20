<template>
  <div class="item-container">
    <div class="product-title">
      <div class="title">
        Brand Focus
      </div>
      <div class="sub-title">
        추천 브랜드
      </div>
    </div>
    <ul class="item-list">
      <li
        v-for="item in items"
        :key="item"
        class="item">
        <router-link to="/">
          <img
            class="item__image"
            :src="item.image" />
          <p class="item__title">
            {{ item.title }}
          </p> 
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
						image: 'src/assets/home/brand-list/brand_01.jpg',
						title: '샤넬'
					},
					{
						image: 'src/assets/home/brand-list/brand_02.jpg',
						title: '에르메스'
					},
					{
						image: 'src/assets/home/brand-list/brand_03.jpg',
						title: '루이비통'
					},
					{
						image: 'src/assets/home/brand-list/brand_04.jpg',
						title: '롤렉스'
					},
					{
						image: 'src/assets/home/brand-list/brand_05.jpg',
						title: '까르띠에'
					},
					{
						image: 'src/assets/home/brand-list/brand_06.jpg',
						title: '디올'
					},
					{
						image: 'src/assets/home/brand-list/brand_07.jpg',
						title: '프라다'
					},
					{
						image: 'src/assets/home/brand-list/brand_08.jpg',
						title: '발렌시아가'
					},
					{
						image: 'src/assets/home/brand-list/brand_09.jpg',
						title: '보테가 베네타'
					},
					{
						image: 'src/assets/home/brand-list/brand_10.jpg',
						title: '애플'
					},
					{
						image: 'src/assets/home/brand-list/brand_11.jpg',
						title: '미하라 야스히로'
					},
					{
						image: 'src/assets/home/brand-list/brand_12.jpg',
						title: '우영미'
					},
					{
						image: 'src/assets/home/brand-list/brand_13.jpg',
						title: '스톤 아일래드'
					},
					{
						image: 'src/assets/home/brand-list/brand_14.jpg',
						title: '메종 마르지엘라'
					},
					{
						image: 'src/assets/home/brand-list/brand_15.jpg',
						title: '다이슨'
					},
				
				]
			}
  },
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
.item-container {
  max-width: 1280px;
  margin: 34px auto 0 auto;
}
.item-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  text-align: center;
  padding: 0 30px;
}
.item { 
  text-align: center;
  margin: 0 7.5px;
  a {
    text-decoration: none;
  }
  .item__image {
  height: 100px;
  border-radius: 10px;
  margin-top: 16px;
  }
  .item__title {
  margin-top: 8px;
  color: #333;
  font-size: 15px
  }
}
</style>
