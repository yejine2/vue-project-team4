<template>
  <div class="container">
    <h1>상품 수정</h1>
    <form>
      <div>
        <label>상품 이름: </label>
        <input
          v-model="title"
          class="form-input"
          type="text"
          name="title" />
      </div>
      <div>
        <label>상품 가격: </label>
        <input
          v-model.number="price"
          class="form-input"
          type="text"
          name="price" />        
      </div>
      <div>
        <label>상품 설명: </label>
        <textarea
          v-model="description"
          class="form-input"
          name="description"></textarea>      
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
      <div>
        <label>상품 태그: </label>
        <input
          v-model="tags"
          type="text"
          name="tags" />
      </div>
      <div>
        <label>상품 썸네일: </label>
        <div>
          <img
            :src="thumbnailBase64"
            alt="thumbnail" />
        </div>
        <input
          type="file"
          @change="thumbnailBase64Img" />
      </div>
      <div>
        <label>상품 상세사진: </label>
        <div>
          <img
            :src="photoBase64"
            alt="photo" />
        </div>
        <input
          type="file"
          @change="photoBase64Img" />
      </div> 
    </form>
    <div>
      <button
        class="btn btn-primary"
        @click="editProduct">
        수정완료
      </button>      
    </div>        
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


<!-- <script>
import { mapStores } from 'pinia'
import { useIndexStore } from '~/store/admin.js'

export default {
  props:{ oldTitle: { type: String, default: '' }, oldPrice: { type: String, default: '' }, oldDescription: { type: String, default: '' }, oldTags: { type: Array, default: () => [] }, oldThumbnailBase64: { type: String, default: '' }, oldIsSoldout: { type: Boolean, default: false } },
  data(){
    return{
      productData: {},
      title: this.oldTitle,
      price: this.oldPrice,
      description: this.oldDescription,
      thumbnail: null,
      thumbnailBase64: null,
      photo: null,
      photoBase64: null,
      isSoldOut: false,
      tags: []
    } 
  },
    mounted(){
    this.getCurProduct()
    },
    methods: {
      async getCurProduct(){ 
        const { data } = await useIndexStore.get(this.$route.params.id)
        this.title = data.title
        this.price = data.price
        this.description = data.description
        this.tags = data.tags.join(',')
        this.thumbnail = data.thumbnail
        this.photo = data.photo
        this.isSoldOut = data.isSoldOut
      },
      async editProduct(){
        await useIndexStore.put(this.$route.params.id, {
          title : this.title,
          price : this.price,
          description: this.description,
          tags: this.tags.split(','),
          thumbnailBase64: this.thumbnailBase64,
          photoBase64: this.photoBase64,
          isSoldOut: this.isSoldOut
        })
        this.getCurProduct()
        alert('수정완료')
        this.$router.go(-1)
      },
      selectFile(event) {
        const { files } = event.target 
        for (const file of files) {
          const reader = new FileReader()
          reader.readAsDataURL(file) 
          reader.addEventListener('load', () => {          
            if (event.target.id === 'thumbnail') {            
              this.thumbnailBase64 = reader.result
            } else {
              this.photoBase64 = reader.result
            }
          }
        )
      }
    }
  }    
}
</script> -->

<style lang="scss" scoped>
</style>
