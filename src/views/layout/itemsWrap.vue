<template>
  <div class="item-container">
    <ul class="item-list">
      <li
        v-for="item in items"
        :key="item"
        class="item">
        <img
          class="item__image"
          :src="item.image" />
        <p>{{ item.title }}</p> 
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
  margin-top: 50px;
}
.item-list {
  max-width: 1280px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  padding: 0 30px;
  margin: 0 auto;
}
.item { 
  text-align: center;
  margin: 0 7.5px;

  .item__image {
  height: 100px;
  border-radius: 10px;
  margin-top: 15px;
  }
  p {
  margin-top: 8px;
  color: #333
  }
}
</style>
