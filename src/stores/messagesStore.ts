import { defineStore } from 'pinia'
import { MessageService, type Message_conversation_messages_read } from '@/core/api'
import request from './storeConfig'
import { useUserStore } from './userStore'

export const useMessagesStore = defineStore('messages', {
  state: (): {
    messages: Message_conversation_messages_read[]
    loading: boolean
  } => ({
    messages: [],
    loading: false,
  }),
  actions: {
    async getMessagesFromConversation(id: string) {
      const messageService: MessageService = new MessageService(request)
      try {
        console.log('id', id)
        const response = await messageService.apiConversationsIdmessagesGetCollection({
          id: id,
        })
        this.messages = response
          .sort((a, b) => {
            return new Date(a.createdAt ?? '').getTime() - new Date(b.createdAt ?? '').getTime()
          })
          .reverse()
        return true
      } catch {
        this.messages = []
        return false
      }
    },
    async sendMessage(conversationId: string, content: string) {
      const user = useUserStore()
      const messageService: MessageService = new MessageService(request)
      try {
        await messageService.apiMessagesPost({
          requestBody: {
            author: `api/users/${user.userProfil?.id}`,
            conversation: `api/conversations/${conversationId}`,
            content: content,
            createdAt: new Date().toISOString(),
          },
        })
        return true
      } catch {
        return false
      }
    },
  },
})
