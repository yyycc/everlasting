// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.prototype.site = '/api/';
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})


var lists = [{name: 'cyy', sex: 'M', age: 9}, {name: 'ever', sex: 'F', age: 7}, {name: 'lucy', sex: 'F', age: 8}]
var object = {name: 'cyy', sex: 'M', age: 9}
new Vue({
  el: '#fifth',
  data: {
    seen: false
  }
})
new Vue({
  el: '#sixth',
  data: {
    url: 'http://lovecyy.org.cn:8089/'
  }
})
new Vue({
  el: '#seventh',
  data: {
    meg: 'cyy is fine'
  },
  methods: {
    doSth: function () {
      alert("cyy's fine")
    },
    reverse: function () {
      this.meg = this.meg.split('').reverse().join('');
    }
  }
})

var vm2 = new Vue({
  el: '#eighth',
  data: {
    message: 'sth and sth',
    ok: true,
    vif: false,
    vshow: false
  },
  methods: {},
  filters: {
    capitalize: function (value, arg1) {
      if (!value) return ''
      value = value.toString();
      return arg1 + value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
// document.write(vm2.$el === document.getElementById('eighth'))
var vm1 = new Vue({
  el: '#ninth',
  data: {
    num: Math.random()
  },
  filters: {
    add: function (value, arg1) {
      return value + arg1
    }
  }
})
new Vue({
  el: '#tenth',
  data: {
    terms: lists,
    object: object
  },
  methods: {},
  filters: {}
})

var eleven = new Vue({
  el: '#eleventh',
  data: {
    meg: 'QWERTYUIOP'
  },
  methods: {
    reverseM: function () {
      return this.meg.split('').reverse().join('');
    }
  },
  filters: {},
  computed: {
    // 计算属性的getter
    reverseC: function () {
      return this.meg.split('').reverse().join('');
    }
  }
})
eleven.meg = 'ASDFGHJKL'

var vm = new Vue({
  el: '#twelfth',
  data: {
    name: 'Google',
    url: 'http://www.google.com'
  },
  computed: {
    site: {
      // getter
      get: function () {
        return this.name + ' ' + this.url
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.name = names[0]
        this.url = names[names.length - 1]
      }
    }
  }
})
// 调用 setter， vm.name 和 vm.url 也会被对应更新
// vm.site = '菜鸟教程 http://www.runoob.com';
// document.write('name: ' + vm.name);
// document.write('<br>');
// document.write('url: ' + vm.url);
// 现金get,执行vm.site后进set之后再进get

/*test-2的js*/
new Vue({
 el: '#one',
 data:{
   active: true,
   colorActive: true,
   squareClass: 'square',
   dangerClass: 'danger'
 },
 methods:{},
 filters: {},
 computed: {
    // 计算属性的getter
  }
})

new Vue({
 el: '#two',
 data:{
   picked: 'cyy'
 },
 methods:{},
 filters: {},
 computed: {
    // 计算属性的getter
  }
})
