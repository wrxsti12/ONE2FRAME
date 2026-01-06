import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Contact from './views/Contact.vue'
import Quotation from './views/Quotation.vue'


const routes = [
  { path: '/', component: Home, meta: { title: '首頁 | ONE2FRAME' } },
  { path: '/quotation', component: Quotation, meta: { title: '報價單 | ONE2FRAME' } },
  { path: '/contact', component: Contact, meta: { title: '預約拍攝 | ONE2FRAME' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'ONE2FRAME'
  next()
})

export default router
