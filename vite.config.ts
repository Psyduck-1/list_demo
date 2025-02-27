import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { API_BASE_URL, API_PROXY_PREFIX } from './src/config/proxy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 将配置中定义的API前缀的请求代理到目标服务器
      [API_PROXY_PREFIX]: {
        target: API_BASE_URL,
        changeOrigin: true,
        secure: false, // 如果是https接口，需要设置为true
        // 如果API路径结构与代理路径不同，可以使用rewrite重写路径
        rewrite: (path) => path.replace(new RegExp(`^${API_PROXY_PREFIX}`), '')
      }
    }
  }
})
