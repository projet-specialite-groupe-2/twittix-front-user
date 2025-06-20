<template>
  <v-container class="pa-0" fluid>
    <v-row>
      <v-col justify="center" align="center" class="pa-0 overflow-y-scroll h-screen">
        <v-col class="position-sticky top-0" style="z-index: 1">
          <v-row
            class="d-flex justify-space-between w-100 px-4 pt-8"
            style="backdrop-filter: blur(10px)"
          >
            <v-col sm="10" md="10">
              <v-row>
                <h2>
                  {{ $t('view.messagesPage.title') }}
                </h2>
              </v-row>
            </v-col>

            <v-col sm="2" md="2" class="d-flex justify-center">
              <v-row class="d-flex align-center justify-end gap-2">
                <v-btn
                  class="bg-transparent"
                  density="comfortable"
                  icon="mdi-cog-outline"
                  size="small"
                ></v-btn>

                <NewMessageDialog />
              </v-row>
            </v-col>
          </v-row>
        </v-col>

        <v-col>
          <v-row class="d-flex align-center w-100 pa-4">
            <SearchInput />
          </v-row>
          <v-hover v-slot="{ isHovering, props }">
            <v-row
              v-bind="props"
              class="d-flex align-center w-100 pa-2 cursor-pointer"
              :style="{ backgroundColor: isHovering ? '#1c1c1c' : '' }"
            >
              <v-col cols="3" class="d-flex justify-center align-center pa-0">
                <v-sheet
                  class="pa-3 bg-transparent"
                  style="border-radius: 50%; border: 1px solid rgb(47, 51, 54)"
                >
                  <v-icon color="white" icon="mdi-email-outline"></v-icon>
                </v-sheet>
              </v-col>
              <v-col cols="9" class="align-start justify-start">
                <v-row class="d-flex align-center">
                  <span class="text-subtitle-2 font-weight-bold">
                    {{ $t('view.messagesPage.messagesRequests') }}
                  </span>
                </v-row>
                <v-row>
                  <span class="text-caption font-weight-light text-grey">
                    {{ $t('view.messagesPage.penddingRequests', { count: 0 }) }}
                  </span>
                </v-row>
              </v-col>
            </v-row>
          </v-hover>
          <MessageCard
            v-for="conversation in conversationList"
            :key="conversation.id"
            :id="conversation.id?.toString() ?? ''"
            :profile-name="conversation.title ?? ''"
            :username="conversation.title ?? ''"
            :date="dayjs(conversation.createdAt).format('DD/MM/YYYY HH:mm')"
            :sub-title="
              conversation.lastMessage?.content
                ? conversation.lastMessage.content.substring(0, 20) + '...'
                : ''
            "
          />
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import SearchInput from '@/components/Fields/SearchInput.vue'
import MessageCard from '@/components/Message/MessageCard.vue'
import NewMessageDialog from '@/components/Message/NewMessageDialog.vue'
import { useConversationStore } from '@/stores/conversationStore'
import dayjs from 'dayjs'

const conversationStore = useConversationStore()

onMounted(() => {
  // Load conversation list
  conversationStore.fetchConversationList()
})

const conversationList = computed(() => {
  if (conversationStore.loading || !conversationStore.conversationList?.length) {
    return []
  }
  return conversationStore.conversationList
})
</script>
