import { defineStore } from 'pinia'
import axios from 'axios'

const { VITE_API_KEY, VITE_USERNAME } = import.meta.env
const BASE_URL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api'

export const useIndexStore = defineStore('index', {
  state() {
    return {
      product: {},
      allProducts: [],
      transactions: [],
      title: '',
      price: 0,
      description: '',
      tags: '',
      thumbnailBase64: '',
      photoBase64: '',
      id: '',
      thumbnail: '',
      isSoldOut: false,
      detailId: '',
      isCanceled: false,
      done: false,
    }
  },
  actions: {
    async addProduct(payload) {
      const { title, price, description, tags, thumbnailBase64, photoBase64 } =
        payload
      try {
        const res = await axios({
          url: `${BASE_URL}/products`,
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            apikey: VITE_API_KEY,
            username: VITE_USERNAME,
            masterKey: true,
          },
          data: {
            title,
            price,
            description,
            tags,
            thumbnailBase64,
            photoBase64,
          },
        })
        console.log(res.data)
        this.allProducts = res.data
        // this.$router.push('/admin/products')
        window.location.href='/admin/products'
      } catch {
        // console.log(error.response.data)
      }
    },

    async allProduct() {
      const res = await axios('https://asia-northeast3-heropy-api.cloudfunctions.net/api/products', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          apikey: VITE_API_KEY,
          username: VITE_USERNAME,
          masterKey: true
        }
      })
      console.log(res.data)
      this.allProducts = res.data
    },

    async allTransactions() {
      const res = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/all',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          apikey: VITE_API_KEY,
          username: VITE_USERNAME,
          masterKey: true
        }
      })
      console.log(res.data)
      this.transactions = res.data
    },

    async transactionsCanceled(payload) {
      const { detailId, isCanceled, done } = payload
      const res = await axios({
        url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/${detailId}`,
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          apikey: VITE_API_KEY,
          username: VITE_USERNAME,
          masterKey: true
        },
        data: {
          isCanceled,
          done
        }
      })
      console.log(res.data)
      this.transactions = res.data

      await this.allTransactions()
    },

    async productDetail(id) {
      const res = await axios(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          apikey: VITE_API_KEY,
          username: VITE_USERNAME
        }
      })
      console.log(res.data)
      this.product = res.data
    },

    async editProduct(payload) {
      const {
        id,
        title,
        price,
        description,
        tags,
        thumbnailBase64,
        photoBase64,
        isSoldOut,
      } = payload
      const res = await axios(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            apikey: VITE_API_KEY,
            username: VITE_USERNAME,
            masterKey: true,
          },
          data: {
            title,
            price,
            description,
            tags,
            thumbnailBase64,
            photoBase64,
            isSoldOut,
          },
        }
      )
      this.product = res.data
      // this.$router.push('/admin/products')
      window.location.href='/admin/products'
    },
    async deleteProduct(id) {
      await axios(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`,
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            apikey: VITE_API_KEY,
            username: VITE_USERNAME,
            masterKey: true,
          },
        }
      )
      this.allProduct()
    },
  },
})
