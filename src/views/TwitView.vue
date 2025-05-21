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
      <TwitComponent v-if="twit"
          :twit-id="twit.id ?? 0"
          :twit-content="twit.content ?? ''"
          :twit-date="twit.createdAt ?? ''"
          :user-id="twit.authorId ?? ''"
          :username="twit.authorUsername ?? ''"
          :user-picture-url="twit.authorProfileImgPath ?? ''"
          :twit-message-number="twit.nbComments?.toString() ?? '0'"
          :twit-like-number="twit.nbLikes?.toString() ?? '0'"
          :twit-re-twit-number="twit.nbReposts?.toString() ?? '0'"
          :is-liked="twit.isLikedByUser ?? false"
          :id-re-twit="twit.isRepostedByUser ?? false"
          v-on:like="likeCurrentTwit"
          v-on:retwit="rePostCurrentTwit"
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

        <div class="w-100 h-100" v-for="item in commentary" :key="item.id ?? 0">
          <TwitComponent v-if="twit"
          :twit-id="item.id ?? 0"
          :twit-content="item.content ?? ''"
          :twit-date="item.createdAt ?? ''"
          :user-id="item.authorId ?? ''"
          :username="item.authorUsername ?? ''"
          :user-picture-url="item.authorProfileImgPath ?? ''"
          :twit-message-number="item.nbComments?.toString() ?? '0'"
          :twit-like-number="item.nbLikes?.toString() ?? '0'"
          :twit-re-twit-number="item.nbReposts?.toString() ?? '0'"
          :is-liked="item.isLikedByUser ?? false"
          :id-re-twit="item.isRepostedByUser ?? false"
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
      :user-id="twit?.authorId ?? ''"
      :username="twit?.authorUsername ?? ''"
      :user-twit-picture-url="twit?.authorProfileImgPath ?? ''"
      :user-comment-picture-url="currentUser?.profileImgPath ?? ''"
      :open="commentTwitDialog"
      v-on:submit:form="commentDialogAction"
    />
    <v-overlay v-model="commentTwitDialog" persistent />
  </v-container>
</template>

<script setup lang="ts">
import AddComment from '@/components/twit/addCommentComponent.vue';
import TwitComponent from '@/components/twit/twitComponent.vue';
import { Twit, type Twit_TwitCollectionDTO, type User } from '@/core/api';
import PageNameEnum from '@/core/types/enums/pageNameEnum';
import { useTwitStore } from '@/stores/twitStore';
import { useUserStore } from '@/stores/userStore';
import type { Ref } from 'vue';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const twit: Ref<Twit_TwitCollectionDTO | undefined> = ref(undefined)
const twitId: Ref<number> = ref(+router.currentRoute.value.params.idTwit)
const twitStore = useTwitStore()
const userStore = useUserStore()

const commentTwitDialog = ref<boolean>(false)
const commentary: Ref<Array<Twit_TwitCollectionDTO>> = ref([])
const currentUser = ref<User | undefined>(undefined)

const twitLimit = 280
const twitLenght = ref<number>(0)
const twitPourcentage = ref<number>(0)
const twitText = ref<string>('')

onMounted(async () => {
  twit.value = await twitStore.fetchTwitById(twitId.value)
  userStore.fetchCurrentUser()
  currentUser.value = userStore.userProfil

  commentary.value.push(...twitStore.twitsForYou)
});

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

function likeCurrentTwit() {
  if (twit.value) {
    // TODO Api call
    twit.value.isLikedByUser = !twit.value.isLikedByUser
    if(twit.value.isLikedByUser) {
      twit.value.nbLikes = (twit.value.nbLikes ?? 0) + 1
    } else {
      twit.value.nbLikes = (twit.value.nbLikes ?? 0) - 1
    }
  }
}

function rePostCurrentTwit() {
  if (twit.value) {
    // TODO Api call
    twit.value.isRepostedByUser = !twit.value.isRepostedByUser
    if(twit.value.isRepostedByUser) {
      twit.value.nbReposts = (twit.value.nbReposts ?? 0) + 1
    } else {
      twit.value.nbReposts = (twit.value.nbReposts ?? 0) - 1
    }
  }
}

function likeTwit(id: number) {
  const twit: Twit_TwitCollectionDTO | undefined = commentary.value.find(p => p.id === id)
  if (twit) {
    // TODO Api call
    twit.isLikedByUser = !twit.isLikedByUser
    if(twit.isLikedByUser) {
      twit.nbLikes = (twit.nbLikes ?? 0) + 1
    } else {
      twit.nbLikes = (twit.nbLikes ?? 0) - 1
    }
  }
}

function rePost(id: number) {
  const twit: Twit_TwitCollectionDTO | undefined = commentary.value.find(p => p.id === id)
  if(twit) {
    // TODO Api call
    twit.isRepostedByUser = !twit.isRepostedByUser
    if(twit.isRepostedByUser) {
      twit.nbReposts = (twit.nbReposts ?? 0) + 1
    } else {
      twit.nbReposts = (twit.nbReposts ?? 0) - 1
    }
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
  router.push({ name: PageNameEnum.TWIT, params : { idTwit: id } })
}

</script>

<style scoped>
</style>
