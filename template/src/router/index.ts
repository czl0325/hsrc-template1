import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'
import store from "@/store"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'Home', component: () => import("@/views/home/Home.vue"), meta: { title: '首页', showTab: true } },
    { path: '/message', name: 'Message', component: () => import('@/views/message/Message.vue'), meta: { title: '消息', showTab: true } },
    { path: '/me', name: 'Me', component: () => import('@/views/me/Me.vue'), meta: { title: '我的', showTab: true } },
    { path: '/login', name: 'Login', component: () => import('@/views/login/Login.vue'), meta: { title: '登录' } },
    { path: '/:catchAll(.*)', redirect: '/home', hidden: true }
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      if (savedPosition) {
        resolve(savedPosition)
      } else {
        // 异步滚动操作
        setTimeout(() => {
          resolve({ left: 0, top: 0 })
        }, 0)
      }
    })
  }
} as RouterOptions)

router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  } else {
    document.title = ''
  }
  if (from.name) {
    const fp = from.path.split('/').filter(function (n: string) {
      return n && n.trim()
    })
    const tp = to.path.split('/').filter(function (n: string) {
      return n && n.trim()
    })
    if (to.name === 'Login') {
      store.commit('cache/DEL_ALL_CACHED_VIEW')
    } else {
      if (tp.length >= fp.length) {
        store.commit('cache/ADD_CACHED_VIEW', from.name)
      } else {
        store.commit('cache/DEL_CACHED_VIEW', from.name)
      }
    }
  }
  next()
})

export default router
