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
      component: () => import('~/components/UserPage.vue'),
      meta: {
        // 로그인헤야만 접속 할 수 있게 설정
        auth: true
      }
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
      path: '/search',
      component: () => import('~/components/Search.vue'),
      children: [
        
      ]
    },
    {
      path: '/admin',
      component: () => import('~/views/Admin.vue'),
    },
    {
      path: '/:notfound(.*)*',
      component: () => import('~/views/NotFound.vue')
    },
  ]
})
