import { defineStore } from 'pinia'
import { Twit, UserService, type User } from '@/core/api'
import request from './storeConfig'
import { TwitsMockWithUser } from '@/core/mocks/twitMock'
import { createUserMock } from '@/core/mocks/userMock'
import { useLoginStore } from '@/stores/loginStore'

export const useUserStore = defineStore('user', {
  state: (): {
    userProfil: User | undefined
    userTwits: Array<Twit>
    loading: boolean
  } => ({
    userProfil: undefined,
    loading: false,
    userTwits: [],
  }),
  getters: {
    getUsername(): string | null | undefined {
      if (!this.userProfil) {
        return null
      }

      return this.userProfil.username
    },
  },
  actions: {
    itsMe(mail: string): boolean {
      if (!this.userProfil) {
        return false
      }

      return this.userProfil.email === mail
    },

    async fetchUserProfil(username: string) {
      const projectService: UserService = new UserService(request)
      this.loading = true

      const userProfil: Array<User> = await projectService.apiUsersGetCollection({
        page: 1,
        username: username,
      })

      this.loading = false

      if (!userProfil || userProfil.length === 0) {
        return null
      }

      userProfil[0].profileImgPath = 'https://picsum.photos/200'

      return userProfil[0]
    },

    async fetchUserProfilByEmail() {
      const loginStore = useLoginStore()
      const email: string | null = loginStore.getEmail

      if (!email) {
        this.userProfil = undefined
        return
      }

      const projectService: UserService = new UserService(request)
      this.loading = true

      const userProfil: Array<User> = await projectService.apiUsersGetCollection({
        page: 1,
        email: email,
      })

      this.loading = false

      if (!userProfil || userProfil.length === 0) {
        this.userProfil = undefined
        return
      }

      this.userProfil = userProfil[0]

      this.userProfil.profileImgPath = 'https://picsum.photos/200'
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
        this.userProfil = undefined
        return { success: false }
      }

      this.userProfil = userProfil

      return { success: true }
    },

    async fetchUserTwits() {
      this.loading = true

      this.userTwits = TwitsMockWithUser

      this.loading = false
    },
    async fetchCurrentUser() {
      this.loading = true
      this.userProfil = createUserMock()
      this.loading = false
    },
  },
})
