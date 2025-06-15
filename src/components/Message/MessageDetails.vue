<template>
  <v-sheet class="d-flex flex-column h-screen" flat>
    <v-col class="position-sticky top-0" style="z-index: 1">
      <v-row
        class="d-flex justify-space-between w-100 px-4 pt-8 pb-2"
        style="backdrop-filter: blur(10px)"
      >
        <v-col cols="10">
          <v-row class="d-flex flex-row align-center ga-4">
            <v-col cols="1">
              <v-sheet
                class="bg-transparent"
                style="border-radius: 50%; border: 1px solid rgb(47, 51, 54)"
              >
                <v-avatar size="40">
                  <v-img
                    style="object-fit: cover; width: 100%; height: 100%"
                    src="https://pbs.twimg.com/profile_images/1888167261417897984/IZYKCEJg_400x400.jpg"
                  ></v-img>
                </v-avatar>
              </v-sheet>
            </v-col>
            <v-col cols="9">
              <h3 class="text-overflow-ellipsis">{{ conversation?.title }}</h3>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="2" class="d-flex justify-center">
          <v-row class="d-flex align-center justify-end gap-2">
            <v-btn
              class="bg-transparent"
              density="comfortable"
              icon="mdi-information-slab-circle-outline"
              size="small"
              @click="navigateToInfo"
            ></v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-col>

    <v-card-text class="overflow-y-scroll d-flex flex-column" style="height: 100%">
      <MessageBubble
        v-for="(message, index) in messagesList"
        :key="index"
        :text="message.content"
        :isMe="message.author?.id === user.userProfil?.id"
        :time="dayjs(message.createdAt).format('DD/MM/YYYY HH:mm')"
      />
    </v-card-text>

    <v-card-actions class="pa-3">
      <v-row class="d-flex align-center">
        <v-col cols="12">
          <v-text-field
            id="txtAreaAddCommentComponentPost"
            density="compact"
            :placeholder="$t('view.messagesPage.conversationPlaceholder')"
            variant="solo"
            bg-color="rgb(32, 35, 39)"
            flat
            hide-details
            rounded
            v-model="messageInput"
            @keyup.enter="sendMessage(messageInput)"
          >
            <template v-slot:append-inner>
              <v-btn icon color="blue" @click="sendMessage(messageInput)">
                <v-icon>mdi-send-variant-outline</v-icon>
              </v-btn>
            </template>
            <template v-slot:prepend-inner>
              <v-btn
                color="blue"
                class="bg-transparent"
                density="comfortable"
                icon="mdi-image"
                size="small"
              ></v-btn>
              <v-btn
                color="blue"
                class="bg-transparent"
                density="comfortable"
                icon="mdi-file-gif-box"
                size="small"
              ></v-btn>
              <v-btn
                color="blue"
                class="bg-transparent"
                density="comfortable"
                icon="mdi-emoticon-happy-outline"
                size="small"
              ></v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-sheet>
</template>

<script setup lang="ts">
import MessageBubble from '@/components/Message/MessageBubble.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageNameEnum from '@/core/types/enums/pageNameEnum'
import { useMessagesStore } from '@/stores/messagesStore'
import { toast } from 'vue3-toastify'
import dayjs from 'dayjs'
import { useUserStore } from '@/stores/userStore'
import { useConversationStore } from '@/stores/conversationStore'

const router = useRouter()
const route = useRoute()
const user = useUserStore()
const messageInput = ref('')
const id = route.params.id

const messagesStore = useMessagesStore()
const conversationStore = useConversationStore()

const conversation = computed(() => {
  return conversationStore.selectedConversation
})

const fetchMessages = async () => {
  const id = route.params.id

  console.log('iddzadadzad', id)

  if (id) {
    await messagesStore.getMessagesFromConversation(id as string)
  }
}

onMounted(() => {
  fetchMessages()
})

const messagesList = computed(() => {
  if (messagesStore.loading || !messagesStore.messages?.length) {
    return []
  }

  console.log('messagesStore.messages', messagesStore.messages)
  return messagesStore.messages
})

const navigateToInfo = () => {
  router.push({ name: PageNameEnum.MESSAGES_DETAIL_INFO })
}

const sendMessage = async (content: string) => {
  const response = await messagesStore.sendMessage(id as string, content)
  if (response) {
    messageInput.value = ''
    fetchMessages()
  } else {
    toast.error("Erreur lors de l'envoi du message")
  }
}
</script>
