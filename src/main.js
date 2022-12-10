import Vue from 'vue'
import App from './App.vue'

import router from '/src/router/index.js'
// 引入注册全局组件
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import Pagination from '@/components/Pagination'
// 引入仓库
import store from './store'
// 模拟数据
import mockServe from '/src/mock/mockServe.js'
import 'swiper/css/swiper.css'

// 引入API
import * as API from '@/api'

// 映入elment-ui
import {MessageBox } from 'element-ui'

// 引入表单验证
import '@/plugs/validate'

// 懒加载
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
import loadimage from '@/assets/images/mao.jpg'
Vue.use(VueLazyload, {
  loading: loadimage,
})

Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.config.productionTip = false
// import {getContainList} from './api'
// getContainList()
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    // 注册全局事件总线
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  }
}).$mount('#app')
