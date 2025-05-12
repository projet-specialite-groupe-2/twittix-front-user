import { defineStore } from 'pinia'
import { ConversationService, type Conversation } from '@/core/api'
import request from './storeConfig'

export const useConversationStore = defineStore('conversation', {
  state: (): {
    conversationList: Conversation[]
    loading: boolean
  } => ({
    conversationList: [],
    loading: false,
  }),
  actions: {
    async fetchConversationList() {
      const projectService: ConversationService = new ConversationService(request)
      this.loading = true

      const conversation: Array<Conversation> = await projectService.apiConversationsGetCollection({
        page: 1,
      })

      this.loading = false

      if (!conversation || conversation.length === 0) {
        this.conversationList = []
        return
      }

      this.conversationList = conversation
    },
  },
})
