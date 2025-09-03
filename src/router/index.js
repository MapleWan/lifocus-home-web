import { createRouter, createWebHistory } from 'vue-router'
import { getTokens } from '../utils/auth.js'
import { MessagePlugin } from 'tdesign-vue-next'
import Layout from '@/components/layout/index.vue'
// 白名单路由
const whiteList = ['/login', '/register', '/404']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard-top',
      component: Layout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/dashboard/index.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/index.vue'),
    },
    {
      path: '/todo',
      name: 'todo-top',
      component: Layout,
      children: [
        {
          path: '',
          name: 'todo',
          component: () => import('@/views/todo/index.vue'),
        },
      ],
    },
    {
      path: '/album',
      name: 'album-top',
      component: Layout,
      children: [
        {
          path: '',
          name: 'album',
          component: () => import('@/views/album/index.vue'),
        },
      ],
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('@/views/error/404.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const { accessToken } = getTokens()

  // 如果在白名单中，直接访问
  if (whiteList.includes(to.path)) {
    next()
    return
  }

  // 如果没有 token 且不在白名单中，重定向到登录页
  if (!accessToken) {
    // next()
    MessagePlugin.error({ content: '请先登录' })
    next('/login')
    return
  }

  // 其他情况，正常访问
  next()
})

export default router
