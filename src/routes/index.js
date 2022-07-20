import { createRouter, createWebHistory } from 'vue-router'
import EditProduct from '~/components/product/EditProduct.vue'
import ProductDetail from '~/components/product/ProductDetail.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: () => import('~/views/Home.vue')
    },
    {
      path: '/my',
      component: () => import('~/views/my/My.vue'),
      meta: {
        // 로그인해야만 접속 할 수 있게 설정
        auth: true
      },
      children: [
        {
          path: 'profile',
          component: () => import('~/views/my/MyProfile.vue') 
        },
        {
          path: 'account',
          component: () => import('~/views/my/MyAccount.vue')
        },
        {
          path: 'buying',
          component: () => import('~/views/my/MyBuying.vue')
        }
      ]
    },
    {
      path: '/admin/products',
      component: () => import('~/components/product/Products.vue')
    },
    {
      path: '/admin/products/add',
      component: () => import('~/components/product/AddProduct.vue')
    },
    {
      path: '/admin/products/edit/:id',
      name: 'EditProduct',
      component: EditProduct,
      props: true
    },
    {
      path: '/admin/products/detail/:id',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/login',
      component: () => import('~/views/SignIn.vue'),
    },
    {
      path: '/join',
      component: () => import('~/views/SignUp.vue'),
    },
    {
      path: '',
      component: () => import('~/components/search/Search.vue'),
      children: [
        {
          path: '/search',
          component: () => import('~/components/search/SearchMain.vue'),
        },
        {
          path: '/search/:productId',
          component: () => import('~/components/search/SearchDetail.vue'),
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('~/views/Admin.vue'),
      meta: {
        // 로그인해야만 접속 할 수 있게 설정
        auth: true
      }
    },
    {
      path: '/:notfound(.*)*',
      component: () => import('~/views/NotFound.vue')
    },
  ]
})
