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
      component: () => import('~/components/MyPage/My.vue'),
      meta: {
        // 로그인해야만 접속 할 수 있게 설정
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
        },
        {
          path: 'buying',
          component: () => import('~/components/UserBuyingPage.vue')
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
      path: '/admin/products/edit/:id',
      component: () => import('~/components/EditProduct.vue')
    },
    // {
    //   path: '/detail/:id',
    //   component: ProductDetail
    // },
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
      component: () => import('~/components/search/Search.vue')
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
