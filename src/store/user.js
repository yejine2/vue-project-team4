import { defineStore } from 'pinia'
import axios from 'axios'

const headers = {
  'content-type': 'application/json',
  'apikey': 'FcKdtJs202204',
  'username': 'team4'
}


export const useUserStore = defineStore('user', {
  state() {
    return {
      user: null,
      banks: null,
      userAccountList: null,
      totalBalance: null
    }
  },
  actions: {
    // 사용자 이메일 마스킹
    // ex) 123456789@gmail.com -> 1*******9@gmail.com
    userEmailMasking(email) {
      return maskingFunc.email(email)
    },
    // 사용자 정보 수정
    async editUserInfo(payload) {
      const { displayName = '', profileImgBase64 = '', oldPassword = '', newPassword = ''} = payload
      const accessToken = window.localStorage.getItem('token')

      const res = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user',
        method: 'PUT',
        headers: { ...headers, Authorization: `Bearer ${accessToken}` },
        data: {
          displayName,
          profileImgBase64,
          oldPassword,
          newPassword
        }
      })

      this.user = res.data
    },
    // 은행 전체 목록 조회
    async chooseBank() {
      const accessToken = window.localStorage.getItem('token')

      const res = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account/banks',
        method: 'GET',
        headers: { ...headers, Authorization: `Bearer ${accessToken}` },
      })

      this.banks = res.data
      return res
    },
    // 사용자 계좌 목록 및 잔액 조회
    async getUserAccountList() {
      const accessToken = window.localStorage.getItem('token')

      const res = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
        method: 'GET',
        headers: {  ...headers, Authorization: `Bearer ${accessToken}` }
      })

      this.userAccountList = res.data.accounts
      this.totalBalance = res.data.totalBalance
    },
    // 계좌 연결
    async addAccount(payload) {
      const { bankCode, accountNumber, phoneNumber, signature } = payload
      const accessToken = window.localStorage.getItem('token')

      await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
        method: 'POST',
        headers: { ...headers, Authorization: `Bearer ${accessToken}` },
        data: {
          bankCode,
          accountNumber,
          phoneNumber,
          signature
        }
      })

      this.getUserAccountList()
      this.chooseBank()
    },
    // 계좌 해지
    async deleteAccount(payload) {
      const { accountId, signature } = payload
      const accessToken = window.localStorage.getItem('token')

      await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
        method: 'DELETE',
        headers: { ...headers, Authorization: `Bearer ${accessToken}` },
        data: {
          accountId,
          signature
        }
      })
      this.getUserAccountList()
      this.chooseBank()
    },
    async getBoughtList() {
      const accessToken = window.localStorage.getItem('token')

      const res = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/details',
        method: 'GET',
        headers: { ...headers, Authorization: `Bearer ${accessToken}` }
      })
      console.log(res)
    }
  }
})


let maskingFunc = {
	checkNull : function (str){
		if(typeof str == 'undefined' || str == null || str == ''){
			return true
		}
		else{
			return false
		}
	},
	/*
	※ 이메일 마스킹
	ex) 원본 데이터 : abcdefg12345@naver.com
		  변경 데이터 : a**********5@naver.com
	*/
	email : function(str){
		let originStr = str
		let emailStr = originStr.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
		let strLength
		
		if(this.checkNull(originStr) == true || this.checkNull(emailStr) == true){
			return originStr
		}else{
			strLength = emailStr.toString().split('@')[0].length - 2
			
			// ex1) abcdefg12345@naver.com => a**********5@naver.com
			return originStr.toString().replace(new RegExp('.(?=.{1,' + strLength + '}@)', 'g'), '*')
		}
	}
}
