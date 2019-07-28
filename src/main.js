// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/index'
// import App from './App'
import Cyy from './Cyy'
import router from './router'
import VueResource from 'vue-resource'
import Axios from 'axios'
Vue.use(Axios)

Axios.defaults.headers.common['_token'] = localStorage.token;

// 添加请求拦截器
Axios.interceptors.request.use(config => {
  debugger
// 在发送请求之前做些什么
//判断是否存在token，如果存在将每个页面header都添加token
  if (localStorage.token) {
    config.headers.common['_token'] = localStorage.token
  }

  return config;
}, error => {
// 对请求错误做些什么
  return Promise.reject(error);
});

// http response 拦截器
Axios.interceptors.response.use(
  response => {
    debugger
    // 401 如果有token就更新token再次发送氢气，没有token就跳到登录页面重新登录
    if (response.data.code == 401) {
      if (response.headers._token) {
        response.config.headers.common['_token'] = response.headers._token;
        return Axios.request(response.config);
      } else {
        router.replace({
          path: '/',
          query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
        })
      }
    } else {
      return response;
    }
  },
  error => {
    debugger
    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.$store.commit('del_token');
          router.replace({
            path: '/',
            query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
          })
      }
    }
    return Promise.reject(error.response.data)
  });


Vue.config.productionTip = false;
// Vue.prototype.site = '/api/';
Vue.use(VueResource);
/* eslint-disable no-new */
/*new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});*/
new Vue({
  el: '#cyy',
  router,
  store,
  Axios,
  components: {Cyy},
  template: '<Cyy/>'
});
