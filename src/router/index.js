import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Shop from '@/components/Shop'
import File from '@/components/File'
import Dialogs from '@/components/Dialogs'
import Excels from '@/components/Excels'
import Grids from '@/components/Grids'

Excels.install = function(Vue){
  Vue.component('v-excel', Excels);
};
Dialogs.install = function(Vue){
  Vue.component('v-dialog', Dialogs);
};
Vue.use(Excels);
Vue.use(Dialogs);
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Login',
      component: Login
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
    },
    {
      path: '/Grids',
      name: './Grids',
      component: Grids
    }
  ]
})
