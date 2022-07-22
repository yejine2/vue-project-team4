<template>
  <div class="product-container">
    <div class="top-grop">
      <RouterLink
        to="/admin">
        <h3 class="sub-title">
          관리자 페이지
        </h3>
      </RouterLink>
      <h2 class="product-title">
        제품 추가
      </h2>
    </div>
    <section class="add-container">
      <div class="add-items">
        <div class="input-group mb-4">
          <label
            class="input-group-text">썸네일 사진</label>
          <input
            type="file"
            class="form-control"
            @change="thumbnailBase64Img" />
        </div>
        <div class="input-group mb-4">
          <label
            class="input-group-text">제품 상세 사진</label>
          <input
            type="file"
            class="form-control"
            @change="photoBase64Img" />
        </div>

        <div class="input-group mb-4">
          <span class="input-group-text">상품명</span>
          <input
            v-model="title"
            type="text"
            class="form-control"
            placeholder="상품명을 입력해주세요" />
        </div>
        <div class="input-group mb-4">
          <span class="input-group-text">상품가격 (원)</span>
          <input
            v-model.number="price"
            type="text"
            class="form-control" />
        </div>
        <div class="input-group mb-4">
          <span class="input-group-text">상품 상세 설명</span>
          <input
            v-model="description"
            type="text"
            class="form-control"
            placeholder="상품 상세 설명을 입력해주세요" />
        </div>
        <div class="input-group mb-4">
          <span
            class="input-group-text">태그</span>
          <input
            v-model="tags"
            type="text"
            class="form-control"
            placeholder="쉼표(,)를 이용해서 태그를 구분 하세요" />
        </div>

        <hr />
        <button
          class="btn btn-outline-primary"
          @click="addProduct">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useIndexStore } from '~/store/admin.js'

export default {
  data() {
    return {
      title: '',
      price: 0,
      description: '', 
      tags: '', 
      thumbnailBase64: '', 
      photoBase64: ''
    }
  },
  computed: {
    ...mapStores(useIndexStore)
  },
  methods: {
    addProduct() {
      this.indexStore.addProduct({
        title: this.title,
        price: this.price,
        description: this.description, 
        tags: this.tags.split(','), 
        thumbnailBase64: this.thumbnailBase64, 
        photoBase64: this.photoBase64
      })
    },
    thumbnailBase64Img(event) {
      const { files } = event.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', event => {
          this.thumbnailBase64 = event.target.result
        })
      }
    },
    photoBase64Img(event) {
      const { files } = event.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', event => {
          this.photoBase64 = event.target.result
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../node_modules/bootstrap/scss/bootstrap.scss";

a {
  text-decoration: none;
}
.product-container {
  margin: 0 auto;
  padding: 40px 40px 140px;
  position: relative;
  .top-grop {
    margin-bottom: 30px;
  .sub-title {
    line-height: 29px;
    padding-bottom: 10px;
    font-size: 16px;
    font-weight: 400;
    color: $color-black;;
    text-align: left;
  }
  .product-title {
    text-align: center;
    font-size: 24px;
    color: $color-black;
    padding-bottom: 40px;
  }
  }
  .add-container {
    text-align: center; 
    display: flex;
    justify-content: center;

    .add-items {
      min-width: 700px;
    }
  }
}


</style>
