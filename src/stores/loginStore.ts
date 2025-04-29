import { defineStore } from 'pinia'
import { requestAuth } from './storeConfig'

export const useLoginStore = defineStore('login', {
  state: (): {
    token: string | null
    loading: boolean
  } => ({
    token: null,
    loading: false,
  }),
  actions: {
    async login(data: Object) {
      this.loading = true

      const token: string = await requestAuth.request({
        method: 'POST',
        url: '/login',
        body: data,
      })

      this.loading = false
      this.token = token
    },

    async register(data: Object) {
      this.loading = true

      const token: string = await requestAuth.request({
        method: 'POST',
        url: '/register',
        body: data,
      })

      this.loading = false
      this.token = token
    },
  },
})
