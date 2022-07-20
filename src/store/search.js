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
      brands: [],
      price: '',
      results: null,
      categoryInteract: false,
      brandInteract: '',
      priceInteract: ''
    }
  },
  actions: {
    async searchProducts(payload) {
      let searchText = ''
      if(payload) {
        searchText = payload  // 검색어가 날라옴
      }
      const res = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/search',
        method: 'POST',
        headers,
        data: {
          searchText,
          searchTags: this.searchTags
        }
      })
      this.results = res.data

      if(this.price.includes('10만원 이하')) {
        const result = await this.results.filter( item => {
          return item.price < 100000
        })
        this.results = result
      }
      else if(this.price.includes('10만원 - 30만원 이하')) {
        const result = this.results.filter( item => {
          return 100000 < item.price && item.price <= 300000
        })
        this.results = result
      }
      else if(this.price.includes('30만원 - 50만원 이하')) {
        const result = this.results.filter( item => {
          return 300000 < item.price && item.price < 500000
        })
        this.results = result
      }
      else if(this.price.includes('50만원 이상')) {
        const result = this.results.filter( item => {
          return 500000 < item.price
        })
        this.results = result
      }
      return res.data // 필터 브랜드 리스트 뽑기 위함, 필터 브랜드 컴포넌트에서 생성시 함수실행이 됨(검색 첫화면 전체 제품이 출력됨)
    }
  }
})
