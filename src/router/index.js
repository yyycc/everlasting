import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Shop from '@/components/Shop'
import File from '@/components/File'
import Dialogs from '@/components/Dialogs'
import Excels from '@/components/Excels'
import Grids from '@/components/Grids'
import Home from '@/components/Home'
import ExcelImport from '@/components/ExcelImport'
import Pages from '@/components/Pages'
import Select from '@/components/Select'
import ExcelShow from '@/components/ExcelShow'
import Ferry from '@/components/QueryFerry'
import store from 'vuex'

Excels.install = function(Vue){
  Vue.component('v-excel', Excels);
};
Dialogs.install = function(Vue){
  Vue.component('v-dialog', Dialogs);
};
ExcelImport.install = function(Vue){
  Vue.component('v-excelImport', ExcelImport);
};
Grids.install = function(Vue){
  Vue.component('v-grid', Grids);
};

Pages.install = function(Vue){
  Vue.component('v-page', Pages);
};
Vue.use(Excels);
Vue.use(Dialogs);
Vue.use(Router);
Vue.use(ExcelImport);
Vue.use(Grids);
Vue.use(Pages);
Vue.use(store);

// 页面刷新时，重新赋值token
/*if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
}*/

export default new Router({
  mode: 'history',
  base: '/',
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
    },
    {
      path: '/Home',
      name: './Home',
      component: Home
    },
    {
      path: '/ExcelShow',
      name: './ExcelShow',
      component: ExcelShow
    },
    {
      path: '/Pages',
      name: './Pages',
      component: Pages
    },
    {
      path: '/Select',
      name: './Select',
      component: Select
    },
    {
      path: '/Ferry',
      name: './Ferry',
      component: Ferry
    }
  ]
})
