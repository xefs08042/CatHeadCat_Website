import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host:'127.0.0.1' ,//ip地址
    port: 8081, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    https: false,
    proxy: {
      '/api': {
          target: 'http://localhost:5000',
          secure: false,  // 如果是https接口，需要配置这个参数
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  }
})
