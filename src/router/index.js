import Vue from 'vue'
import VueRouter from 'vue-router'
import search from '../components/search.vue'
import song from '../components/song.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/search',
    component: search
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path: '/song/:id',
    name: 'song',
    component: song
  }
]

const router = new VueRouter({
  routes
})

export default router
