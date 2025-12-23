<template>
  <section class="quotation" :style="{ backgroundImage: `url(${marbleBg})` }">
    <div class="glass-card" data-aos="zoom-in-up" data-aos-duration="1000">
      <!-- 標題區 -->
      <h1 class="main-title" data-aos="fade-up" data-aos-delay="100">報價方案</h1>
      <p class="subtitle" data-aos="fade-up" data-aos-delay="200">
        <span>服務桃園以北地區📩 </span>
      </p>

      <!-- 方案區 -->
      <div class="price-grid">
        <div
  v-for="(plan, index) in plans"
  :key="plan.title + '-' + index"
  :class="[
    'price-box',
    'aos-init',
    'aos-animate',
    { selected: selectedPlanIndex === index, bonus: plan.isBonus }
  ]"
  @click="handleSelect(index)"
  data-aos="fade-up"
  :data-aos-delay="300 + index * 100"
>
          <div class="checkmark" v-if="selectedPlanIndex === index && !plan.isBonus">✔</div>
          <h2>{{ plan.title }}</h2>
          <p>{{ plan.desc }}</p>
          <ul v-if="plan.priceLines" class="price-lines">
  <li v-for="(line, idx) in plan.priceLines" :key="idx">{{ line }}</li>
</ul>
<div
  v-if="plan.type === 'Static' && selectedPlanIndex === index"
  class="sub-options"
>
  <button
    type="button"
    class="sub-btn"
    :class="{ active: selectedPlan?.plan === 'Essential' }"
    @click.stop="selectStaticOption(plan, 'Essential')"
  >
    基礎
  </button>

  <button
    type="button"
    class="sub-btn"
    :class="{ active: selectedPlan?.plan === 'Complete' }"
    @click.stop="selectStaticOption(plan, 'Complete')"
  >
    完整
  </button>
</div>


        </div>
      </div>

      <!-- 優惠方案卡片 -->
<div class="bonus-note aos-init aos-animate" data-aos="fade-up" data-aos-delay="650">
  <p class="bonus-title">📩 優惠細節</p><br />
  <p class="bonus-desc">
    ✨ Special 2026 ：<br /><strong>一二月份預約 → ONE2FRAME 紀念物 ✅</strong>
  </p><br />
    靜態 / 動態 同日拍攝<br /><strong> → 享9折優惠 ✅</strong><br /><br />
    ONE2FRAME ACT ( 曾合作車友 )   <br /><strong>→ 享 NT$200 抵用券 ✅</strong><br /><br />
    
</div>




      <!-- 引導提示 / 已選提示 -->
      <p class="selection-label" v-if="selectedPlan">
  ✅ 你已選擇：<strong>{{ selectedPlan.type }} - {{ selectedPlan.plan }}</strong>
</p>
<p class="tip-text" v-else>
  請先選擇一個方案才能預約
</p>


      <!-- 保證按鈕永遠存在，只在沒選方案時 disable -->
<button class="cta-button" :disabled="!canBook" @click="goToContactWithPlan">
  我要預約
</button>


    </div>
  </section>
</template>



<script setup>
  
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import marbleBg from '../assets/marble.jpg'
import { computed } from 'vue'
const canBook = computed(() => !!selectedPlan.value)

const selectedPlan = ref(null) 
const router = useRouter()

const selectedPlanIndex = ref(null)

const plans = [
  {
    title: 'Static Frame',
    desc: '靜態影像 · 風格建立方案',
    type: 'Static',
    options: [
      { label: '基礎', plan: 'Essential', price: 1800, hint: '基礎愛車紀念' },
      { label: '完整', plan: 'Complete',  price: 2500, hint: '著重特寫, 完整收藏' }
    ],
    extra: { addOnLabel: '追加影像', addOnPrice: 90 },
    priceLines: [
      '基礎｜$1,800 ( 基礎愛車紀念 )',
      '完整｜$2,500 ( 著重特寫, 完整收藏 )',
      '追加影像｜$90 / 張'
    ]
  },

  {
    title: 'Motion Frame',
    desc: 'Rolling Shot · 動態美學方案',
    priceLines: ['Complete 完整｜$3,000', '追加影像｜$90 / 張']
    
  },
  {
    title: 'Cinematic Reels',
    desc: 'Reels 短片 · 個人敘事影像',
    priceLines: ['騎行+運鏡', '$2000 (不含剪輯) / $3000 (含剪輯)']
  }
  
]


// 點擊方案（排除 bonus 類型）
function handleSelect(index) {
  const plan = plans[index]
  if (plan.isBonus) return

  // Motion / Reels：單一方案，直接選
  if (plan.type !== 'Static') {
    selectedPlanIndex.value = index
    selectedPlan.value = {
      type: plan.type,
      title: plan.title,
      plan: plan.plan ?? 'Complete',
      price: plan.type === 'Motion' ? 3000 : 4000
    }
    return
  }

  // Static：只選中卡片（展開子選項用），不決定 Essential/Complete
  selectedPlanIndex.value = index
  selectedPlan.value = null
}

function inferShootTypeByTitle(title) {
  if (title === 'Static Frame') return 'Static'
  if (title === 'Motion Frame') return 'Motion'
  if (title === 'Cinematic Reels') return 'Reels'
  return ''
}

// 導向 /contact 並帶上方案
function goToContactWithPlan() {
  if (!selectedPlan.value) return

  const title = selectedPlan.value.title // 或你實際存 title 的欄位
  const type = inferShootTypeByTitle(title)

  router.push({
    name: 'contact',
    query: {
      shoot_type: type,                   // ✅ 新增
      shoot_plan: selectedPlan.value.plan || '',   // Static / Motion / Reels 都可用
      shoot_title: title
    }
  })
}


function selectStaticOption(planObj, which) {
  const opt = planObj.options.find(o => o.plan === which)
  selectedPlan.value = {
    type: planObj.type,           // Static
    title: planObj.title,         // Static Frame
    plan: opt.plan,               // Essential / Complete
    price: opt.price
  }
}

</script>



<style scoped>
/* ---------- 容器與背景（加 overlay） ---------- */
.quotation {
  position: relative; /* 為 ::before overlay 準備定位上下文 */
  width: 100vw;
  min-height: 100vh;
  height: auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 80px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  margin: 0;
  /* 若你是用 inline style 綁 background-image (:style)，overlay 仍會套用 */
}

/* 深色 overlay：預設桌機/平板用 55% 深度 */
.quotation::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.52) 40%, rgba(0,0,0,0.46) 100%);
  z-index: 1;
  pointer-events: none;
}

/* 手機裝置使用更深的遮罩，避免背景干擾文字 */
@media (max-width: 480px) {
  .quotation::before {
    background: linear-gradient(180deg, rgba(0,0,0,0.76) 0%, rgba(0,0,0,0.72) 40%, rgba(0,0,0,0.66) 100%);
  }
}

/* 保證內容在 overlay 之上（z-index 管理） */
.glass-card {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  width: 100%;
  padding: 48px;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(20px) saturate(120%);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  text-align: center;
  color: white;
  box-sizing: border-box;

  /* ✅ 核心修正：放開高度限制與overflow */
  max-height: none;
  height: auto;
  overflow: visible;
}

/* ---------- 文字與標題 ---------- */
.main-title {
  font-size: 42px;
  margin-bottom: 16px;
  letter-spacing: 2px;
}

.subtitle {
  font-size: 18px;
  margin-bottom: 48px;
  opacity: 0.85;
}

/* ---------- 價格格子 ---------- */
.price-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 32px;
  margin-bottom: 48px;
  width: 100%;
  box-sizing: border-box;
}

/* ---------- 單卡（保持玻璃感，同時在 overlay 之上） ---------- */
.price-box {
  position: relative;
  z-index: 3; /* 高於 .glass-card，避免被其他元素覆蓋 */
  width: 100%; /* 手機不強制固定寬度 */
  max-width: 300px; /* 保持桌機一致外觀 */
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  padding: 32px 24px;
  backdrop-filter: blur(18px) saturate(130%);
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1),
              0 4px 12px rgba(0, 0, 0, 0.25);
  transform: scale(1);
  text-align: center;
  color: #fff;
}

.price-box:hover {
  transform: scale(1.04);
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.15);
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.12);
}

.price-box.selected {
  transform: scale(1.05);
  border: 2px solid #00ffc8;
  background: rgba(0, 255, 200, 0.08);
  box-shadow: 0 0 20px rgba(0, 255, 200, 0.3);
  z-index: 4;
}

/* 勾勾圖示 */
.checkmark {
  position: absolute;
  top: 14px;
  right: 16px;
  width: 28px;
  height: 28px;
  background-color: #00c896;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 12px rgba(0, 200, 150, 0.5);
  animation: popIn 0.4s ease-out;
}

@keyframes popIn {
  from {
    transform: scale(0.3);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.price-box h2 {
  font-size: 22px;
  margin-bottom: 8px;
}

.price-box p {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 12px;
}

.price-box h3 {
  font-size: 20px;
  font-weight: bold;
}

/* CTA 按鈕 */
.cta-button {
  padding: 12px 28px;
  background-color: #ffffff22;
  border: 1px solid #ffffff55;
  color: white;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
}

.cta-button:hover {
  background-color: white;
  color: black;
  transform: scale(1.05);
}

.cta-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 小提示文字 */
.tip-text {
  font-size: 0.95rem;
  margin-top: -12px;
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.65);
}

.selection-label {
  font-size: 1rem;
  margin-top: -12px;
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Bonus 盒（不可點） */
.price-box.bonus {
  cursor: default;
  background: rgba(255, 255, 255, 0.06);
  border: 1px dashed rgba(255, 255, 255, 0.3);
  opacity: 0.9;
  pointer-events: none;
}

.price-box.bonus h2 {
  font-size: 18px;
}

.price-box.bonus p {
  white-space: pre-line;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
}

/* Bonus 區塊樣式 */
.bonus-note {
  margin-top: 48px;
  margin-bottom: 32px;
  padding: 20px 28px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(10px);
  color: rgba(255, 255, 255, 0.95);
  font-size: 15px;
  text-align: center;
  line-height: 1.8;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.bonus-title {
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 17px;
  letter-spacing: 0.3px;
  color: #fff;
}

.bonus-desc {
  opacity: 0.85;
  font-size: 15px;
  white-space: pre-line;
  margin-bottom: 8px;
}

/* 價格項目列 */
.price-lines {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;
  font-size: 15px;
  line-height: 1.6;
  color: #fff;
  opacity: 0.95;
}

.price-lines li {
  margin: 4px 0;
}

/* ---------- 行動響應 ---------- */
@media (max-width: 480px) {
  .glass-card {
    padding: 24px 16px;
    overflow: visible;
    height: auto;
  }

  .quotation {
    padding: 24px 16px;
    overflow-y: auto;
    height: 100vh; /* 讓整個頁面可滾動顯示底部按鈕 */
  }

  .cta-button {
    display: block;
    width: 100%;
    margin: 1.5rem auto 0;
    position: relative;
    z-index: 3;
  }

  .bonus-note {
    font-size: 14px;
    line-height: 1.6;
    padding: 16px;
  }

  .price-box h2 {
    font-size: 18px;
  }

  .price-box h3 {
    font-size: 16px;
  }

  /* 手機上進一步確保文字對比（若需要，啟用） */
  .price-box {
    background: rgba(255, 255, 255, 0.06);
  }
}

/* 可選：如果你希望在特定斷點使用更淺或更深 overlay，可在這裡新增 media query */
@media (min-width: 1200px) {
  /* 桌機可視需求微調 */
  .quotation::before {
    background: linear-gradient(180deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.46) 40%, rgba(0,0,0,0.42) 100%);
  }
}
/* 強制覆蓋全域 button 外觀（關鍵：Safari/iOS 需要） */
/* 質感版：霧面玻璃膠囊 */
button.sub-btn {
  -webkit-appearance: none !important;
  appearance: none !important;

  /* 霧面玻璃底 */
  background: rgba(255, 255, 255, 0.05) !important;

  /* 邊框改成「柔光」，不要硬線 */
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: 999px !important;

  /* 內光（質感關鍵） */
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.06),
    0 8px 18px rgba(0, 0, 0, 0.22) !important;

  color: rgba(255, 255, 255, 0.86) !important;

  padding: 10px 18px !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  letter-spacing: 0.2px !important;

  cursor: pointer !important;
  box-sizing: border-box !important;

  backdrop-filter: blur(16px) saturate(135%) !important;
  -webkit-backdrop-filter: blur(16px) saturate(135%) !important;

  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;

  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.2s ease !important;
}

/* Hover：微亮、微浮起，不刺 */
button.sub-btn:hover {
  background: rgba(255, 255, 255, 0.085) !important;
  border-color: rgba(255, 255, 255, 0.24) !important;
  transform: translateY(-1px) !important;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    0 10px 22px rgba(0, 0, 0, 0.26) !important;
}

/* Active：不要螢光框，改成「淡青色霧光」 */
button.sub-btn.active {
  background: rgba(0, 255, 200, 0.10) !important;
  border-color: rgba(0, 255, 200, 0.30) !important;
  color: rgba(255, 255, 255, 0.95) !important;

  box-shadow:
    inset 0 0 0 1px rgba(0, 255, 200, 0.18),
    0 10px 24px rgba(0, 255, 200, 0.10),
    0 10px 22px rgba(0, 0, 0, 0.24) !important;

  transform: translateY(-1px) !important;
}

</style>



