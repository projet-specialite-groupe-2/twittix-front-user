import { Twit, TwitService, UserService, type Twit_TwitDTO, type User } from '@/core/api'
import { AxiosHttpRequest } from '@/core/api/core/AxiosHttpRequest'
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
    pageNumberFollow: number
    twitsForYouLoaded: boolean
    twitsFollowLoaded: boolean
    loading: boolean
  } => ({
    twitsForYou: [],
    twitsFollow: [],
    pageNumberFollow: 1,
    twitsForYouLoaded: false,
    twitsFollowLoaded: false,
    loading: false,
  }),
  actions: {
    async fetchForYouTwit(): Promise<void> {
      if (this.twitsForYouLoaded) {
        return
      }
      this.loading = true

      const twitService: TwitService = new TwitService(request)
      const result: Array<Twit_TwitDTO> = await twitService.getTwitsCollectionCustom({
        page: 1,
      })
      if (result.length !== 0) {
        this.setForYouTwit(result)
      } else {
        this.twitsForYouLoaded = true
      }

      this.loading = false
    },
    async fetchFollowTwits(): Promise<void> {
      if (this.twitsFollowLoaded) {
        return
      }
      this.loading = true

      const twitService: TwitService = new TwitService(request)
      const result: Array<Twit_TwitDTO> = await twitService.getTwitsCollectionFollowings({
        page: this.pageNumberFollow,
      })
      if (result.length !== 0) {
        this.pageNumberFollow++
        this.setFollowTwit(result)
      } else {
        this.twitsFollowLoaded = true
      }

      this.loading = false
    },
    setForYouTwit(twits: Array<Twit_TwitDTO>) {
      if (Array.isArray(twits)) {
        this.twitsForYou.push(...twits)
      } else {
        this.twitsForYou.push(...[twits as any])
      }
    },
    setFollowTwit(twits: Array<Twit_TwitDTO>) {
      if (Array.isArray(twits)) {
        this.twitsFollow.push(...twits)
      } else {
        this.twitsFollow.push(...[twits as any])
      }
    },
    async fetchTwitById(id: number): Promise<Twit_TwitDTO | undefined> {
      this.loading = true

      const twitService: TwitService = new TwitService(request)
      const twit: Twit_TwitDTO | undefined = await twitService.apiTwitsIdGet({ id: id.toString() })

      this.loading = false
      return twit
    },
    async createTwit(twit: Twit): Promise<Twit_TwitDTO | undefined> {
      const twitService: TwitService = new TwitService(request)
      this.loading = true
      const res = await twitService.apiTwitsPost({ requestBody: twit })
      const result = await this.fetchTwitById(res.id ?? 0)
      this.loading = false
      return result
    },
    async deleteTwit(id: number): Promise<boolean> {
      const twitService: TwitService = new TwitService(request)
      this.loading = true
      await twitService.apiTwitsIdDelete({ id: id.toString() })
      this.loading = false
      return true
    },
    async fetchCommentOfTwit(id: number, pageNumber: number): Promise<Array<Twit_TwitDTO>> {
      this.loading = true

      const twitService: TwitService = new TwitService(request)
      const result: Array<Twit_TwitDTO> = await twitService.getTwitsCollectionComments({
        id: id.toString(),
        page: pageNumber,
      })

      this.loading = false
      return result
    },
    async updateTwit(idTwit: number, content: string): Promise<Twit_TwitDTO | undefined> {
      const twitService: TwitService = new TwitService(request)
      this.loading = true
      const res = await twitService.apiTwitsIdPatch({
        id: idTwit.toString() ?? '0',
        requestBody: { content: content } as Twit,
      })
      const result = await this.fetchTwitById(res.id ?? 0)
      this.loading = false
      return result
    },
  },
})
