import type { Twit } from '@/core/api'
import { TwitsMock } from '@/core/mocks/twitMock'
import { defineStore } from 'pinia'

export const useTwitStore = defineStore('twit', {
  state: (): {
    twits: Array<Twit>
    loading: boolean
  } => ({
    twits: [],
    loading: false,
  }),
  actions: {
    async fetchTwit() {
      this.loading = true

      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const result: Array<Twit> = TwitsMock;
      this.setTwit(result)

      this.loading = false
    },
    setTwit(twits: Array<Twit>) {
      this.twits = twits
    },
    async fetchTwitById(id: number): Promise<Twit | undefined> {
      this.loading = true

      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const twit: Twit = TwitsMock.filter((twit) => twit.id === id)[0];

      this.loading = false
      return twit
    }
  },
})
