<template>
  <tr>
    <td>
      <img
        v-if="product.thumbnail"
        style="width: 100px; height: 100px;"
        :src="product.thumbnail"
        :alt="product.title"
        @click="$router.push(`/admin/products/detail/${product.id}`)" />
    </td>
    <td>{{ product.title }}</td>
    <td>{{ product.tags.join(' / ') }}</td>
    <td><i class="fa-solid fa-won-sign"></i> {{ getPrice }}</td>
    <td>
      <RouterLink
        :to="{
          name: 'EditProduct',
          params: {
            id: product.id,
            oldTitle: product.title,
            oldPrice: product.price,
            oldDescription: product.description,
            oldTags: product.tags.toString(),
            oldThumbnailBase64: product.thumbnails,
            oldIsSoldOut: product.isSoldOut
          }
        }"
        class="btn btn-outline-secondary">
        <i class="fa-regular fa-pen-to-square"></i>
      </RouterLink>
    </td>
    <td>
      <button
        class="btn btn-outline-danger"
        @click="deleteProduct(product.id)">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </td>
  </tr>
  

  <!-- <div class="container">
    <img
      v-if="product.thumbnail"
      style="width: 225px; height: 225px;"
      :src="product.thumbnail"
      :alt="product.title"
      @click="$router.push(`/admin/products/detail/${product.id}`)" />
    <h4>{{ product.title }}</h4>
    <h4>{{ product.tags.join(' / ') }}</h4>
    <h4>{{ getPrice }}원</h4>

    <RouterLink
      :to="{
        name: 'EditProduct',
        params: {
          id: product.id,
          oldTitle: product.title,
          oldPrice: product.price,
          oldDescription: product.description,
          oldTags: product.tags.toString(),
          oldThumbnailBase64: product.thumbnails,
          oldIsSoldOut: product.isSoldOut
        }
      }"
      class="btn btn-outline-secondary">
      <i class="fa-regular fa-pen-to-square"></i>
    </RouterLink>

    <button
      class="btn btn-outline-danger"
      @click="deleteProduct(product.id)">
      <i class="fa-regular fa-trash-can"></i>
    </button>
  </div> -->
</template>

<script>
import { mapStores } from 'pinia'
import { useIndexStore } from '~/store/admin.js'

export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapStores(useIndexStore),
        getPrice() {
      return this.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },
  methods: {
    deleteProduct(id) {
      this.indexStore.deleteProduct(id)
   }
  }
}
</script>

<style lang="scss" scoped>
@import "../node_modules/bootstrap/scss/bootstrap.scss";

img {
  background-color: #f4f4f4;
  border-radius: 12px;
}

td {
  border: 0.5px solid $gray-200;
   white-space: nowrap;
  vertical-align: middle;
  text-align: center;
  &:nth-child(4) {
    text-align: start;
  }
}
</style>
