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
      user: null
    }
  },
  actions: {
    // 사용자 이메일 마스킹
    // ex) 123456789@gmail.com -> 12*******@gmail.com
    userEmailMasking(email) {
      return maskingFunc.email(email)
    },
    // 사용자 이름 수정
    async editUserInfo(payload) {
      const { displayName = '', oldPassword = '', newPassword = ''} = payload
      const accessToken = window.localStorage.getItem('token')

      if(!displayName.trim() == '') {
        this.user.displayName = displayName
        console.log('Success EditUserName:: ',displayName)
      } else if (!(oldPassword == '' && newPassword == '')) {
        console.log('Success EditUserPassword')
      } else return console.log('유효한 정보를 입력해주세요.')

      await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user',
        method: 'PUT',
        headers: { ...headers, Authorization: `Bearer ${accessToken}` },
        data: {
          displayName,
          oldPassword,
          newPassword
        }
      })
      // const { displayName } = res.data
    },
    // 사용자 비밀번호 수정
    async editUserPassword(oldPassword, newPassword) {
      const accessToken = window.localStorage.getItem('token')
      await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user',
        method: 'PUT',
        headers: { ...headers, Authorization: `Bearer ${accessToken}` },
        data: {
          displayName: '',
          oldPassword,
          newPassword
        }
      })
      console.log('SuccesseditUserPassword!!')
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
	ex1) 원본 데이터 : abcdefg12345@naver.com
		    변경 데이터 : ab**********@naver.com
	ex2) 원본 데이터 : abcdefg12345@naver.com
	      변경 데이터 : ab**********@nav******
	*/
	email : function(str){
		let originStr = str
		let emailStr = originStr.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
		let strLength
		
		if(this.checkNull(originStr) == true || this.checkNull(emailStr) == true){
			return originStr
		}else{
      console.log(emailStr)
			strLength = emailStr.toString().split('@')[0].length - 3
			
			// ex1) abcdefg12345@naver.com => ab**********@naver.com
			return originStr.toString().replace(new RegExp('.(?=.{0,' + strLength + '}@)', 'g'), '*')
		}
	}
}
