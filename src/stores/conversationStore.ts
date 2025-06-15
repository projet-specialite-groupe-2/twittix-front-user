import { defineStore } from 'pinia'
import {
  ConversationService,
  UserService,
  type Conversation_user_conversations_read,
  type User,
} from '@/core/api'
import request from './storeConfig'
import { useUserStore } from './userStore'
import { toast } from 'vue3-toastify'

export const useConversationStore = defineStore('conversation', {
  state: (): {
    conversationList: Conversation_user_conversations_read[]
    selectedConversation: Conversation_user_conversations_read | null
    loading: boolean
    success: boolean
    usersList: User[]
    userListLoading: boolean
  } => ({
    conversationList: [],
    selectedConversation: null,
    loading: false,
    success: false,
    userListLoading: false,
    usersList: [],
  }),
  actions: {
    setSelectedConversation(conversation: Conversation_user_conversations_read | null) {
      this.selectedConversation = conversation
    },
    async createConversation(users: User[], title: string) {
      const user = useUserStore()

      const conversationService: ConversationService = new ConversationService(request)

      try {
        const response = await conversationService.apiConversationsPost({
          requestBody: {
            users: [
              `api/users/${user.userProfil?.id}`,
              ...users.map(user => `api/users/${user.id}`),
            ],
            title: title,
            createdAt: new Date().toISOString(),
          },
        })

        if (response?.id) {
          return response.id
        }
        return null
      } catch {
        toast.error('Erreur lors de la création de la conversation')
        return null
      }
    },
    async fetchConversationList() {
      const user = useUserStore()
      const projectService: ConversationService = new ConversationService(request)
      this.loading = true

      if (!user.userProfil?.id) {
        this.success = false
        return
      }

      try {
        const conversation = await projectService.apiUsersIdconversationsGetCollection({
          page: 1,
          id: user.userProfil?.id?.toString(),
        })

        this.loading = false
        if (conversation?.length === 0) {
          this.conversationList = []
          return
        }

        this.conversationList = conversation
      } catch {
        this.loading = false
        this.success = false
        return
      }
    },
    async fetchUsersList() {
      const projectService: UserService = new UserService(request)
      this.userListLoading = true

      try {
        const users = await projectService.apiUsersGetCollection({
          page: 1,
        })
        this.usersList = users
        this.userListLoading = false
        return true
      } catch {
        this.userListLoading = false
        return false
      }
    },
    async deleteConversation(id: string) {
      const conversationService: ConversationService = new ConversationService(request)
      await conversationService.apiConversationsIdDelete({ id })

      await this.fetchConversationList()
    },
  },
})
