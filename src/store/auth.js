import { defineStore } from 'pinia'
import axios from 'axios'

const headers = {
  'content-type': 'application/json',
  'apikey': 'FcKdtJs202204',
  'username': 'team4'
}

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      user: null,
      logInLoading: true
    }
  },
  actions: {
    async signUp(payload) {
      const { email, password, displayName} = payload
      const res = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
        method: 'POST',
        headers,
        data: {
          email,
          password,
          displayName
        }
      })
      const { user, accessToken } = res.data
      window.localStorage.setItem('token', accessToken)
      this.user = user
    },
    async signIn(payload) {
      const { email, password } = payload
      const res = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
        method: 'POST',
        headers,
        data: {
          email,
          password,
        }
      })
      const { user, accessToken } = res.data
      window.localStorage.setItem('token', accessToken)
      this.user = user
    },
    async signOut() {
      const accessToken = window.localStorage.getItem('token')
      await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout',
        method: 'POST',
        headers: { ...headers, Authorization: `Bearer ${accessToken}`
        }
      })
      window.localStorage.removeItem('token')
      this.user = null
    }
  }
})
