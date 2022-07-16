import { defineStore } from 'pinia'
import axios from 'axios'

const headers = {
  'content-type': 'application/json',
  'apikey': 'FcKdtJs202204',
  'username': 'team4'
}

export const useSearchStore = defineStore('search', {
  state() {
    return {
      searchTags: [],
      category: '',
      brand: []
    }
  },
  actions: {
    categoryInter(cate, boolean) {
      this.cate = cate
      this.cateBoolean = boolean
    },
    async searchProducts(payload) {
      let searchText = ''
      if(payload) {
        searchText = payload  // 검색어가 날라옴
      }
      // console.log(searchTags)
      const res = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/search',
        method: 'POST',
        headers,
        data: {
          searchText,
          searchTags: this.searchTags
        }
      })
      return res.data
      // console.log(res)
    }
  }
})
