import { createRouter, createWebHistory } from 'vue-router'

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
      },
      children: [
        {
          path: 'profile',
          component: () => import('~/components/EditUserProfile.vue') 
        },
        {
          path: 'account',
          component: () => import('~/components/UserAccountPage.vue')
        }
      ]
    },
    {
      path: '/admin/products',
      component: () => import('~/components/Products.vue')
    },
    {
      path: '/admin/products/add',
      component: () => import('~/components/AddProduct.vue')
    },
    {
      path: '/admin/products/edit',
      component: () => import('~/components/EditProduct.vue')
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
