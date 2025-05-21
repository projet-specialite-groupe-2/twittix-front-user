import { Twit, TwitService, UserService, type Twit_TwitCollectionDTO, type User } from '@/core/api'
import { AxiosHttpRequest } from '@/core/api/core/AxiosHttpRequest'
import { TwitsMock } from '@/core/mocks/twitMock'
import { defineStore } from 'pinia'


const request = new AxiosHttpRequest({
  BASE: import.meta.env.VUE_APP_API_BASE as string,
  WITH_CREDENTIALS: false,
  CREDENTIALS: 'include',
  VERSION: 'v2',
})

export const useTwitStore = defineStore('twit', {
  state: (): {
    twitsForYou: Array<Twit_TwitCollectionDTO>
    twitsFollow: Array<Twit_TwitCollectionDTO>
    loading: boolean
  } => ({
    twitsForYou: [],
    twitsFollow: [],
    loading: false,
  }),
  actions: {
    async fetchForYouTwit(pageNumber: number): Promise<void> {
      this.loading = true

      const twitService: TwitService = new TwitService(request)
      const result: Array<Twit_TwitCollectionDTO> = await twitService.getTwitsCollectionCustom({
        page: pageNumber,
      })

      this.setForYouTwit(result)

      this.loading = false
    },
    async fetchFollowTwits(pageNumber: number): Promise<void> {
      this.loading = true

      const twitService: TwitService = new TwitService(request)
      const result: Array<Twit_TwitCollectionDTO> = await twitService.getTwitsCollectionCustom({
        page: pageNumber,
      })

      this.setFollowTwit(result)

      this.loading = false
    },
    setForYouTwit(twits: Array<Twit_TwitCollectionDTO>) {
      this.twitsForYou.push(...twits)
    },
    setFollowTwit(twits: Array<Twit_TwitCollectionDTO>) {
      this.twitsFollow.push(...twits)
    },
    async fetchTwitById(id: number): Promise<Twit_TwitCollectionDTO | undefined> {
      this.loading = true

      const twitService: TwitService = new TwitService(request)
      const userService: UserService = new UserService(request)
      const tmpTwit: Twit | undefined = await twitService.apiTwitsIdGet({ id: id.toString() })
      const author: User | undefined = await userService.apiUsersIdGet({ id: (tmpTwit.author as unknown as string).split('/').pop() ?? '' })
      const twit = tmpTwit as unknown as Twit_TwitCollectionDTO
      if (author) {
        twit.authorId = author.id?.toString() ?? ''
        twit.authorEmail = author.email
        twit.authorUsername = author.username ?? ''
        twit.authorProfileImgPath = author.profileImgPath
      }

      this.loading = false
      return twit
    },
    async createTwit(twit: Twit): Promise<Twit> {
      const twitService: TwitService = new TwitService(request)
      this.loading = true
      const res = twitService.apiTwitsPost({ requestBody: twit })
      this.loading = false
      return res
    }
  },
})
