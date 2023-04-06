

import Vue from 'vue'
import VueRouter from 'vue-router'
import MoveTrack from '../views/MoveTrack.vue'
import AudioTrack from '@/views/AudioTrack'

Vue.use(VueRouter)

const routes = [
  {
    path: '/moveTrack',
    name: 'MoveTrack',
    component: MoveTrack
  },
  {
    path:'/audioTrack',
    name:'AudioTrack',
    component:AudioTrack
  },
  {
    path:'/gsapMove',
    name:'GsapMove',
    component:()=>import('../views/GsapMove.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
