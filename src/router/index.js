import Vue from 'vue'
import Router from 'vue-router'
//import album_index from '@/components/album_index'
const album_management = r => require.ensure([], () => r(require('@/components/album_management')), 'album_management')
const album_all = r => require.ensure([], () => r(require('@/components/album_all')), 'album_all')
const album_createAndEdit = r => require.ensure([], () => r(require('@/components/album_createAndEdit')), 'album_createAndEdit')

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/album_all'},
    {
      path: '/album_management',
      name: 'album_management',
      component: album_management
    },
    {
      path:"/album_all",
      name:"album_all",
      component: album_all
    },
    {
      path:"/album_createAndEdit",
      name:"album_createAndEdit",
      component: album_createAndEdit
    }
  ]
})
