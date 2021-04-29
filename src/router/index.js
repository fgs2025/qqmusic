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
        name: '音乐馆',
        component: () => import('../view/MusicHall/index.vue'),
        redirect: 'MusicHall/index',
        children: [
          {
            path: 'index',
            name: '首页',
            component: () => import('../view/index/index.vue'),
          },
          {
            path: 'singer',
            name: '歌手',
            component: () => import('../view/singer/index.vue'),
          }
        ]
      },
      {
        path: '/MyMusic',
        name: '我的音乐',
        component: () => import('../view/MyMusic/index.vue'),
      },

    ]
  },
  {
    path: '/player',
    name: '音乐播放器',
    component: () => import('../view/player/index.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
