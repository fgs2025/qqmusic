import Vue from 'vue'
import VueRouter from 'vue-router'

import musichall from '../view/musichall/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../layout/index.vue'),
    redirect: 'musichall',
    children: [
      {
        path: 'musichall',
        name: 'musichall',
        component:musichall,
        redirect: 'musichall/index',
        children: [
          {
            path: 'index',
            name: 'index',
            component: () => import('../view/index/index.vue'),
          },
          {
            path: 'singer',
            name: 'singer',
            component: () => import('../view/singer/index.vue'),
          },
          {
            path: 'mv',
            name: 'mv',
            component: () => import('../view/mv/index.vue'),
            children: [
              {
                path: 'palymv/:id',
                name: 'palymv',
                component: () => import('../view/mv/components/palyMv.vue')
              }
            ]
          },

        ]
      },
      // {
      //   path: '/myMusic',
      //   name: 'myMusic',
      //   component: () => import('../view/mymusic/index.vue'),
      // },

    ]
  },
  {
    path: '/player',
    name: 'player',
    component: () => import('../view/player/index.vue'),
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => ({ y: 0 }),
})

export default router
