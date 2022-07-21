import { createRouter, createWebHistory } from 'vue-router'
import Home from '~/views/Home.vue'
import UserPage from '~/components/UserPage.vue'
import EditUserProfile from '~/components/EditUserProfile.vue'
import UserAccountPage from '~/components/UserAccountPage.vue'
import Products from '~/components/Products.vue'
import AddProduct from '~/components/AddProduct.vue'
import EditProduct from '~/components/EditProduct.vue'
import SignIn from '~/views/SignIn.vue'
import SignUp from '~/views/SignUp.vue'
import SearchMain from '~/components/search/SearchMain.vue'
import SearchDetail from '~/components/search/SearchDetail.vue'
import Admin from '~/views/Admin.vue'
import NotFound from '~/views/NotFound.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/my',
      component: UserPage,
      meta: {
        // 로그인해야만 접속 할 수 있게 설정
        auth: true
      },
      children: [
        {
          path: 'profile', // /my/profile
          component: EditUserProfile
        },
        {
          path: 'account',
          component: UserAccountPage
        }
      ]
    },
    {
      path: '/admin/products',
     component: Products
    },
    {
      path: '/admin/products/add',
      component: AddProduct
    },
    {
      path: '/admin/products/edit/:id',
      component: EditProduct
    },
    // {
    //   path: '/detail/:id',
    //   component: ProductDetail
    // },
    {
      path: '/login',
      component: SignIn,
      // /login/profile
    },
    {
      path: '/join',
      component: SignUp,
    },
    {
      path: '/search',
      component: SearchMain
    },
    {
      path: '/search/:productId',
      component: SearchDetail,
    },
    {
      path: '/admin',
      component: Admin,
      meta: {
        // 로그인해야만 접속 할 수 있게 설정
        auth: true
      }
    },
    {
      path: '/:notfound(.*)*',
      component: NotFound
    },
  ]
})
