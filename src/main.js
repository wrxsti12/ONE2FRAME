import { createApp } from 'vue'

// 1. 核心 Vue 組件
import App from './App.vue'

// 2. 路由 (必須)
import router from './router'

// 3. 樣式和動畫套件 (請確保這些依賴已經透過 npm install 正確安裝)
import 'animate.css'
import 'aos/dist/aos.css'
import AOS from 'aos'
import './assets/reset.css' // 假設你的 reset.css 在這個路徑

// 初始化動畫 (只執行一次，並使用你想要的配置)
AOS.init({
  once: true, // 確保動畫只執行一次
})

const app = createApp(App)

// 4. 使用路由
app.use(router)

// 5. 掛載到 DOM
app.mount('#app')
