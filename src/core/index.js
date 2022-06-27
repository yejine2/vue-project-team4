import axios from 'axios'

// 로그인 사용자인 경우 token 유효하게 하는 함수
export async function validateTokenUser() {
  const accessToken = window.localStorage.getItem('token')
  if (!accessToken) throw ''
  let res
  try {
    res = await axios({
      url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'apikey': 'FcKdtJs202204',
        'username': 'team4',
        'masterkey': true,
        'Authorization': `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    // console.log(error)
  }
  return await res.data
}
