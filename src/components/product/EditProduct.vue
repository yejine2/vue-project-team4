<template>
  <div class="container">
    <h3>상품 수정</h3>

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
        class="input-group-text">상품 상세 사진</label>
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

    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch" />
      <label
        class="form-check-label">Sold Out</label>
    </div>

    <div>
      <label> 재고: </label>
      <label>X</label>
      <input
        v-model="isSoldOut"
        type="radio"
        :value="true" />
      <label for="instock">O</label>
      <input
        v-model="isSoldOut"
        type="radio"
        :value="false" />
    </div>
    <hr />
    <button
      class="btn btn-primary"
      @click="editProduct">
      <i class="fa-solid fa-check"></i>
    </button>     
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useIndexStore } from '~/store/admin.js'

export default {
  props:{ 
    oldTitle: { type: String, default: '' },
    oldPrice: { type: Number, default: 0 },
    oldDescription: { type: String, default: '' },
    oldTags: { type: Array, default: () => [] },
    oldThumbnailBase64: { type: String, default: '' },
    oldIsSoldOut: { type: Boolean, default: false } 
  },
  data(){
    return{
      id: this.$route.params.id,
      productData: {},
      title: this.oldTitle,
      price: this.oldPrice,
      description: this.oldDescription,
      thumbnailBase64: this.oldThumbnailBase64,
      isSoldOut: this.oldIsSoldOut,
      tags: this.oldTags,
      changeThumbnail: false,
      changePhoto: false
    } 
  },
  computed: {
    ...mapStores(useIndexStore)
  },
  methods: {
    editProduct() {
      this.indexStore.editProduct({ 
        id: this.$route.params.id, 
        title: this.title, 
        price: this.price, 
        description: this.description, 
        tags: this.tags.split(','), 
        thumbnailBase64: this.changeThumbnail ? this.thumbnailBase64 : /(\.gif|\.jpg|\.jpeg|\.webp)$/i.test(this.thumbnailBase64) && '', 
        photoBase64: this.changePhoto ? this.photoBase64 : /(\.gif|\.jpg|\.jpeg|\.webp)$/i.test(this.photoBase64) && '', 
        isSoldOut: this.isSoldOut 
        })
    },
    thumbnailBase64Img(event) {
      this.changeThumbnail = true
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
      this.changePhoto = true
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
