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

          :min-date="new Date()"

          :enable-time-picker="false"

          :disabled-dates="disableWeekdays"

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

          data-aos="fade-up"

          data-aos-delay="410"

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

          data-aos="zoom-in"

          data-aos-delay="800"

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
const selectedDate = ref(null)

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
// 修改函數，讓它能接收 Public Key


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

function disableWeekdays(date) {
  return ![0, 6].includes(date.getDay())
}

/* ---------- 顯示完整時間 ---------- */
const shootFullTime = computed(() => {
  if (!shootDate.value || !shootClock.value) return ''
  const [y, m, d] = shootDate.value.split('-')
  return `${y}年${m}月${d}日 ${shootClock.value}`
})

/* ---------- ✅ 驗證邏輯（抽乾淨） ---------- */
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
      email: userEmail.value, // 保留，避免你 EmailJS template 還在用
      user_name: userName.value,
      name: 'ONE2FRAME',
      plan_display: planDisplay.value,
      shoot_full_time: shootFullTime.value
    }

    await emailjs.send(
      'service_hymhlfm',      // ✅ 新的 Thanks service
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
/* ---------- 客戶感謝信（EmailJS） ---------- */
/* ---------- ✅ 主提交入口 ---------- */
async function handleSubmit() {
  if (isSubmitting.value) return
  if (!validateForm()) return

  // 樂觀 UI
  isSubmitting.value = true
  done.value = true
  statusMessage.value = ''
  statusType.value = ''

  try {
    /* ---------- 同步隱藏欄位（給 EmailJS 用） ---------- */
    if (form.value) {
      const fullTimeInput = form.value.querySelector('input[name="shoot_full_time"]')
      if (fullTimeInput) fullTimeInput.value = shootFullTime.value

      const planInput = form.value.querySelector('input[name="plan_display"]')
      if (planInput) planInput.value = planDisplay.value
    }

    /* ---------- 1️⃣ 管理通知信（你自己） ---------- */
    await emailjs.sendForm(
      'service_sutp5s9',
      'template_gw85rci',
      form.value,
      '3DH3YZGxSTMbs0gwQ'
    )

    /* ---------- 2️⃣ 客戶感謝信（不阻斷主流程） ---------- */
    await thankClient()

    /* ---------- 3️⃣ 寫入 Supabase（資料留存） ---------- */
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

    if (error) {
      console.error('[DB 寫入失敗]', error)
    } else {
      console.log('[DB 寫入成功]')
    }

  } catch (err) {
    console.error('[提交流程錯誤]', err)

    // 如果你之後想做「部分成功提示」，這裡就是入口
    // statusMessage.value = '已收到預約，但系統通知發送異常，請稍後確認'
    // statusType.value = 'warning'
  }
}


</script>










<style scoped>

.contact {

  padding: 48px 24px;

  background-size: cover;

  background-position: center;

  min-height: 100vh;

  display: flex;

  align-items: center;

  justify-content: center;

}



.glass-card {

  width: 100%;

  max-width: 820px;

  background: rgba(255,255,255,0.04);

  backdrop-filter: blur(8px);

  border-radius: 16px;

  padding: 28px;

  box-shadow: 0 8px 30px rgba(0,0,0,0.45);

  color: #fff;

}



.main-title {

  font-size: 28px;

  margin-bottom: 14px;

  letter-spacing: 0.4px;

}



.contact-form {

  display: grid;

  gap: 12px;

  margin-top: 8px;

}



.contact-input {

  width: 100%;

  padding: 12px 14px;

  border-radius: 10px;

  border: 1px solid rgba(255,255,255,0.08);

  background: rgba(255,255,255,0.03);

  color: #fff;

  outline: none;

  font-size: 14px;

}



.contact-input:focus {

  box-shadow: 0 0 0 4px rgba(255,255,255,0.03);

  border-color: rgba(255,255,255,0.12);

}



.input-error {

  border-color: rgba(255,80,80,0.9) !important;

}



.error-text-stable {

  color: #ffb3b3;

  font-size: 12px;

  margin-top: 6px;

}



.auto-note {

  background: transparent;

  border-radius: 8px;

  padding: 10px 12px;

  border: 1px dashed rgba(255,255,255,0.06);

  color: #e6e6e6;

  white-space: pre-line;

  font-size: 14px;

}



.submit-btn {

  padding: 12px 18px;

  border-radius: 12px;

  border: none;

  cursor: pointer;

  font-weight: 600;

  letter-spacing: 0.3px;

  background: linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.04));

  color: #fff;

}



.submit-btn[disabled] {

  opacity: 0.6;

  cursor: not-allowed;

}



/* 狀態訊息基底 */

.status-message {

  margin-top: 12px;

  padding: 12px;

  border-radius: 10px;

  font-size: 14px;

}



/* 成功（固定顯示） */

.status-message.success {

  background: linear-gradient(90deg, rgba(46,204,113,0.10), rgba(46,204,113,0.06));

  border: 1px solid rgba(46,204,113,0.18);

  color: #e6ffea;

  display: flex;

  align-items: center;

  gap: 8px;

}



/* 如果要讓成功訊息固定（置頂或釘選風格），使用 .pinned */

.status-message.pinned {

  position: relative;

  box-shadow: 0 6px 18px rgba(0,0,0,0.45);

}



/* 錯誤樣式（僅在開發訊息使用） */

.status-message.error {

  background: rgba(255,99,71,0.08);

  border: 1px solid rgba(255,99,71,0.12);

  color: #ffd6cc;

}



/* 小提示文字 */

.success-msg {

  margin-top: 8px;

  color: #c9f8d2;

  font-size: 14px;

}

</style>





<style scoped>

.contact {

  padding: 48px 24px;

  background-size: cover;

  background-position: center;

  min-height: 100vh;

  display: flex;

  align-items: center;

  justify-content: center;

}



.glass-card {

  width: 100%;

  max-width: 820px;

  background: rgba(255,255,255,0.04);

  backdrop-filter: blur(8px);

  border-radius: 16px;

  padding: 28px;

  box-shadow: 0 8px 30px rgba(0,0,0,0.45);

  color: #fff;

}



.main-title {

  font-size: 28px;

  margin-bottom: 14px;

  letter-spacing: 0.4px;

}



.contact-form {

  display: grid;

  gap: 12px;

  margin-top: 8px;

}



.contact-input {

  width: 100%;

  padding: 12px 14px;

  border-radius: 10px;

  border: 1px solid rgba(255,255,255,0.08);

  background: rgba(255,255,255,0.03);

  color: #fff;

  outline: none;

  font-size: 14px;

}



.contact-input:focus {

  box-shadow: 0 0 0 4px rgba(255,255,255,0.03);

  border-color: rgba(255,255,255,0.12);

}



.input-error {

  border-color: rgba(255,80,80,0.9) !important;

}



.error-text-stable {

  color: #ffb3b3;

  font-size: 12px;

  margin-top: 6px;

}



/* 把原本的 textarea 改成純文字顯示區 */

.auto-note {

  background: transparent;

  border-radius: 8px;

  padding: 10px 12px;

  border: 1px dashed rgba(255,255,255,0.06);

  color: #e6e6e6;

  white-space: pre-line;

  font-size: 14px;

}



/* 按鈕 */

.submit-btn {

  padding: 12px 18px;

  border-radius: 12px;

  border: none;

  cursor: pointer;

  font-weight: 600;

  letter-spacing: 0.3px;

  background: linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.04));

  color: #fff;

}



/* Disabled 樣式 */

.submit-btn[disabled] {

  opacity: 0.6;

  cursor: not-allowed;

}



/* 狀態訊息區 */

.status-message {

  margin-top: 12px;

  padding: 12px;

  border-radius: 10px;

  font-size: 14px;

}



/* 成功 / 部分成功 / 失敗 */

.status-message.success {

  background: rgba(46, 204, 113, 0.12);

  border: 1px solid rgba(46, 204, 113, 0.18);

  color: #c9f8d2;

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



/* 原本小成功提示 */

.success-msg {

  margin-top: 8px;

  color: #c9f8d2;

  font-size: 14px;

}

</style>













<style scoped>



.dp__menu {

  z-index: 9999 !important;

}

.contact {

  display: flex;

  justify-content: center;

  align-items: center;

  min-height: 100vh;

  width: 100vw;

  margin: 0;

  background-size: cover;

  background-position: center;

  background-repeat: no-repeat;

  position: relative;

  padding: 4rem 2rem;

  color: white;

  text-align: center;

  overflow: hidden;

}





.contact::before {

  content: '';

  position: absolute;

  inset: 0;

  background: rgba(0, 0, 0, 0.6);

  z-index: 0;

}



.glass-card {

  

  border-radius: 20px;

  backdrop-filter: blur(12px);

  -webkit-backdrop-filter: blur(12px);

  border: 1px solid rgba(255, 255, 255, 0.25);

  padding: 3rem;

  max-width: 900px;

  width: 100%;

  margin: auto;

  text-align: center;

  z-index: 0;

  position: relative;

  pointer-events: auto;

}



.contact-form {

  display: flex;

  flex-direction: column;

  gap: 0.8rem;

  position: relative;

  z-index: 10;

}



.input-group {

  display: flex;

  flex-direction: column;

}



.contact-input {

  width: 100%;

  padding: 0.9rem 1rem;

  border-radius: 10px;

  border: 1px solid rgba(255, 255, 255, 0.2);

  background-color: rgba(255, 255, 255, 0.05);

  color: white;

  font-family: inherit;

  font-size: 1rem;

  outline: none;

  transition: border 0.2s ease;

}



.input-error {

  border: 1px solid #ff4d4d;

  background-color: rgba(255, 77, 77, 0.05);

}



.contact-form select:hover,

.contact-form select:focus {

  border-color: rgba(255, 255, 255, 0.6);

  background: rgba(0, 0, 0, 0.5);

}



.contact-form select {

  width: 100%;

  padding: 0.9rem 1rem;

  border-radius: 10px;

  border: 1px solid rgba(255, 255, 255, 0.3);

  background: rgba(0, 0, 0, 0.3);

  backdrop-filter: blur(8px);

  -webkit-backdrop-filter: blur(8px);

  color: white;

  font-family: 'Cormorant Garamond', serif;

  font-size: 1rem;

  transition: all 0.3s ease;

  appearance: none;

  background-image: url('data:image/svg+xml;utf8,<svg fill="white" height="20" width="20" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>');

  background-repeat: no-repeat;

  background-position: right 1rem center;

  background-size: 1rem;

}



.contact-form textarea {

  width: 100%;

  padding: 0.9rem 1rem;

  border-radius: 10px;

  border: 1px solid rgba(255, 255, 255, 0.2);

  background-color: rgba(255, 255, 255, 0.05);

  color: white;

  font-family: inherit;

  font-size: 1rem;

}



.contact-form input::placeholder,

.contact-form textarea::placeholder {

  color: rgba(255, 255, 255, 0.6);

}



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

  color: white;

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



.success-msg {

  margin-top: 1.5rem;

  text-align: center;

  color: #9ff09f;

  font-weight: 500;

  font-size: 1rem;

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



.page-intro {

  font-size: 1.05rem;

  color: rgba(100, 98, 98, 0.65);

  font-family: 'Cormorant Garamond', serif;

  line-height: 1.6;

  margin-bottom: 2.5rem;

  text-align: center;

  max-width: 700px;

  margin-left: auto;

  margin-right: auto;

}



/* ✅ RWD 補強：768px 以下 */

@media (max-width: 768px) {

  .glass-card {

    padding: 2rem 1rem;

  }



  .contact {

    padding: 2rem 1rem;

  }



  .contact-input,

.contact-form textarea,

.contact-form select {

  width: 100%;

  box-sizing: border-box;

  min-width: 0;

}



  .submit-btn {

    font-size: 1rem;

    padding: 0.8rem 1.2rem;

  }



  .success-msg {

    font-size: 0.95rem;

  }

}



/* ✅ 更小手機尺寸補強：480px 以下 */

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



  .contact-input,

  .contact-form textarea,

  .contact-form select {

    font-size: 0.95rem;

  }



  .contact-wrapper {

  display: flex;

  flex-wrap: wrap;

  gap: 2rem;

  justify-content: center;

  align-items: flex-start;

  padding: 2rem;

}





.price-text {

  max-width: 420px;

  color: rgba(255, 255, 255, 0.9);

  font-family: 'Cormorant Garamond', serif;

  line-height: 1.8;

  font-size: 1rem;

}



.price-text p {

  margin-bottom: 2rem;

  white-space: pre-line;

}

}



.contact-form input,

.contact-form textarea,

.contact-form select {

  position: relative;

  z-index: 20; /* 必須比 glass-card 高 */

  background-color: rgba(255, 255, 255, 0.05);

  color: white;

  pointer-events: auto; /* 強制可點 */

}

</style>