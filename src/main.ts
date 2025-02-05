import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import fr from '@/translations/fr.json'
import en from '@/translations/en.json'

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

app.use(vuetify)
app.use(i18n)

app.use(createPinia())
app.use(router)

app.mount('#app')
