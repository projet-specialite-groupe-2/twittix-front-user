<template>
  <v-sheet class="d-flex flex-column h-screen" flat>
    <v-col class="position-sticky top-0" style="z-index: 1">
      <v-row
        class="d-flex justify-space-between w-100 px-4 pt-8 pb-2"
        style="backdrop-filter: blur(10px)"
      >
        <v-col cols="3">
          <v-row class="d-flex align-center ga-4">
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
            <h3>ZywOo</h3>
          </v-row>
        </v-col>

        <v-col sm="2" md="2" class="d-flex justify-center">
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

    <v-card-text class="overflow-y-scroll d-flex flex-column-reverse">
      <MessageBubble
        v-for="(message, index) in messages"
        :key="index"
        :text="message.text"
        :isMe="message.isMe"
        :time="message.time"
      />
    </v-card-text>

    <v-card-actions class="pa-3">
      <v-row class="d-flex align-center">
        <v-col cols="12">
          <v-text-field
            density="compact"
            :placeholder="$t('view.messagesPage.conversationPlaceholder')"
            variant="solo"
            bg-color="rgb(32, 35, 39)"
            flat
            hide-details
            rounded
          >
            <template v-slot:append-inner>
              <v-btn icon color="blue">
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PageNameEnum from '@/core/types/enums/pageNameEnum'

const messages = ref([
  { text: 'Ça va ?', time: '10:01', isMe: false },
  { text: 'Oui et toi ?', time: '10:02', isMe: true },
  { text: 'Premier message', time: '10:00', isMe: false },
  { text: 'Ça va ?', time: '10:01', isMe: false },
  { text: 'Oui et toi ?', time: '10:02', isMe: true },
  { text: 'Premier message', time: '10:00', isMe: false },
  { text: 'Ça va ?', time: '10:01', isMe: false },
  { text: 'Oui et toi ?', time: '10:02', isMe: true },
  { text: 'Premier message', time: '10:00', isMe: false },
  { text: 'Ça va ?', time: '10:01', isMe: false },
  { text: 'Oui et toi ?', time: '10:02', isMe: true },
  { text: 'Premier message', time: '10:00', isMe: false },
  { text: 'Ça va ?', time: '10:01', isMe: false },
  { text: 'Oui et toi ?', time: '10:02', isMe: true },
  { text: 'Premier message', time: '10:00', isMe: false },
  { text: 'Ça va ?', time: '10:01', isMe: false },
  { text: 'Oui et toi ?', time: '10:02', isMe: true },
  { text: 'Premier message', time: '10:00', isMe: false },
  { text: 'Ça va ?', time: '10:01', isMe: false },
  { text: 'Oui et toi ?', time: '10:02', isMe: true },
  { text: 'Premier message', time: '10:00', isMe: false },
  { text: 'Ça va ?', time: '10:01', isMe: false },
  { text: 'Oui et toi ?', time: '10:02', isMe: true },
  { text: 'Premier message', time: '10:00', isMe: false },
  { text: 'Ça va ?', time: '10:01', isMe: false },
  { text: 'Oui et toi ?', time: '10:02', isMe: true },
  { text: 'Premier message', time: '10:00', isMe: false },
  { text: 'Ça va ?', time: '10:01', isMe: false },
  { text: 'Oui et toi ?', time: '10:02', isMe: true },
  { text: 'Premier message', time: '10:00', isMe: false },
  { text: 'Ça va ?', time: '10:01', isMe: false },
  { text: 'Oui et toi ?', time: '10:02', isMe: true },
  { text: 'Premier message', time: '10:00', isMe: false },
  { text: 'Ça va ?', time: '10:01', isMe: false },
  { text: 'Oui et toi ?', time: '10:02', isMe: true },
  { text: 'Premier message', time: '10:00', isMe: false },
  { text: 'Ça va ?', time: '10:01', isMe: false },
  { text: 'Oui et toi ?', time: '10:02', isMe: true },
])

const router = useRouter()

const navigateToInfo = () => {
  router.push({ name: PageNameEnum.MESSAGES_DETAIL_INFO })
}
</script>
