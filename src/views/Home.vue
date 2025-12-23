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
      <div class="sub-cta">
        <router-link to="/ai" class="ai-link">
          ONE2FRAME拍攝顧問
        </router-link>
      </div>

      <router-link to="/ai" class="secondary-link">
        不確定選哪個？ 先用ONE2FRAME導覽 30 秒 →
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
/* ===============================
   品牌理念文字
   =============================== */
.brand-philosophy-text {
  font-size: 1.1rem;
  line-height: 2;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Cormorant Garamond', serif;
  letter-spacing: 0.03rem;
  max-width: 720px;
  margin: 2rem auto 1.4rem; /* ✅ 原本太大：把 CTA 拉太遠 → 這裡縮短 */
  text-align: center;
  padding: 0 1.2rem;
}

.brand-philosophy-text span {
  display: block;
  margin-bottom: 0.6rem;
}

/* ===============================
   Home 區塊（依你要求保留核心）
   =============================== */
.home {
  width: 100vw;
  height: 100vh;                 /* ⛔ 不刪，依你要求保留 */
  display: flex;
  justify-content: center;
  align-items: flex-start;        /* ✅ 避免整包硬置中造成節奏怪 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  color: white;
  overflow: hidden;
  margin: 0;

  /* ✅ 補 navbar + 呼吸感 */
  padding-top: 96px;
  padding-bottom: 96px;

  box-sizing: border-box;         /* ✅ 避免 padding 撐爆 100vh */
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

/* ===============================
   標題區
   =============================== */
.main-title {
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: 0.6rem;
  text-transform: uppercase;
  font-family: 'Playfair Display', serif;
  text-align: center;
  word-break: keep-all;
  white-space: nowrap;
  margin-bottom: 1.5rem;
}

.subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.35rem;
  color: #ccc;
  opacity: 0.9;
  margin-bottom: 1.4rem; /* ✅ 稍微收斂，讓 CTA 區塊更集中 */
}

/* ===============================
   CTA（立即預約）— 讓它更靠近上方文案
   =============================== */
.cta-btn {
  margin-top: 0.6rem; /* ✅ 原本 1.8rem 太遠：把 CTA 往上拉 */
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

  /* ✅ CTA 以下你指定的穩定版 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.cta-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 18px rgba(255, 255, 255, 0.15);
}

/* ===============================
   CTA 以下：統一成一個導覽區塊
   =============================== */
.sub-cta {
  margin-top: 12px;              /* ✅ 原本 18px：再收斂，整體更舒服 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}

/* secondary-link 不在 sub-cta 裡 → 用兄弟選擇器統一節奏 */
.sub-cta + .secondary-link {
  margin-top: 0;
}

/* 第一行：ONE2FRAME 拍攝顧問（低干擾導覽） */
.ai-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  border-radius: 999px;
  font-family: 'Cormorant Garamond', serif;
  letter-spacing: 0.06rem;
  font-size: 1rem;

  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;

  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.ai-link:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.35);
  color: rgba(255, 255, 255, 1);
}

/* 第二行：提示型導覽文字 */
.secondary-link {
  display: inline-block;
  font-family: 'Cormorant Garamond', serif;
  letter-spacing: 0.05rem;
  font-size: 0.98rem;

  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
  padding-bottom: 2px;

  transition: color 0.2s ease, border-bottom-color 0.2s ease;
}

.secondary-link:hover {
  color: rgba(255, 255, 255, 0.9);
  border-bottom-color: rgba(255, 255, 255, 0.3);
}

/* ===============================
   RWD
   =============================== */
@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
    letter-spacing: 0.2rem;
    white-space: normal;
  }

  .subtitle {
    font-size: 1rem;
    padding: 0 1.2rem;
    margin-bottom: 1.1rem;
  }

  .brand-philosophy-text {
    font-size: 1rem;
    line-height: 1.85;
    padding: 0 1.2rem;
    margin: 1.6rem auto 1.1rem; /* ✅ 手機也把 CTA 拉近 */
  }

  .cta-btn {
    font-size: 1rem;
    padding: 0.6rem 1.5rem;
    margin-top: 0.4rem;
  }

  .sub-cta {
    margin-top: 10px;
    gap: 8px;
  }

  .ai-link {
    font-size: 0.95rem;
    padding: 9px 12px;
  }

  .secondary-link {
    font-size: 0.95rem;
  }
}
</style>
