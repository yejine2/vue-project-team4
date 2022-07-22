import { defineStore } from 'pinia'
import axios from 'axios'

const { VITE_API_KEY, VITE_USERNAME } = import.meta.env

const headers = {
  'content-type': 'application/json',
  'apikey': VITE_API_KEY,
  'username': VITE_USERNAME
}


export const useUserStore = defineStore('user', {
  state() {
    return {
      user: null,
      banks: null,
      userAccountList: null,
      totalBalance: null,
      transactionList: {},
      transactionFilter: 'all',
      transactionDetail: {
        detailId: '',
        done: false,
        isCanceled: false,
        account: {
          bankName: '',
          accountNumber: ''
        },
        product: {
          productId: '',
          title: '',
          price: 0,
          description: '',
          tags: [],
          thumbnail: null,
        }
      },
      isAll: 0,
      isWait: 0,
      isDone: 0,
      isCanceled: 0
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
    // 구매 내역 조회
    async readTransactionList() {
      const accessToken = window.localStorage.getItem('token')

      const res = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/details',
        method: 'GET',
        headers: { ...headers, Authorization: `Bearer ${accessToken}` }
      })

      this.transactionList = res.data
      this.isAll = this.transactionList.length
      this.isDone = 0
      this.isCanceled = 0
      this.isWait = 0
      this.transactionList.forEach(list => {
        if (list.done == false && list.isCanceled == false) {
          this.isWait += 1
        } else if (list.done == true && list.isCanceled == false) {
          this.isDone+= 1
        } else if (list.isCanceled == true) {
          this.isCanceled += 1
        }
      })
    },
    // 구매 내역 필터
    filteredList() {
      switch (this.transactionFilter) {
        case 'all':
          return this.transactionList
        case 'wait':
          return this.transactionList.filter(list => !list.done && !list.isCanceled)
        case 'done':
          return this.transactionList.filter(list => list.done && !list.isCanceled)
        case 'canceled':
          return this.transactionList.filter(list => list.isCanceled)
      }
      this.readTransactionList()
    },
    async transactionDone(id) {
      const accessToken = window.localStorage.getItem('token')
      
      await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/ok',
        method: 'POST',
        headers: { ...headers, Authorization: `Bearer ${accessToken}` },
        data: {
          detailId: id
        }
      })
      await this.readTransactionList()
      await this.getTransactionDetail(id)
    },
    async transactionCancel(id) {
      const accessToken = window.localStorage.getItem('token')
      
      await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/cancel',
        method: 'POST',
        headers: { ...headers, Authorization: `Bearer ${accessToken}` },
        data: {
          detailId: id
        }
      })
      this.readTransactionList()
      this.getTransactionDetail(id)
    },
    async getTransactionDetail(id) {
      const accessToken = window.localStorage.getItem('token')

      const res = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/detail',
        method: 'POST',
        headers: { ...headers, Authorization: `Bearer ${accessToken}` },
        data: {
          detailId: id
        }
      })
      
      this.transactionDetail.detailId = res.data.detailId
      this.transactionDetail.done = res.data.done
      this.transactionDetail.isCanceled = res.data.isCanceled
      this.transactionDetail.product.productId = res.data.product.productId
      this.transactionDetail.product.title = res.data.product.title
      this.transactionDetail.product.price = res.data.product.price
      this.transactionDetail.product.description = res.data.product.description
      this.transactionDetail.product.tags = res.data.product.tags
      this.transactionDetail.product.thumbnail = res.data.product.thumbnail
      this.transactionDetail.account.bankName = res.data.product.bankName
      this.transactionDetail.account.accountNumber = res.data.product.accountNumber
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
