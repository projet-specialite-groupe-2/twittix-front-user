import { defineStore } from 'pinia'
import { requestAuth } from './storeConfig'

interface TokenResponse {
  temporary_token: string
}

export const useLoginStore = defineStore('login', {
  state: (): {
    token: string | null
    loading: boolean
  } => ({
    token: null,
    loading: false,
  }),
  persist: {
    storage: localStorage,
    key: 'token',
  },
  actions: {
    async login(data: Object) {
      try {
        this.loading = true

        const token: TokenResponse = await requestAuth.request({
          method: 'POST',
          url: '/login',
          body: data,
        })

        this.loading = false

        if (token.temporary_token !== undefined) this.token = token.temporary_token

        return true
      } catch (error) {
        this.loading = false
        this.token = null
        return false
      }
    },

    async register(data: Object) {
      try {
        this.loading = true

        const res: string = await requestAuth.request({
          method: 'POST',
          url: '/register',
          body: data,
        })

        this.loading = false
        return res
      } catch (error) {
        this.loading = false
        return null
      }
    },
  },
})
