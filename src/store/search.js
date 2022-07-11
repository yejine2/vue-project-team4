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
      category: ''
    }
  },
  actions: {
    async searchProducts(payload) {
      const searchText = payload  // 검색어가 날라옴
      let searchTags = []
      if(this.category !== '') {
        searchTags.push(this.category) // 카테고리를 골랐을때
      } else {
        searchTags.push(searchText) // 카테고리를 고르지않고 전체검색시
        // 나중에는 검색어의 띄어쓰기로 문자분리를 하고 첫번째 문자를 할당시키자
      }
      console.log(searchTags)
      const res = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/search',
        method: 'POST',
        headers,
        data: {
          searchText,
          searchTags
        }
      })
      console.log(res.data)
    }
  }
})
