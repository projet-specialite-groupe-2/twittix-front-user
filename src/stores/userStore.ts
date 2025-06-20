import { defineStore } from 'pinia'
import { Twit, UserService, type Twit_TwitDTO, type User } from '@/core/api'
import request from './storeConfig'
import { TwitsMockWithUser } from '@/core/mocks/twitMock'
import { createUserMock } from '@/core/mocks/userMock'
import { useLoginStore } from '@/stores/loginStore'
import { useTwitStore } from '@/stores/twitStore'

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

      userProfil[0].profileImgPath = '/banner.jpg'

      if (
        import.meta.env.VUE_APP_APP_ENV &&
        import.meta.env.VUE_APP_APP_ENV === 'test' &&
        username === 'user'
      ) {
        userProfil[0].username = 'user'
        userProfil[0].email = 'user@gmail.com'
        userProfil[0].biography = 'bio de test'
        userProfil[0].birthdate = '2000-01-01'
      }

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

      this.userProfil = userProfil[0] ?? undefined

      if (!this.userProfil) {
        return
      }

      if (import.meta.env.VUE_APP_APP_ENV && import.meta.env.VUE_APP_APP_ENV === 'test') {
        this.userProfil.username = 'user'
        this.userProfil.email = 'user@gmail.com'
      }

      this.userProfil.profileImgPath = '/banner.jpg'
    },

    async updateUserProfil(user: User) {
      const projectService: UserService = new UserService(request)
      this.loading = true

      const userProfil: User = await projectService.apiUsersIdPatch({
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

    getListOfTwits(userProfil: User): Array<Number> {
      if (userProfil && userProfil.twits && userProfil.twits.length > 0) {
        const list = userProfil.twits

        return list.map(twit => Number(twit.split('/')[3]))
      }
      return []
    },

    async fetchUserTwits(userProfil: User) {
      const twitStore = useTwitStore()

      this.loading = true

      // Récupération de la liste id des twits de l'utilisateur
      const listOfTwits: Array<Number> = this.getListOfTwits(userProfil)

      if (listOfTwits.length === 0) {
        this.userTwits = []
        return
      }

      let tempList: Array<Twit> = []
      for (const twitId of listOfTwits) {
        const twit: Twit_TwitDTO | undefined = await twitStore.fetchTwitById(Number(twitId))
        tempList.push(twit as Twit)
      }

      this.userTwits = tempList

      this.loading = false
    },
  },
})
