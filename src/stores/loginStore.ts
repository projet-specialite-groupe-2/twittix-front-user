import { defineStore } from 'pinia'
import { requestAuth } from './storeConfig'
import { jwtDecode } from 'jwt-decode'
import type { JwtPayload as BaseJwtPayload } from 'jwt-decode'

interface payload {
  exp: number
  email: string
}

interface TempTokenResponse {
  temporary_token: string
}

interface TokenResponse {
  token: string
  refresh_token: string
}

export const useLoginStore = defineStore('login', {
  state: (): {
    token: string | null
    refreshToken: string | null
    temporaryToken: string | null
    loading: boolean
  } => ({
    token: null,
    refreshToken: null,
    temporaryToken: null,
    loading: false,
  }),
  getters: {
    isLogged() {
      if (this.token) {
        const payload = this.decodedPayloadToken as payload
        if (!payload) return false

        return payload.exp !== undefined && payload.exp >= Math.floor(Date.now() / 1000)
      }
      return false
    },
    decodedPayloadToken(this: { token: string | null }) {
      if (!this.token) return null
      return jwtDecode(this.token)
    },
    getEmail() {
      if (this.token) {
        const payload = this.decodedPayloadToken as payload
        if (!payload) return null

        return payload.email as string
      }
      return null
    },
  },
  actions: {
    logout() {
      this.token = null
      this.refreshToken = null
      this.temporaryToken = null
      this.loading = false
    },

    async login(data: object) {
      try {
        this.loading = true

        const token: TempTokenResponse = await requestAuth.request({
          method: 'POST',
          url: '/login',
          body: data,
        })

        this.loading = false

        if (token.temporary_token !== undefined) this.temporaryToken = token.temporary_token

        return true
      } catch {
        this.loading = false
        this.temporaryToken = null
        return false
      }
    },

    async askCodeForToken(data: object) {
      try {
        this.loading = true

        const token: TokenResponse = await requestAuth.request({
          method: 'POST',
          url: '/verify-2fa',
          body: data,
          headers: {
            Authorization: `Bearer ${this.temporaryToken}`,
          },
        })

        this.loading = false

        if (token.token !== undefined) this.token = token.token
        if (token.refresh_token !== undefined) this.refreshToken = token.refresh_token

        return true
      } catch {
        this.loading = false
        this.token = null
        this.refreshToken = null
        return false
      }
    },

    async register(data: object) {
      try {
        this.loading = true

        const res: string = await requestAuth.request({
          method: 'POST',
          url: '/register',
          body: data,
        })

        this.loading = false
        return res
      } catch {
        this.loading = false
        return null
      }
    },

    async verifyEmail(token: string, email: string) {
      try {
        this.loading = true

        const res: { data?: any } = await requestAuth.request({
          method: 'GET',
          url: '/confirm-email?token=' + token + '&email=' + email,
        })

        this.loading = false

        if (res.data && res.data === 'success') {
          return true
        }

        return false
      } catch {
        this.loading = false
        return null
      }
    },
  },
})
