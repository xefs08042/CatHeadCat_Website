import { createApp, ComponentCustomProperties } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as echarts from 'echarts'
import * as Elicons from "@element-plus/icons-vue";
import $ from 'jquery'
import mitt from 'mitt'     //mitt库，用于全局组件通信

const Mit = mitt()
declare module "vue" {
  export interface ComponentCustomProperties {
    $bus: typeof Mit
  }
}

const app = createApp(App)
for (const name in Elicons) {
    app.component(name, Elicons[name]);
}
app.config.globalProperties.$http = axios
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$bus = Mit      //挂载全局
app.use(router).use(ElementPlus)
app.mount('#app')
