import { defineStore } from 'pinia'
import { LikeService, type Like } from '@/core/api'
import request from './storeConfig'
export const useLikeStore = defineStore('like', {
  state: (): {
    loading: boolean
  } => ({
    loading: false,
  }),
  getters: {},
  actions: {
    async switchLike(twitId: number) {
      const likeService: LikeService = new LikeService(request)
      this.loading = true

      const result: Like | null = await likeService.apiTwitsTwitIdlikePost({
        twitId: twitId.toString(),
        requestBody: {
          author: "",
          twit: ""
        },
      })

      this.loading = false
      if (result === null) {
        return false
      }
      return true
    },
  },
})
