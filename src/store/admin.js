import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api'
export const useIndexStore = defineStore('index', {
  state() {
    return {
      allProducts: [],
      transactions: [],
      title: '',
      price: '',
      description: '',
      tags: '',
      thumbnailBase64: '',
      photoBase64: '',
      id: '',
      thumbnail: '',
      isSoldOut: false,
      detailId: '',
      user: '',
      account: '',
      product: '',
      reservation: '',
      timePaid: '',
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
            apikey: 'FcKdtJs202204',
            username: 'team4',
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
        window.location.href='/admin/products'
        console.log(res.data)
        this.allProducts = res.data
      } catch {
        // console.log(error.response.data)
      }
    },

    async allProduct(payload = {}) {
      const { id, title, price, description, tags, thumbnail, isSoldOut } =
        payload
      const res = await axios(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products',
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            apikey: 'FcKdtJs202204',
            username: 'team4',
            masterKey: true,
          },
          data: {
            id,
            title,
            price,
            description,
            tags,
            thumbnail,
            isSoldOut,
          },
        }
      )
      this.allProducts = res.data
    },

    // async allTransactions(payload = {}) {
    //   const { detailId, user, account, product, reservation, timePaid, isCanceled, done } = payload
    //   const res = await axios('https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/all', {
    //     method: 'GET',
    //     headers: {
    //       'content-type': 'application/json',
    //       apikey: 'FcKdtJs202204',
    //       username: 'team4',
    //       masterKey: true
    //     },
    //     data: {
    //       detailId,
    //       user,
    //       account,
    //       product,
    //       reservation,
    //       timePaid,
    //       isCanceled,
    //       done
    //     }
    //   })
    //   this.transactions = res.data
    // },

    // async transactionsCanceled(payload) {
    //   const { detailId, isCanceled, done } = payload
    //   const res = await axios(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/${detailId}`, {
    //     method: 'PUT',
    //     headers: {
    //       'content-type': 'application/json',
    //       apikey: 'FcKdtJs202204',
    //       username: 'team4',
    //       masterKey: true
    //     },
    //     data: {
    //       isCanceled,
    //       done
    //     }
    //   })
    //   console.log(res)
    // },

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
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/${id}`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            apikey: 'FcKdtJs202204',
            username: 'team4',
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
      this.allProducts = res.data
    },
    async deleteProduct(id) {
      await axios(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`,
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            apikey: 'FcKdtJs202204',
            username: 'team4',
            masterKey: true,
          },
        }
      )
      this.allProduct()
    },
  },
})
