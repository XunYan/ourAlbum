import Vue from 'vue'
import Router from 'vue-router'
import album_index from '@/components/album_index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'album_index',
      component: album_index
    }
  ]
})
