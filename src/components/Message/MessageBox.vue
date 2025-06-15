<template>
  <v-sheet
    id="messageBox"
    class="position-absolute bottom-0 right-0 mr-10 py-2"
    style="
      border: 1px solid rgb(47, 51, 54);
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      box-shadow:
        rgba(255, 255, 255, 0.2) 0px 0px 15px,
        rgba(255, 255, 255, 0.15) 0px 0px 3px 1px;
      width: 360px;
    "
  >
    <v-row class="d-flex align-center cursor-pointer px-4" @click="expand = !expand">
      <v-col cols="8">
        <h3>
          {{ $t('view.messagesPage.title') }}
        </h3>
      </v-col>

      <v-col cols="4">
        <v-row class="d-flex align-center justify-end">
          <NewMessageDialog icon-size="large" />
          <v-btn
            class="bg-transparent"
            density="comfortable"
            icon="mdi-chevron-double-up"
            :class="{ 'rotate-180': expand }"
            size="large"
          ></v-btn>
        </v-row>
      </v-col>
    </v-row>

    <v-expand-transition>
      <v-col v-show="expand" class="mx-auto overflow-y-scroll" style="height: 400px; width: 100%">
        <MessageCard
          v-for="conversation in conversationList"
          :key="conversation.id"
          :id="conversation.id?.toString() ?? ''"
          :profile-name="conversation.title ?? ''"
          :username="conversation.title ?? ''"
          :date="dayjs(conversation.createdAt).format('DD/MM/YYYY HH:mm')"
          :sub-title="conversation.lastMessage?.content ?? ''"
        />
      </v-col>
    </v-expand-transition>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import MessageCard from '@/components/Message/MessageCard.vue'
import NewMessageDialog from '@/components/Message/NewMessageDialog.vue'
import { useConversationStore } from '@/stores/conversationStore'
import dayjs from 'dayjs'
const expand = ref(false)

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

<style scoped>
.rotate-btn {
  transition: transform 0.3s ease;
}
.rotate-180 {
  transform: rotate(180deg);
}
</style>
