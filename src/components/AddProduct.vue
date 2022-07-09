<template>
  <div class="container">
    <section>
      <h1>제품 추가</h1>

      <article class="info-box">
        <p>썸네일</p>
        <input
          type="file"
          @change="thumbnailBase64Img" />
      </article>
      <article class="info-box">
        <p>상품명</p>
        <input
          v-model="title"
          type="text" />
      </article>
      <article class="info-box">
        <p>태그</p>
        <input
          v-model="tags"
          type="text" />
      </article>
      <article class="info-box">
        <p>상세설명</p>
        <input
          v-model="description"
          type="text" />
      </article>
      <article class="info-box">
        <p>가격</p>
        <input
          v-model.number="price"
          type="text" />
      </article>
      <article class="info-box">
        <p>상세 사진</p>
        <input
          type="file"
          @change="photoBase64Img" />
      </article>

      <button
        class="btn btn-primary"
        @click="addProduct">
        제출하기
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
