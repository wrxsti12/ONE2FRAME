<template>
  <section class="ai" :style="{ backgroundImage: `url(${marbleBg})` }">
    <div class="glass-card">
      <h1 class="main-title">ONE2FRAME拍攝顧問</h1>
      <p class="hint">
        這是可選導覽：不想聊也沒差，直接回報價單照樣預約。
      </p>

      <div class="bot-wrap">
        <iframe
          class="bot"
          :src="typebotUrl"
          frameborder="0"
          allow="clipboard-write; microphone"
        />
      </div>

      <div class="actions">
        <router-link to="/quotation" class="btn ghost">回報價單</router-link>
        <router-link to="/contact" class="btn solid">直接預約</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import marbleBg from '../assets/marble.jpg'

// 把這裡換成你的 Typebot share/embed 連結
const typebotUrl = "https://TYPEBOT_EMBED_URL"
</script>

<style scoped>
.ai{
  min-height: 100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  background-size: cover;
  background-position:center;
  position:relative;
  padding: 90px 24px 48px; /* 避開 navbar */
  color:#fff;
}
.ai::before{
  content:'';
  position:absolute;
  inset:0;
  background: rgba(0,0,0,0.6);
  z-index:0;
}
.glass-card{
  z-index:1;
  width:100%;
  max-width: 980px;
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.18);
  padding: 28px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.45);
}
.hint{
  margin: 6px 0 18px;
  opacity: .85;
  font-family: 'Cormorant Garamond', serif;
  letter-spacing: .03rem;
}
.bot-wrap{
  border-radius: 16px;
  overflow:hidden;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(0,0,0,0.25);
}
.bot{
  width: 100%;
  height: 560px;
}
.actions{
  margin-top: 18px;
  display:flex;
  gap: 12px;
  justify-content:center;
  flex-wrap: wrap;
}
.btn{
  padding: 10px 18px;
  border-radius: 12px;
  text-decoration:none;
  font-family: 'Cormorant Garamond', serif;
  letter-spacing: .05rem;
  border: 1px solid rgba(255,255,255,0.25);
  color:#fff;
}
.btn.ghost{ background: rgba(0,0,0,0.25); }
.btn.solid{ background: rgba(255,255,255,0.08); }
</style>
