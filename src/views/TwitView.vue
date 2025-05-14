<template>
  <v-container fluid class="pa-0" style="height: 100vh !important; overflow-y: scroll">
    <v-row class="position-sticky top-0" style="z-index: 10 !important">
      <v-col cols="12" class="py-0">
        <div
          class="d-flex align-center d-inline-block w-100 h-100 pa-3"
          style="backdrop-filter: blur(10px)"
        >
          <v-btn
            icon="mdi-arrow-left"
            size="small"
            class="bg-black mr-6"
            @click.prevent="$router.go(-1)"
          />

          <div>
            <h3>{{ $t('view.twitView.posts') }}</h3>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="position-relative mt-6">
      <TwitComponent
        v-if="twit"
        :twit-id="twit.id ?? 0"
        :twit-content="twit.content ?? ''"
        :twit-date="twit.createdAt ?? ''"
        :user-id="twit.author?.userIdentifier ?? ''"
        :username="twit.author?.username ?? ''"
        :user-picture-url="twit.author?.profileImgPath ?? ''"
        :twit-message-number="'9786'"
        :twit-like-number="twit.likes?.length.toString() ?? '0'"
        :twit-re-twit-number="twit.reposts?.length.toString() ?? '0'"
        :is-liked="twit.isLiked ?? false"
        :id-re-twit="twit.isReposted ?? false"
        v-on:like="likeTwit"
        v-on:retwit="rePost"
        v-on:comment="openCommentDialog"
      />

      <v-container>
        <v-textarea
          class="mx-2 ma-5"
          :label="$t('view.twitView.comment')"
          variant="plain"
          auto-grow
          rows="2"
          v-model="twitText"
          :maxlength="twitLimit"
        >
          <template v-slot:prepend>
            <v-avatar size="40">
              <v-img :src="currentUser?.profileImgPath" alt="Avatar" />
            </v-avatar>
          </template>
        </v-textarea>
        <v-row justify="end">
          <div>
            <v-progress-circular
              :model-value="twitPourcentage"
              :size="35"
              width="5"
              :color="progressCircularColor()"
            >
              <template v-slot:default v-if="twitPourcentage >= 80">
                {{ twitLimit - twitLenght }}
              </template>
            </v-progress-circular>
            <v-btn class="bg-white ml-5 mb-5 me-5">
              {{ $t('view.twitView.reply') }}
            </v-btn>
          </div>
          <v-divider class="pa-1 border-opacity-25"></v-divider>
        </v-row>
      </v-container>

      <div v-for="item in commentary" :key="item.id">
        <TwitComponent
          v-if="twit"
          :twit-id="item.id ?? 0"
          :twit-content="item.content ?? ''"
          :twit-date="item.createdAt ?? ''"
          :user-id="item.author?.userIdentifier ?? ''"
          :username="item.author?.username ?? ''"
          :user-picture-url="item.author?.profileImgPath ?? ''"
          :twit-message-number="'9786'"
          :twit-like-number="item.likes?.length.toString() ?? '0'"
          :twit-re-twit-number="item.reposts?.length.toString() ?? '0'"
          :is-liked="item.isLiked ?? false"
          :id-re-twit="item.isReposted ?? false"
          v-on:openTwit="openTwit"
          v-on:like="likeTwit"
          v-on:retwit="rePost"
          v-on:comment="openCommentDialog"
        />
      </div>
    </v-row>

    <AddComment
      v-if="commentTwitDialog"
      :twit-id="twit?.id ?? 0"
      :twit-content="twit?.content ?? ''"
      :twit-date="twit?.createdAt ?? ''"
      :user-id="twit?.author?.userIdentifier ?? ''"
      :username="twit?.author?.username ?? ''"
      :user-twit-picture-url="twit?.author?.profileImgPath ?? ''"
      :user-comment-picture-url="currentUser?.profileImgPath ?? ''"
      :open="commentTwitDialog"
      v-on:submit:form="commentDialogAction"
    />
    <v-overlay v-model="commentTwitDialog" persistent />
  </v-container>
</template>

<script setup lang="ts">
import AddComment from '@/components/twit/addCommentComponent.vue'
import TwitComponent from '@/components/twit/twitComponent.vue'
import { Twit, type User } from '@/core/api'
import PageNameEnum from '@/core/types/enums/pageNameEnum'
import { useTwitStore } from '@/stores/twitStore'
import { useUserStore } from '@/stores/userStore'
import type { Ref } from 'vue'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const twit: Ref<Twit | undefined> = ref(undefined)
const twitId: Ref<number> = ref(+router.currentRoute.value.params.idTwit)
const twitStore = useTwitStore()
const userStore = useUserStore()

const commentTwitDialog = ref<boolean>(false)
const commentary: Ref<Array<Twit>> = ref([])
const currentUser = ref<User | undefined>(undefined)

const twitLimit = 280
const twitLenght = ref<number>(0)
const twitPourcentage = ref<number>(0)
const twitText = ref<string>('')

onMounted(async () => {
  twit.value = await twitStore.fetchTwitById(twitId.value)
  userStore.fetchCurrentUser()
  currentUser.value = userStore.userProfil

  await twitStore.fetchTwit()
  commentary.value.push(...twitStore.twits)
})

watch(
  () => twitText.value,
  () => {
    twitLenght.value = twitText.value.length
    twitPourcentage.value = (twitLenght.value / twitLimit) * 100
  },
  { immediate: true }
)

function progressCircularColor(): string {
  if (twitPourcentage.value < 80) return 'blue'
  if (twitPourcentage.value < 90) return 'orange'
  return 'red'
}

function likeTwit(id: number) {
  const twit = commentary.value.find(p => p.id === id)
  if (twit) {
    if (twit.isLiked) {
      twit.likes?.pop()
    } else {
      twit.likes = [...(twit.likes || []), Date.now().toString()]
    }
    twit.isLiked = !twit.isLiked
  }
}

function rePost(id: number) {
  const twit = commentary.value.find(p => p.id === id)
  if (twit) {
    if (twit.isReposted) {
      twit.reposts?.pop()
    } else {
      twit.reposts = [...(twit.reposts || []), Date.now().toString()]
    }
    twit.isReposted = !twit.isReposted
  }
}

function openCommentDialog() {
  commentTwitDialog.value = true
}

function commentDialogAction(confirm: boolean, data?: unknown) {
  if (confirm && data) {
    // Todo with APIs
  }
  commentTwitDialog.value = false
}

function openTwit(id: number) {
  router.push({ name: PageNameEnum.TWIT, params: { idTwit: id } })
}
</script>

<style scoped></style>
