<template>
  <div class="container">
    <section>
      <h3>제품 추가</h3>

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

</style>
