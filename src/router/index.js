import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Shop from '@/components/Shop'
import File from '@/components/File'
import Dialogs from '@/components/Dialogs'

Dialogs.install = function(Vue){
  Vue.component('v-dialog', Dialogs);
}
Vue.use(Dialogs)
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/File',
      name: './File',
      component: File
    }
  ]
})
