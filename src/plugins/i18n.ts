import { createI18n } from 'vue-i18n'
import fr from '@/assets/locales/fr.json'
import en from '@/assets/locales/fr.json'

export const i18n = createI18n({
    legacy: false,
    locale: 'fr',
    fallbackLocale: 'fr',
    messages: { fr, en },
  })
