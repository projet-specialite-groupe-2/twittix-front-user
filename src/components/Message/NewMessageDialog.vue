<template>
  <v-dialog v-model="isActive">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        class="bg-transparent"
        density="comfortable"
        icon="mdi-email-plus-outline"
        :size="iconSize"
      ></v-btn>
    </template>

    <v-card class="bg-black px-4">
      <v-card-actions class="px-2 py-4">
        <v-col class="pa-0">
          <v-row>
            <v-col cols="2" class="d-flex align-center justify-start pa-0">
              <v-btn icon="mdi-close" :size="iconSize" @click="isActive = false"> </v-btn>
            </v-col>
            <v-col cols="8" class="d-flex align-center justify-start pa-0">
              <h2 class="text-h6 font-weight-bold w-100">
                {{ $t('view.messagesPage.newMessage') }}
              </h2>
            </v-col>
            <v-col cols="2" class="d-flex align-center justify-end pa-0">
              <v-btn class="bg-white px-6" @click="onNextClick">
                {{ $t('view.messagesPage.next') }}
              </v-btn>
            </v-col>
          </v-row>

          <v-row class="px-2">
            <v-text-field
              :placeholder="$t('view.messagesPage.searchPeople')"
              bg-color="transparent"
              variant="solo"
              hide-details
              @focus="onFocus"
              @blur="onBlur"
            >
              <template v-slot:prepend-inner>
                <v-icon :color="isFocused ? 'blue' : ''">mdi-magnify</v-icon>
              </template>
            </v-text-field>
          </v-row>
          <v-row>
            <v-chip
              v-for="user in usersSelectedForConversation"
              :key="user.id"
              class="ma-2"
              color="blue"
              closable
              @click:close="onUserClick(user)"
            >
              <v-avatar size="20" class="mr-2">
                <v-img
                  style="object-fit: cover; width: 100%; height: 100%"
                  src="https://pbs.twimg.com/profile_images/1888167261417897984/IZYKCEJg_400x400.jpg"
                ></v-img>
              </v-avatar>
              {{ user.username }}
            </v-chip>
            <v-divider></v-divider>
          </v-row>
        </v-col>
      </v-card-actions>
      <v-col>
        <v-hover v-slot="{ isHovering, props }">
          <v-row
            v-bind="props"
            class="d-flex align-center cursor-pointer px-2 py-2"
            :style="{ backgroundColor: isHovering ? '#1c1c1c' : '' }"
          >
            <v-col cols="1" class="justify-center align-center pa-0">
              <v-avatar
                class="bg-transparent"
                style="border: 1px solid rgb(29, 155, 240); border-radius: 50%"
              >
                <v-icon color="blue" icon="mdi-account-group" size="small"></v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="11" class="align-start justify-start">
              <v-row class="d-flex align-center ga-2 w-100">
                <span class="text-subtitle-2 font-weight-bold text-blue">
                  {{ $t('view.messagesPage.createGroup') }}
                </span>
              </v-row>
            </v-col>
          </v-row>
        </v-hover>

        <v-row>
          <v-divider></v-divider>
        </v-row>

        <v-row>
          <v-col>
            <v-row>
              <v-col class="h-100">
                <UserCard
                  v-for="user in usersList"
                  :key="user.id"
                  :id="user.id?.toString() ?? ''"
                  :username="user.username ?? ''"
                  :profile-name="user.username ?? ''"
                  v-on:user-click="onUserClick(user)"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, computed, onMounted } from 'vue'
import UserCard from './UserCard.vue'
import { useConversationStore } from '@/stores/conversationStore'
import type { User } from '@/core/api'
import router from '@/router'

defineProps({
  iconSize: {
    type: String,
    default: 'small',
  },
})

const usersSelectedForConversation = ref<User[]>([])

const isActive = ref(false)
const isFocused = ref(false)

const onFocus = () => (isFocused.value = true)
const onBlur = () => (isFocused.value = false)

const conversationStore = useConversationStore()

onMounted(() => {
  // Load conversation list
  conversationStore.fetchUsersList()
})

const usersList = computed(() => {
  if (conversationStore.userListLoading || !conversationStore.usersList?.length) {
    return []
  }
  return conversationStore.usersList
})

const onUserClick = (user: User) => {
  if (usersSelectedForConversation.value.includes(user)) {
    usersSelectedForConversation.value = usersSelectedForConversation.value.filter(
      userId => userId !== user
    )
  } else {
    usersSelectedForConversation.value.push(user)
  }
}

const onNextClick = async () => {
  const response = await conversationStore.createConversation(
    usersSelectedForConversation.value,
    usersSelectedForConversation.value.length > 1
      ? usersSelectedForConversation.value.map(user => user.username).join(', ')
      : (usersSelectedForConversation.value[0].username ?? '')
  )

  if (response) {
    isActive.value = false
    usersSelectedForConversation.value = []

    router.push(`/messages/${response}`)
  }
}
</script>
