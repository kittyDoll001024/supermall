import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt'
// import toast from './components/common/toast'
import FastClick from 'fastclick'
// 图片懒加载
import lazyPlugin from 'vue3-lazy'

// 解决移动端 300ms 延迟
FastClick.attach(document.body)

const app = createApp(App);
app.use(router)
app.use(store)
app.use(lazyPlugin, {
  // 懒加载代替图片
  loading: require("./assets/img/common/src=http___zhengyongshun.com_wp-content_uploads_2017_02_timg-1.gif&refer=http___zhengyongshun.gif")
})
// app.use(toast)
app.config.globalProperties.$mybus = new mitt
app.mount("#app")


