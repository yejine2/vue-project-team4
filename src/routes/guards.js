import router from './index'
import { useAuthStore } from '~/store/auth'
import { validateTokenUser } from '~/core'

router.beforeEach(async to => {
  const authStore = useAuthStore()
  let user = null
  try {
    user = await validateTokenUser()
    authStore.user = user
  } catch(error) {
    console.log(error)
  } finally {
    authStore.logInLoading = false
  }
  
  if (to.meta.auth) {
    if (user && user.email === 'admin@gmail.com' && user.displayName === 'admin' && to.fullPath.includes('/my')) {
      return '/admin'
    }  
    if (!user) {
      return '/login'
    } 
  }

  if (user && to.fullPath.includes('/login')) {
    return '/'
  }
  if (user &&  user.email !== 'admin@gmail.com' && user.displayName !== 'admin' && to.fullPath.includes('/admin')) {
    return '/'
  }
  return true
})
