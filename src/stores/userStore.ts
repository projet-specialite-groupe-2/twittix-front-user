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
      const projectService: UserService = new UserService(request)
      this.loading = true

      const userProfil: Array<User> = await projectService.apiUsersGetCollection({
        page: 1,
        username: username,
      })

      this.loading = false

      if (!userProfil || userProfil.length === 0) {
        this.userProfil = null
        return
      }

      this.userProfil = userProfil[0]
    },

    async updateUserProfil(user: User) {
      const projectService: UserService = new UserService(request)
      this.loading = true

      const userProfil: User = await projectService.apiUsersIdPut({
        id: String(user.id),
        requestBody: user,
      })

      this.loading = false

      if (!userProfil) {
        this.userProfil = null
        return { success: false }
      }

      this.userProfil = userProfil

      return { success: true }
    },
  },
})
