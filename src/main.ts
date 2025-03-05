import './assets/styles/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'
import { i18n } from './plugins/i18n'
import Vue3Toastify, { toast, type ToastContainerOptions } from 'vue3-toastify'

import 'vue3-toastify/dist/index.css'
import 'vuetify/styles'

const app = createApp(App)

const vuetify = createVuetify({
  component,
  directives,
  defaults: {
    VBtn: {
      variant: 'flat',
      rounded: 'xl',
      ripple: false,
      style: 'text-transform: none; letter-spacing: 0; font-weight: bold;',
    },

    VDialog: {
      maxWidth: '600',
      minHeight: '630',
    },

    VCard: {
      class: 'rounded-xl',
    },
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#000000',
          primary: '#000000',
          secondary: '#71767b',
          white: '#eff3f4',
          blue: '#1d9bf0',
          gray: '#2f3336',
        },
      },
    },
  },
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

app.config.globalProperties.$t = i18n.global.t

export { i18n }
