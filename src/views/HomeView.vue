<template>
  <v-container class="pa-0" fluid>
    <v-row>
      <v-col justify="center" align="center" class="pa-0 overflow-y-scroll h-screen">
        <v-col class="position-sticky top-0" style="z-index: 1">
          <v-row no-gutters style="backdrop-filter: blur(10px)">
            <v-col class="px-0">
              <v-btn
                block
                variant="text"
                rounded="0"
                class="mb-2 pa-0"
                v-on:click="setForYouView(true)"
              >
                Pour vous
              </v-btn>
              <v-progress-linear
                v-if="isForYouView"
                class="w-25"
                color="red"
                model-value="100"
              ></v-progress-linear>
            </v-col>
            <v-col class="px-0">
              <v-btn
                block
                variant="text"
                rounded="0"
                class="mb-2 pa-0"
                v-on:click="setForYouView(false)"
              >
                Abonnements
              </v-btn>
              <v-progress-linear
                v-if="!isForYouView"
                class="w-25"
                color="red"
                model-value="100"
              ></v-progress-linear>
            </v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
        </v-col>
        <v-col>
          <v-col>
            <AddTwitComponent :user-picture-url="currentUser?.profileImgPath ?? ''"></AddTwitComponent>
          </v-col>
          <v-divider class="border-opacity-25"></v-divider>
        </v-col>
        <v-infinite-scroll :items="twits" @load="load">
          <template v-for="item in twits" :key="item">
            <TwitComponent
              :twit-id="item.id ?? 0"
              :twit-content="item.content ?? ''"
              :twit-date="item.createdAt ?? ''"
              :user-id="item.author?.userIdentifier ?? ''"
              :username="item.author?.username ?? ''"
              :user-picture-url="item.author?.profileImgPath ?? ''"
              :twit-like-number="item.likes?.length.toString() ?? '0'"
              :twit-message-number="'9786'"
              :twit-re-twit-number="item.reposts?.length.toString() ?? '0'"
              :is-liked="item.isLiked ?? false"
              :id-re-twit="item.isReposted ?? false"
              v-on:openTwit="openTwit"
              v-on:like="likeTwit"
              v-on:retwit="rePost"
              v-on:comment="openCommentDialog(item)"
            />
          </template>
        </v-infinite-scroll>
      </v-col>
    </v-row>
    <AddComment
      v-if="commentTwitDialog"
      :twit-id="addEditTwit?.id ?? 0"
      :twit-content="addEditTwit?.content ?? ''"
      :twit-date="addEditTwit?.createdAt ?? ''"
      :user-id="addEditTwit?.author?.userIdentifier ?? ''"
      :username="addEditTwit?.author?.username ?? ''"
      :user-twit-picture-url="addEditTwit?.author?.profileImgPath ?? ''"
      :user-comment-picture-url="currentUser?.profileImgPath ?? ''"
      :open="commentTwitDialog"
      v-on:submit:form="commentDialogAction"
    />
    <v-overlay v-model="commentTwitDialog" persistent />
  </v-container>
</template>

<script setup lang="ts">
import AddComment from '@/components/twit/addCommentComponent.vue'
import AddTwitComponent from '@/components/twit/addTwitComponent.vue'
import TwitComponent from '@/components/twit/twitComponent.vue'
import { Twit, type User } from '@/core/api'
import PageNameEnum from '@/core/types/enums/pageNameEnum'
import { useTwitStore } from '@/stores/twitStore'
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const isForYouView = ref<boolean>(true)
const twitStore = useTwitStore()
const userStore = useUserStore()

const commentTwitDialog = ref<boolean>(false)
const addEditTwit = ref<Twit | undefined>()

const currentUser = ref<User | undefined>()
const twits: Ref<Array<Twit>> = ref([])

onMounted(async () => {
  await userStore.fetchCurrentUser()
  currentUser.value = userStore.userProfil

})
function likeTwit(id: number) {
  const twit = twits.value.find(p => p.id === id);
  if (twit) {
    if (twit.isLiked) {
      twit.likes?.pop();
    } else {
      twit.likes = [...(twit.likes || []), Date.now().toString()];
    }
    twit.isLiked = !twit.isLiked;
  }
}

function rePost(id: number) {
  const twit = twits.value.find(p => p.id === id)
  if (twit) {
    if (twit.isReposted) {
      twit.reposts?.pop();
    } else {
      twit.reposts = [...(twit.reposts || []), Date.now().toString()];
    }
    twit.isReposted = !twit.isReposted;
  }
}

async function load({ done }: { done: (arg: string) => void }) {
  // Perform API call
  await twitStore.fetchTwit()
  twits.value.push(...twitStore.twits)

  done('ok')
}

function setForYouView(item: boolean) {
  isForYouView.value = item
}

function commentDialogAction(confirm: boolean, data?: unknown) {
  if (confirm && data) {
    // Todo with APIs
  }
  commentTwitDialog.value = false
}
function openCommentDialog(data: Twit) {
  addEditTwit.value = twits.value.find(p => p.id === data.id)
  commentTwitDialog.value = true
}

function openTwit(id: number) {
  router.push({ name: PageNameEnum.TWIT, params : { idTwit: id } })
}
</script>
