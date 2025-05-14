<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-row
      v-bind="props"
      class="d-flex align-center w-100 pa-2 cursor-pointer"
      :style="{ backgroundColor: isHovering ? '#1c1c1c' : '' }"
      @click="navigateToConversation(id)"
    >
      <v-col cols="3" class="d-flex justify-center align-center pa-0">
        <v-sheet
          class="bg-transparent"
          style="border-radius: 50%; border: 1px solid rgb(47, 51, 54)"
        >
          <v-avatar size="45">
            <v-img
              style="object-fit: cover; width: 100%; height: 100%"
              src="https://pbs.twimg.com/profile_images/1888167261417897984/IZYKCEJg_400x400.jpg"
            ></v-img>
          </v-avatar>
        </v-sheet>
      </v-col>
      <v-col cols="7" class="align-start justify-start">
        <v-row class="d-flex align-center ga-2">
          <span class="text-subtitle-2 font-weight-bold">
            {{ profileName }}
          </span>
          <span class="d-flex text-caption font-weight-light text-grey">
            @{{ username }} . {{ date }}
          </span>
        </v-row>
        <v-row>
          <span class="text-body-2 font-weight-light text-grey">
            {{ subTitle }}
          </span>
        </v-row>
      </v-col>
      <v-col class="d-flex justify-end pa-0" cols="2">
        <v-menu v-model="menu" :close-on-content-click="false" location="start">
          <template v-slot:activator="{ props }">
            <v-btn
              v-if="isHovering || menu"
              class="bg-transparent"
              density="comfortable"
              icon="mdi-dots-horizontal"
              size="small"
              v-bind="props"
            ></v-btn>
          </template>

          <v-card
            min-width="300"
            class="bg-black"
            style="
              border-color: rgb(47, 51, 54);
              border-width: 1px;
              box-shadow:
                rgba(255, 255, 255, 0.2) 0px 0px 15px,
                rgba(255, 255, 255, 0.15) 0px 0px 3px 1px;
            "
          >
            <v-list class="w-full d-flex flex-row bg-black pa-0">
              <v-list-item class="pa-0">
                <template v-slot:append>
                  <v-btn class="w-full bg-black" prepend-icon="mdi-pin">
                    {{ $t('view.messagesPage.pinConversation') }}
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list class="w-full d-flex flex-row bg-black pa-0">
              <v-list-item class="pa-0">
                <template v-slot:append>
                  <v-btn class="w-full bg-black" prepend-icon="mdi-bell-off">
                    {{ $t('view.messagesPage.muteConversation') }}
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list class="w-full d-flex flex-row bg-black pa-0">
              <v-list-item class="pa-0">
                <template v-slot:append>
                  <v-btn class="w-full bg-black" prepend-icon="mdi-flag-variant-outline">
                    {{ $t('view.messagesPage.signalConversation') }}
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list class="w-full d-flex flex-row bg-black pa-0">
              <v-list-item class="pa-0">
                <template v-slot:append>
                  <v-btn class="text-red w-full bg-black" prepend-icon="mdi-trash-can-outline">
                    {{ $t('view.messagesPage.deleteConversation') }}
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>
  </v-hover>
</template>

<script lang="ts">
import { useConversationStore } from '@/stores/conversationStore'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MessageCard',
  props: {
    id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    profileName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
  },
  setup() {
    const menu = ref(false)
    const conversationStore = useConversationStore()

    const router = useRouter()

    const navigateToConversation = (id: string) => {
      conversationStore.setSelectedConversation(
        conversationStore.conversationList.find(
          conversation => conversation?.id?.toString() === id
        ) ?? null
      )

      console.log(id)
      router.push(`/messages/${id}`)
    }

    return {
      menu,
      navigateToConversation,
    }
  },
})
</script>
