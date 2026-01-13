<template>

  <section class="contact" :style="{ backgroundImage: `url(${marbleBg})` }">

    <div class="glass-card" data-aos="fade-up" data-aos-duration="1000">

      <div class="price-text" v-if="selectedPlan" data-aos="fade-up" data-aos-delay="100">

        <p>你選擇的方案：<strong>{{ selectedPlan }}</strong></p>

      </div>



      <h1 class="main-title" data-aos="fade-up" data-aos-delay="100">立即預約拍攝</h1>

      <div class="brand-philosophy-text" data-aos="fade-up" data-aos-delay="200"></div>



      <form @submit.prevent="handleSubmit" ref="form" class="contact-form" data-aos="fade-up" data-aos-delay="300">

        <div class="input-group" data-aos="fade-up" data-aos-delay="150">

          <input

            id="userName"

            v-model="userName"

            class="contact-input"

            type="text"

            name="user_name"

            placeholder="請輸入您的車款名稱"

            autocomplete="off"

            required

          />

        </div>



        <div class="input-group" data-aos="fade-up" data-aos-delay="200">

          <input

            id="userIG"

            v-model="userIG"

            class="contact-input"

            :class="{ 'input-error': showIGError }"

            @input="handleIGInput"

            type="text"

            name="user_ig"

            placeholder="請輸入 IG 名稱"

            autocomplete="off"

            required

          />

          <p class="error-text-stable">{{ errorMessage }}</p>

        </div>

<!-- ✅ 新增：Email（用於每月優惠通知） -->
<div class="input-group" data-aos="fade-up" data-aos-delay="230">
  <input
    id="userEmail"
    v-model="userEmail"
    class="contact-input"
    :class="{ 'input-error': showEmailError }"
    @input="handleEmailInput"
    type="email"
    name="user_email"
    placeholder="請輸入 常用Email（每季優惠通知）"
    autocomplete="off"
    required
  />
  <p class="error-text-stable">{{ emailErrorMessage }}</p>
</div>


        <!-- 顯示方案/備註（純文字）-->

        <p v-if="userNote" class="auto-note" data-aos="fade-up" data-aos-delay="250">{{ userNote }}</p>



        <select

          v-model="shootType"

          name="shoot_type"

          class="contact-input"

          required

          data-aos="fade-up"

          data-aos-delay="300"

        >

          <option disabled value="">拍攝需求</option>

          <option>靜態攝影</option>

          <option>動態Rolling</option>

          <option>Reels短片紀錄</option>

        </select>



        <!-- Datepicker -->

        <Datepicker
  v-model="selectedDate"
  placeholder="請選擇拍攝日期"
  :enable-time-picker="false"
  :disabled-dates="disableDates"
  :teleport="true"
  class="contact-input"
  name="shoot_date"
  required
  data-aos="fade-up"
  data-aos-delay="400"
/>





        <!-- 拍攝時段 -->

        <select
  v-model="shootClock"
  name="shoot_clock"
  class="contact-input"
  required
>


          <option disabled value="">請選擇拍攝時段</option>

          <option value="早場">早場</option>

          <option value="午場">午場</option>

          <option value="晚場">晚場</option>

        </select>



        <input type="hidden" name="shoot_full_time" :value="shootFullTime" />

        
<input type="hidden" name="shoot_plan" :value="shootPlan" />
<input type="hidden" name="plan_display" :value="planDisplay" />









        <button
  type="submit"
  class="submit-btn"
  :disabled="isSubmitting"
>


          <span v-if="!isSubmitting">提交預約</span>

          <span v-else>已送出✅</span>

        </button>



        <!-- 成功訊息（按下提交後立即顯示） -->

        <div v-if="done" class="status-message success pinned"

     style="display: flex; justify-content: center; align-items: center; text-align: center; padding: 10px; height: 60px;">

  ✅ 預約完成！已收到您的預約，會盡快與您聯絡確認時間。

</div>







        <!-- 仍保留一般的狀態訊息（開發用） -->

        <div v-if="statusMessage && !done" class="status-message" :class="statusType">

          {{ statusMessage }}

        </div>

      </form>

    </div>

  </section>

</template>



<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import emailjs from '@emailjs/browser'
import { supabase } from '../supabase.js'
import marbleBg from '../assets/marble.jpg'
import '@vuepic/vue-datepicker/dist/main.css'
import Datepicker from '@vuepic/vue-datepicker'

/* ---------- state ---------- */
const form = ref(null)

const shootPlan = ref('')
const planDisplay = ref('')

const isSubmitting = ref(false)
const done = ref(false)

const userName = ref('')
const userIG = ref('')
const userEmail = ref('')
const userNote = ref('')

const shootType = ref('')
const shootDate = ref('')
const shootClock = ref('')
const selectedDate = ref(null) // 只宣告一次 ✅

const route = useRoute()
const selectedPlan = ref('')

const statusMessage = ref('')
const statusType = ref('')

/* ---------- Email 驗證 ---------- */
const isValidEmail = ref(true)
const showEmailError = ref(false)

const emailErrorMessage = computed(() =>
  showEmailError.value ? '請輸入有效 Email（例如 name@gmail.com）' : ''
)

/* ---------- IG 驗證 ---------- */
const isValidIG = ref(true)
const showIGError = ref(false)

const errorMessage = computed(() =>
  showIGError.value
    ? '請輸入有效 IG 名稱（3~30字，只能包含英文、數字、. 和 _）'
    : ''
)

function handleIGInput() {
  const pattern = /^[A-Za-z0-9._]{3,30}$/
  isValidIG.value = pattern.test(userIG.value)
  showIGError.value = userIG.value !== '' && !isValidIG.value
}

/* ---------- 日期同步 ---------- */
watch(selectedDate, (val) => {
  if (!val) {
    shootDate.value = ''
    return
  }
  const yyyy = val.getFullYear()
  const mm = String(val.getMonth() + 1).padStart(2, '0')
  const dd = String(val.getDate()).padStart(2, '0')
  shootDate.value = `${yyyy}-${mm}-${dd}`
})

// 禁用邏輯，只開放 2026 年 1 月平日
function disableDates(date) {
  const day = date.getDay()      // 0 = Sunday, 6 = Saturday
  const month = date.getMonth()  // 0 = January
  const year = date.getFullYear()

  const today = new Date()
  today.setHours(0, 0, 0, 0) // 清除時間，保證只比日期

  const diffTime = date.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) // 相差天數

  // 過去日期或前三天內禁用
  if (diffDays <= 3) return true

  if (year !== 2026) return true // 非2026禁用

  if (month === 0) {
    // 1月全月開放
    return false
  } else {
    // 2~12月：只開放假日
    return day !== 0 && day !== 6 // 平日禁用
  }
}




/* ---------- 假日限制 ---------- */
const restrictedPlans = ['動態攝影', 'Reels短片拍攝']

function isWeekend(dateString) {
  if (!dateString) return false
  const day = new Date(dateString).getDay()
  return day === 6 || day === 0
}

const isWeekendRestricted = computed(() =>
  restrictedPlans.includes(selectedPlan.value)
)

watch([shootDate, selectedPlan], () => {
  if (isWeekendRestricted.value && shootDate.value && !isWeekend(shootDate.value)) {
    selectedDate.value = null
    shootDate.value = ''
  }
})

/* ---------- 顯示完整時間 ---------- */
const shootFullTime = computed(() => {
  if (!shootDate.value || !shootClock.value) return ''
  const [y, m, d] = shootDate.value.split('-')
  return `${y}年${m}月${d}日 ${shootClock.value}`
})

/* ---------- 驗證邏輯 ---------- */
function validateForm() {
  handleIGInput()
  handleEmailInput()

  if (!isValidIG.value) {
    statusMessage.value = '請輸入正確的 IG 名稱'
    statusType.value = 'error'
    return false
  }

  if (!isValidEmail.value) {
    statusMessage.value = '請輸入正確的 Email'
    statusType.value = 'error'
    return false
  }

  if (
    !userName.value ||
    !userIG.value ||
    !userEmail.value ||
    !shootType.value ||
    !shootDate.value ||
    !shootClock.value
  ) {
    statusMessage.value = '請完整填寫所有必填欄位'
    statusType.value = 'error'
    return false
  }

  return true
}

/* ---------- 初始化（方案同步） ---------- */
const typeMap = {
  Static: '靜態攝影',
  Motion: '動態Rolling',
  Reels: 'Reels短片紀錄'
}

watchEffect(() => {
  const qt = route.query.shoot_type || route.query.shoot_title || ''
  const qp = route.query.shoot_plan || ''

  const typeLabel = typeMap[String(qt)] || String(qt)
  const planLabel = String(qp)

  shootPlan.value = planLabel
  planDisplay.value = typeLabel && planLabel ? `${typeLabel} - ${planLabel}` : typeLabel
  selectedPlan.value = planDisplay.value

  if (typeLabel && shootType.value === '') {
    shootType.value = typeLabel
  }

  if (selectedPlan.value) {
    userNote.value = `【方案】${selectedPlan.value}`
  }
})

/* ---------- EmailJS 設定 ---------- */
const EMAILJS_PUBLIC_KEY = '3DH3YZGxSTMbs0gwQ'

/* ---------- 客戶感謝信（EmailJS） ---------- */
async function thankClient() {
  try {
    const templateParams = {
      to_email: userEmail.value,
      email: userEmail.value,
      user_name: userName.value,
      name: 'ONE2FRAME',
      plan_display: planDisplay.value,
      shoot_full_time: shootFullTime.value
    }

    await emailjs.send(
      'service_hymhlfm',
      'template_k0bj3t8',
      templateParams,
      EMAILJS_PUBLIC_KEY
    )

    console.log('[客戶感謝信寄送成功]')
  } catch (err) {
    console.error('[客戶感謝信寄送失敗]', err)
  }
}

function handleEmailInput() {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  isValidEmail.value = pattern.test(userEmail.value)
  showEmailError.value = userEmail.value !== '' && !isValidEmail.value
}

/* ---------- 主提交入口 ---------- */
async function handleSubmit() {
  if (isSubmitting.value) return
  if (!validateForm()) return

  isSubmitting.value = true
  done.value = true
  statusMessage.value = ''
  statusType.value = ''

  try {
    if (form.value) {
      const fullTimeInput = form.value.querySelector('input[name="shoot_full_time"]')
      if (fullTimeInput) fullTimeInput.value = shootFullTime.value

      const planInput = form.value.querySelector('input[name="plan_display"]')
      if (planInput) planInput.value = planDisplay.value
    }

    await emailjs.sendForm(
      'service_sutp5s9',
      'template_gw85rci',
      form.value,
      EMAILJS_PUBLIC_KEY
    )

    await thankClient()

    const { error } = await supabase.from('reservations').insert([
      {
        user_name: userName.value,
        user_ig: userIG.value,
        user_email: userEmail.value,

        shoot_type: shootType.value,
        shoot_plan: route.query.shoot_plan || '',
        plan_display: selectedPlan.value,

        shoot_date: shootDate.value,
        shoot_clock: shootClock.value,
        shoot_full_time: shootFullTime.value,

        message: userNote.value
      }
    ])

    if (error) console.error('[DB 寫入失敗]', error)
    else console.log('[DB 寫入成功]')

  } catch (err) {
    console.error('[提交流程錯誤]', err)
  }
}
</script>


<style scoped>
/* -----------------------
   Datepicker (vuepic)
------------------------ */
.dp__menu {
  z-index: 9999 !important;
}

/* -----------------------
   Page Layout
------------------------ */
.contact {
  /* 背景 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  /* 版面 */
  width: 100%;
  min-height: 100vh;     /* fallback */
  min-height: 100dvh;    /* ✅ mobile 更準 */
  padding: 48px 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  margin: 0;

  color: #fff;
  text-align: center;

  /* ❌ 不要 overflow:hidden，會造成 mobile 重繪/裁切 bug */
  overflow: visible;
}

/* 背景遮罩層：用它取代 overflow 裁切 */
.contact::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 0;
}

/* -----------------------
   Glass Card
------------------------ */
.glass-card {
  width: 100%;
  max-width: 900px;
  margin: auto;

  padding: 28px;
  border-radius: 20px;

  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45);

  position: relative;
  z-index: 1; /* ✅ 一定要高於 ::before */
  pointer-events: auto;
}

.main-title {
  font-size: 28px;
  margin-bottom: 14px;
  letter-spacing: 0.4px;
}

/* 方案顯示 */
.price-text {
  max-width: 420px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  font-size: 1rem;
}
.price-text p {
  margin-bottom: 1.2rem;
  white-space: pre-line;
}

/* -----------------------
   Form Layout
------------------------ */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 8px;

  position: relative;
  z-index: 2; /* ✅ 高於 glass-card 內容層 */
}

.input-group {
  display: flex;
  flex-direction: column;
}

/* -----------------------
   Inputs (shared)
------------------------ */
.contact-input {
  width: 100%;
  box-sizing: border-box;
  min-width: 0;

  padding: 0.9rem 1rem;
  border-radius: 10px;

  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.05);

  color: #fff;
  font-family: inherit;
  font-size: 1rem;

  outline: none;
  transition: border 0.2s ease, box-shadow 0.2s ease;
}

.contact-input:focus {
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.03);
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

/* ✅ 讓表單元件在玻璃卡上一定可互動（你的保險留著，但整理乾淨） */
.contact-form input,
.contact-form textarea,
.contact-form select {
  position: relative;
  z-index: 3;
  pointer-events: auto;
}

/* -----------------------
   Select styling
------------------------ */
.contact-form select {
  width: 100%;
  padding: 0.9rem 1rem;

  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);

  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  color: #fff;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;

  transition: all 0.3s ease;
  appearance: none;

  background-image: url('data:image/svg+xml;utf8,<svg fill="white" height="20" width="20" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
}

.contact-form select:hover,
.contact-form select:focus {
  border-color: rgba(255, 255, 255, 0.6);
  background: rgba(0, 0, 0, 0.5);
}

/* -----------------------
   Auto Note
------------------------ */
.auto-note {
  background: transparent;
  border-radius: 8px;
  padding: 10px 12px;
  border: 1px dashed rgba(255, 255, 255, 0.06);
  color: #e6e6e6;
  white-space: pre-line;
  font-size: 14px;
}

/* -----------------------
   Errors
------------------------ */
.input-error {
  border: 1px solid #ff4d4d !important;
  background-color: rgba(255, 77, 77, 0.05);
}

.error-text-stable {
  color: #ff8888;
  font-size: 0.85rem;
  min-height: 0.5rem;
  line-height: 0.5rem;
  margin-top: 0.2rem;
  margin-bottom: -0.3rem;
  opacity: 1;
  transition: opacity 0.2s ease;
}
.error-text-stable:empty {
  opacity: 0;
}

/* -----------------------
   Submit Button
------------------------ */
.submit-btn {
  margin-top: 2.5rem;
  align-self: center;

  padding: 0.9rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;

  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;

  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  font-family: 'Cormorant Garamond', serif;
  letter-spacing: 0.05rem;

  box-shadow: 0 0 0 rgba(255, 255, 255, 0);
}

.submit-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.15);
}

.submit-btn[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

/* -----------------------
   Status messages
------------------------ */
.status-message {
  margin-top: 12px;
  padding: 12px;
  border-radius: 10px;
  font-size: 14px;
}

.status-message.success {
  background: linear-gradient(90deg, rgba(46, 204, 113, 0.10), rgba(46, 204, 113, 0.06));
  border: 1px solid rgba(46, 204, 113, 0.18);
  color: #e6ffea;

  display: flex;
  align-items: center;
  gap: 8px;
}

.status-message.warning {
  background: rgba(255, 206, 84, 0.08);
  border: 1px solid rgba(255, 206, 84, 0.12);
  color: #fff0c9;
}

.status-message.error {
  background: rgba(255, 99, 71, 0.08);
  border: 1px solid rgba(255, 99, 71, 0.12);
  color: #ffd6cc;
}

/* pinned */
.status-message.pinned {
  position: relative;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
}

/* -----------------------
   RWD
------------------------ */
@media (max-width: 768px) {
  .glass-card {
    padding: 2rem 1rem;
  }

  .contact {
    padding: 2rem 1rem;
  }

  .submit-btn {
    font-size: 1rem;
    padding: 0.8rem 1.2rem;
  }
}

@media (max-width: 480px) {
  .contact-input,
  .contact-form textarea,
  .contact-form select {
    font-size: 0.95rem;
    padding: 0.75rem 0.9rem;
    line-height: 1.4;
  }

  .main-title {
    font-size: 1.5rem;
  }

  .contact {
    padding: 1.5rem 1rem;
  }

  .submit-btn {
    font-size: 0.95rem;
    padding: 0.6rem 1rem;
  }
}
</style>
