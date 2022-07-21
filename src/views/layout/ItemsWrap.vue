<template>
  <div class="item-container">
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
						image: 'src/assets/home/items-wrap/new.jpg',
						title: '뉴 트렌딩'
					},
					{
						image: 'src/assets/home/items-wrap/men.jpg',
						title: '남성 추천'
					},
					{
						image: 'src/assets/home/items-wrap/women.jpg',
						title: '여성 추천'
					},
					{
						image: 'src/assets/home/items-wrap/golf.jpg',
						title: '골프'
					},
          {
						image: 'src/assets/home/items-wrap/luxury.jpg',
						title: '럭셔리 컬렉션'
					},
          {
						image: 'src/assets/home/items-wrap/challenge.jpg',
						title: '#줌인챌린지'
					},
					{
						image: 'src/assets/home/items-wrap/seoul.jpg',
						title: '본투비 서울'
					},
					{
						image: 'src/assets/home/items-wrap/lucky.jpg',
						title: '7월 럭키드로우'
					},
					{
						image: 'src/assets/home/items-wrap/fast.jpg',
						title: '빠른배송'
					},
          {
						image: 'src/assets/home/items-wrap/storage.jpg',
						title: '누구나 창고보관'
					}
          
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
  margin-top: 15px;
  }
  .item__title {
  margin-top: 8px;
  color: #333;
  font-size: 15px
  }
}
</style>
