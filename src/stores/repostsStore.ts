import { defineStore } from 'pinia'
import { RepostService, type Repost } from '@/core/api'
import request from './storeConfig'
export const useRepostsStore = defineStore('reposts', {
  state: (): {
    loading: boolean
  } => ({
    loading: false,
  }),
  getters: {},
  actions: {
    async createRepost(twitId: number, content: string) {
      const repostService: RepostService = new RepostService(request)
      this.loading = true

      const result: Repost | null = await repostService.repostCreate({
        twitId: twitId.toString(),
        requestBody: {
          comment: content,
        },
      })

      this.loading = false
      if (result === null) {
        return false
      }
      return true
    },
    async deleteRepost(twitId: number) {
      const repostService: RepostService = new RepostService(request)
      this.loading = true

      await repostService.apiTwitsTwitIdrepostDelete({
        twitId: twitId.toString(),
      })

      this.loading = false
      return true
    },
  },
})
