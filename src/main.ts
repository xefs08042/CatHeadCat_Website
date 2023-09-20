import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as echarts from 'echarts'
import * as Elicons from "@element-plus/icons-vue";
import $ from 'jquery'

const app = createApp(App)
for (const name in Elicons) {
    app.component(name, Elicons[name]);
}
app.config.globalProperties.$http = axios
app.config.globalProperties.$echarts = echarts
app.use(router).use(ElementPlus)
app.mount('#app')
