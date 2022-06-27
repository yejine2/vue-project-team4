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
      }
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
      path: '/admin',
      component: () => import('~/components/AdminPage.vue'),
    },
    {
      path: '/:notfound(.*)*',
      component: () => import('~/views/NotFound.vue')
    },
  ]
})
