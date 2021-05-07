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
        path: 'MusicHall',
        name: 'MusicHall',
        component: () => import('../view/MusicHall/index.vue'),
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
        path: '/MyMusic',
        name: 'MyMusic',
        component: () => import('../view/MyMusic/index.vue'),
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
