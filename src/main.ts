import './assets/styles/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import fr from '@/assets/locales/fr.json'
import en from '@/assets/locales/fr.json'
import Vue3Toastify, { toast, type ToastContainerOptions } from 'vue3-toastify'

import 'vue3-toastify/dist/index.css'
import 'vuetify/styles'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})

const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'fr',
  messages: { fr, en },
})

app.use(Vue3Toastify, {
  autoClose: 5000,
  position: toast.POSITION.BOTTOM_RIGHT,
  transition: toast.TRANSITIONS.SLIDE,
  theme: toast.THEME.COLORED,
  hideProgressBar: true,
  clearOnUrlChange: false,
} as ToastContainerOptions)

app.use(vuetify)
app.use(i18n)

app.use(createPinia())
app.use(router)

app.mount('#app')

export { i18n }
