import { Twit, TwitService, UserService, type Twit_TwitDTO, type User } from '@/core/api'
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
    twitsForYou: Array<Twit_TwitDTO>
    twitsFollow: Array<Twit_TwitDTO>
    pageNumberForYou: number
    pageNumberFollow: number
    loading: boolean
  } => ({
    twitsForYou: [],
    twitsFollow: [],
    pageNumberForYou: 1,
    pageNumberFollow: 1,
    loading: false,
  }),
  actions: {
    async fetchForYouTwit(): Promise<void> {
      this.loading = true

      const twitService: TwitService = new TwitService(request)
      const result: Array<Twit_TwitDTO> = await twitService.getTwitsCollectionCustom({
        page: this.pageNumberForYou,
      })
      if (result.length !== 0) {
        this.pageNumberForYou++
        this.setForYouTwit(result)
      }

      this.loading = false
    },
    async fetchFollowTwits(): Promise<void> {
      this.loading = true

      const twitService: TwitService = new TwitService(request)
      const result: Array<Twit_TwitDTO> = await twitService.getTwitsCollectionFollowings({
        page: this.pageNumberFollow,
      })
      if (result.length !== 0) {
        this.pageNumberFollow++
        this.setFollowTwit(result)
      }

      this.loading = false
    },
    setForYouTwit(twits: Array<Twit_TwitDTO>) {
      this.twitsForYou.push(...twits)
    },
    setFollowTwit(twits: Array<Twit_TwitDTO>) {
      this.twitsFollow.push(...twits)
    },
    async fetchTwitById(id: number): Promise<Twit_TwitDTO | undefined> {
      this.loading = true

      const twitService: TwitService = new TwitService(request)
      const twit: Twit_TwitDTO | undefined = await twitService.apiTwitsIdGet({ id: id.toString() })

      this.loading = false
      return twit
    },
    async createTwit(twit: Twit): Promise<Twit> {
      const twitService: TwitService = new TwitService(request)
      this.loading = true
      const res = twitService.apiTwitsPost({ requestBody: twit })
      this.loading = false
      return res
    },
    async deleteTwit(id: number): Promise<boolean> {
      const twitService: TwitService = new TwitService(request)
      this.loading = true
      //DELETE TWIT
      this.loading = false
      return true;
    }
  },
})
