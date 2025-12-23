<template>
  <section class="home" :style="{ backgroundImage: `url(${marbleBg})` }">
    <div class="hero-content" data-aos="fade-up" data-aos-duration="1000">
      <!-- 主標題區域 -->
      <h1
        class="main-title"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="1000"
      >
        ONE2FRAME
      </h1>

      <p
        class="subtitle"
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-duration="1000"
      >
        攝 影 預 約 表 單
      </p>

      <!-- 品牌理念文字區塊（質感分行） -->
<div class="brand-philosophy-text" data-aos="fade-up" data-aos-delay="600">
  <span><strong>ONE2FRAME</strong><br>來自於「One to Frame」的概念</span>
  <span>代表一個人走向創作者的旅程。</span><br>
  

</div>

      

      <!-- CTA按鈕 -->
      <router-link
  to="/quotation"
  class="cta-btn"
  data-aos="zoom-in"
  data-aos-delay="800"
  data-aos-duration="800"
>
  立即預約
</router-link>

    </div>
  </section>
</template>




<script setup>
import marbleBg from '../assets/marble.jpg'

function scrollToContact() {
  window.scrollTo({ top: 1000, behavior: 'smooth' })
}
</script>

<style scoped>

.brand-philosophy-text {
  font-size: 1.1rem;
  line-height: 2;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Cormorant Garamond', serif;
  letter-spacing: 0.03rem;
  max-width: 720px;
  margin: 2rem auto 0;
  text-align: center;
  padding: 0 1.2rem;
}

.brand-philosophy-text span {
  display: block;
  margin-bottom: 0.6rem;
}

@media (max-width: 768px) {
  .brand-philosophy-text {
    font-size: 1rem;
    line-height: 1.85;
    padding: 0 1.2rem;
  }

  .brand-philosophy-text span {
    margin-bottom: 0.7rem;
  }
}
.brand-philosophy-text {
  font-size: 1.1rem;
  line-height: 2;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Cormorant Garamond', serif;
  letter-spacing: 0.03rem;
  max-width: 720px;
  margin: 2rem auto 2.8rem; /* ✅ 下方加大間距 */
  text-align: center;
  padding: 0 1.2rem;
}

.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  color: white;
  overflow: hidden;
  margin: 0;
  padding: 0;
}


.home::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 0;
}

.hero-content {
  z-index: 1;
  position: relative;
  max-width: 960px;
  width: 100%;
  margin: auto;
  text-align: center;
}

.main-title {
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: 0.6rem;
  text-transform: uppercase;
  font-family: 'Playfair Display', serif;
  text-align: center;
  word-break: keep-all;
  margin-bottom: 1.5rem;
  white-space: nowrap;
}

.subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.35rem;
  color: #ccc;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.brand-philosophy {
  margin-top: 2rem;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.hero-title {
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: 0.08rem;
  text-align: center;
  padding-bottom: 2rem;
}

.line {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  font-weight: 400;
  letter-spacing: 0.05rem;
  background: linear-gradient(90deg, #ffffff, #d9d9d9, #ffffff);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  opacity: 0.85;
}

.cta-btn {
  margin-top: 1.8rem;
  background-color: transparent;
  color: #ffffff;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Cormorant Garamond', serif;
  letter-spacing: 0.08rem;
}

.cta-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 18px rgba(255, 255, 255, 0.15);
}
.main-title {
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: 0.6rem;
  text-transform: uppercase;
  font-family: 'Playfair Display', serif;
  text-align: center;

  /* ✅ 加上的兩行 ↓↓↓ */
  word-break: keep-all;
  white-space: nowrap;

  margin-bottom: 1.5rem;
}

.brand-philosophy {
  margin-top: 2rem;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding: 0 1rem;
}


@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
    letter-spacing: 0.2rem;
    white-space: normal; /* ✅手機上允許換行 */
  }

  .subtitle {
    font-size: 1rem;
    padding: 0 1.2rem;
  }

  .hero-title {
    font-size: 1.2rem;
    line-height: 1.6;
  }

  .brand-philosophy-text {
    font-size: 1rem;
    line-height: 1.85;
    padding: 0 1.2rem;
    margin-bottom: 2.5rem; /* ✅ 手機下間距也拉開 */
  }

  .cta-btn {
    font-size: 1rem;
    padding: 0.6rem 1.5rem;
  }
}

</style>