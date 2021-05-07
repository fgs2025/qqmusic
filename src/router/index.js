import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../layout/index.vue'),
    redirect: 'MusicHall',
    children: [
      {
        path: 'musicHall',
        name: 'musicHall',
        component: () => import('../view/musicHall/index.vue'),
        redirect: 'MusicHall/index',
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
          }
        ]
      },
      {
        path: '/myMusic',
        name: 'myMusic',
        component: () => import('../view/myMusic/index.vue'),
      },

    ]
  },
  {
    path: '/player',
    name: 'player',
    component: () => import('../view/player/index.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
