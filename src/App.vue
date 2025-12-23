<template>
  <div>
    <!-- ✅ 導覽列放這裡，全站共用 -->
    <nav class="main-navbar">
      <router-link to="/" exact-active-class="active">首頁</router-link>
      <router-link to="/quotation" class="nav-link">報價單</router-link>
      <router-link to="/contact" exact-active-class="active">預約拍攝</router-link>
      <!-- 🚀 新增進度查詢連結 -->
    </nav>

    <!-- ✅ 頁面切換動畫 -->
    <router-view v-slot="{ Component }">
      <transition name="fade-slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
// 確保 <script setup> 區塊存在，即使沒有邏輯，也防止 Vue 編譯錯誤
</script>

<style>
/* ✅ 動畫 */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* ✅ 導覽列樣式 */
.main-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  z-index: 1000;
}
.main-navbar a {
  color: white;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  font-size: 1.1rem;
  text-decoration: none;
  transition: color 0.3s;
}
.main-navbar a:hover,
.main-navbar .active {
  color: #ffffffcc;
  border-bottom: 2px solid rgba(255, 255, 255, 0.4);
}

/* ✅ 電腦預設主標題樣式 */
.main-title {
  font-size: 3.5rem;
  letter-spacing: 0.6rem;
  line-height: 1.4;
  font-family: 'Playfair Display', serif;
  text-align: center;
  word-break: break-word;
  margin-bottom: 1.5rem;
}

/* ✅ RWD 手機樣式 */
@media (max-width: 768px) {
  .main-title {
    font-size: 1.8rem;
    letter-spacing: 0.3rem;
    padding: 0 1rem;
  }

  .subtitle {
    font-size: 1.1rem;
    letter-spacing: 0.15rem;
    padding: 0 1.2rem;
    text-align: center;
  }

  .hero-content {
    padding: 0 1.5rem;
  }

  .brand-philosophy {
    font-size: 1rem;
    line-height: 1.8;
    padding: 0 1.5rem;
  }

  .cta-btn {
    font-size: 1rem;
    padding: 0.7rem 1.4rem;
  }

  .gallery-item img {
    object-fit: contain;
  }

  .grid-gallery {
    padding: 0 1rem;
  }

  .app-container {
    padding: 0 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* 全域基礎設定，可放在 main.css 或 App.vue 的 <style> */
  html, body {
    margin: 0;
    padding: 0;
    width: 100vw;
    overflow-x: hidden;
    background-color: #000; /* 預防背景貼圖未載入時閃白 */
  }

  #app {
    width: 100vw;
    overflow-x: hidden;
  }
}
</style>
