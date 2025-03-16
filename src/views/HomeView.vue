<template>
  <v-container class="pa-0" fluid>
    <v-row>
      <v-col
        justify="center"
        align="center"
        class="pa-0 overflow-y-scroll h-screen"
      >
        <v-col class="position-sticky top-0" style="z-index: 1;">
          <v-row no-gutters style=" backdrop-filter: blur(10px);">
            <v-col class="px-0">
              <v-btn block variant="text" rounded="0" class="mb-2 pa-0" v-on:click="setForYouView(true)">Pour vous</v-btn>
              <v-progress-linear v-if="isForYouView" class="w-25" color="blue" model-value="100"></v-progress-linear>
            </v-col>
            <v-col class="px-0">
              <v-btn block variant="text" rounded="0" class="mb-2 pa-0" v-on:click="setForYouView(false)">Abonnements</v-btn>
              <v-progress-linear v-if="!isForYouView" class="w-25" color="blue" model-value="100"></v-progress-linear>
            </v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
        </v-col>
        <v-col>
          <v-col>
            <v-container>
              <v-textarea
                class="mx-2"
                :label="'Quoi de neuf ?!'"
                variant="plain"
                auto-grow
                rows="2"
                counter
                v-model="twitText"
                :maxlength="twitLimit"
              >
              <template v-slot:prepend>
                  <v-avatar size="40">
                    <v-img :src="userPictureURL" alt="Avatar" />
                  </v-avatar>
              </template>
              </v-textarea>
            <v-row justify="end">
              <v-divider class="pa-1 border-opacity-25"></v-divider>
              <div class="h-100">
                <v-progress-circular :model-value="twitPourcentage" :size="35" width="5" :color="progressCircularColor()">
                  <template v-slot:default v-if="twitPourcentage >= 80"> {{ twitLimit - twitLenght }} </template>
                </v-progress-circular>
                <v-divider vertical class="ml-5 h-50 border-opacity-25"></v-divider>
                <v-btn class="bg-white ml-5">
                  {{ $t('components.navigationForm.post') }}
                </v-btn>
              </div>
            </v-row>
            </v-container>
            </v-col>
            <v-divider class="border-opacity-25"></v-divider>
          </v-col>
            <v-infinite-scroll :items="items" @load="load">
              <template v-for="(item) in items" :key="item">
                <TwitComponent
                  :twit-content="item.content ?? ''"
                  :twit-date="item.createdAt ?? ''"
                  :user-id="item.author?.userIdentifier ?? ''"
                  :username="item.author?.username ?? ''"
                  :user-picture-url="item.author?.profileImgPath ?? ''"
                  :twit-like-number="'976'"
                  :twit-message-number="'9786'"
                  :twit-re-twit-number="'876'"
                  :is-liked="isLike"
                  :id-re-twit="isReTwit"
                  v-on:like="isLike = !isLike"
                  v-on:retwit="isReTwit = !isReTwit"
                />
              </template>
            </v-infinite-scroll>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">

import TwitComponent from '@/components/twit/twitComponent.vue'
import { Twit, type User } from '@/core/api'
import { ref, watch, type Ref } from 'vue'

const isForYouView = ref<boolean>(true)
const twitLimit = 280
const twitLenght = ref<number>(0)
const twitPourcentage = ref<number>(0)

const twitText = ref<string>('')

const isLike = ref<boolean>(false)
const isReTwit = ref<boolean>(false)

const userPictureURL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Maupassant_par_Nadar.jpg/440px-Maupassant_par_Nadar.jpg'

const items: Ref<Array<Twit>> = ref([])
async function load({ done }) {
    // Perform API call
    for (let i = 0; i < 30; i++)
    {
      const res = await api()
      items.value.push(res)
  
    }

    done('ok')
}
  
async function api(): Promise<Twit> {
  return {
    id: 1,
    content: "⚽🔥 *Inazuma Eleven* : Le rêve de tous les fans de foot ⚡! Des matchs de folie, des techniques super puissantes 💥 et des personnages inoubliables 👕! \n\nLa Team Raimon 🏆 et ses héros comme Mark Evans 🧢, Axel Blaze 🔥 et la légende de la Tornado 🔄 qui nous font vibrer à chaque épisode! 😍⚡\n\nQui est votre joueur préféré? 🤔🎮 \n#InazumaEleven #Football #Anime #GénérationTornade",
    author: {
      id: 123,
      createdAt: "2024-03-01T12:00:00+00:00",
      updatedAt: "2024-03-05T14:30:00+00:00",
      deletedAt: null,
      email: "johndoe@example.com",
      roles: ["USER"],
      username: "johndoe",
      biography: "Passionate about technology and coding.",
      birthdate: "1995-06-15",
      profileImgPath: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Maupassant_par_Nadar.jpg/440px-Maupassant_par_Nadar.jpg",
      private: false,
      active: true,
      banned: false,
      twits: [],
      conversations: [],
      messages: [],
      userIdentifier: "@johndoe123",
    } as User,
    status: Twit.status.PUBLISHED,
    parent: null,
    createdAt: "2025-03-07T08:54:25+00:00",
  };
}

watch(
	() => twitText.value,
	() => {
    twitLenght.value = twitText.value.length
    twitPourcentage.value = twitLenght.value / twitLimit * 100
	},
	{ immediate: true },
)

function progressCircularColor(): string {
  if (twitPourcentage.value < 80) return 'blue'
  if (twitPourcentage.value < 90) return 'orange'
  return 'red'
}

function setForYouView(item: boolean) {
  isForYouView.value = item
}
</script>