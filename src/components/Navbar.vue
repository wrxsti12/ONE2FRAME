<template>
  <nav class="navbar">
  <div class="navbar-inner">
    <ul class="navbar-links">
      <li><router-link to="/">首頁</router-link></li>
      <li><router-link to="/gallery">作品集</router-link></li>
      <li><router-link to="/quotation" class="nav-link">報價單</router-link></li>
      <li><router-link to="/contact">預約拍攝</router-link></li>

      
    </ul>
  </div>
</nav>



</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1rem 0;
  z-index: 1000;
  display: flex;
  justify-content: center; /* ✅ 導覽列置中 */
}

.navbar-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: center; /* ✅ 讓所有內容置中 */
  align-items: center;
  padding: 1rem 2rem;
  gap: 3rem;
}

.navbar-container {
  max-width: 1280px; /* ✅ 避免超出螢幕 */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar.scrolled {
  background: rgba(0, 0, 0, 0.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.logo-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  color: white;
  font-weight: 700;
  text-decoration: none;
}

.navbar-links {
  display: flex;
  gap: 2.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.navbar-links a {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: all 0.3s ease;
}

.navbar-links a:hover,
.router-link-exact-active {
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
}

</style>
