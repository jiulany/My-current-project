import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Message from 'vue-m-message'
import Cookies from 'js-cookie'



import store from './store/index.js'
import * as api from './api/api.js'
import router from './router/router.js'
import 'vuetify/dist/vuetify.min.css'
import './assets/css/material-Icons.css'
import 'babel-polyfill' //支持IE11和Safari 9 
Vue.use(Message) // will mount `Vue.prototype.$message`
Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(VueAwesomeSwiper, /* { default global options } */ ) //轮播
Vue.prototype.$api = api
Vue.config.productionTip = false
Vue.prototype.$Cks = Cookies

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')