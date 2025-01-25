import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/index.css'; // 引入全局 CSS
import '@/icons'
import VueLazyload from 'vue-lazyload'; // 引入 vue-lazyload 插件

Vue.use(VueLazyload, {
    preLoad: 1.3, // 设置预加载的高度比例
    error: require('./assets/logo2.png'), // 加载失败时显示的图片
    loading: require('./assets/logo2.png'), // 加载中的图片
    attempt: 1, // 尝试加载的次数
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
