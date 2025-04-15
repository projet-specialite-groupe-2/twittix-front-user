import { defineStore } from 'pinia'
import { UserService, type User } from '@/core/api'
import request from './storeConfig'

export const useUserStore = defineStore('user', {
  state: (): {
    userProfil: User | null
    loading: boolean
  } => ({
    userProfil: null,
    loading: false,
  }),
  actions: {
    async fetchUserProfil(username: string) {
      const projectService = new UserService(request)
      this.loading = true

      const userProfil = await projectService.apiUsersGetCollection({ page: 1, username: username })

      this.loading = false

      if (!userProfil || userProfil.length === 0) {
        this.userProfil = null
        return
      }

      this.userProfil = userProfil[0]
    },
  },
})
