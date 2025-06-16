<template>
  <v-container class="pa-0" fluid>
    <v-row>
      <v-col class="pa-0 overflow-y-scroll h-screen" justify="center" align="center">
        <div ref="scrollableCol" class="w-100 h-100 overflow-y-scroll">
        <v-col class="position-sticky top-0 pb-0" style="z-index: 1; backdrop-filter: blur(10px)">
          <v-row class="d-md-none d-flex pa-3 pb-1" no-gutters>
            <v-col cols="4" class="d-flex justify-start">
              <div class="hoverable" @click="goToProfilPage">
                <v-avatar :image="userStore.userProfil?.profileImgPath" size="40"></v-avatar>
              </div>
            </v-col>
            <v-col cols="4" class="d-flex justify-center">
              <div class="hoverable" @click="goToHomePage">
                <v-avatar size="45">
                  <v-img
                    class="user-select-none"
                    aspect-ratio="16/9"
                    cover
                    src="/src/assets/images/logo.png"
                  ></v-img>
                </v-avatar>
              </div>
            </v-col>
            <v-col cols="4"></v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="px-0">
              <v-btn
                id="btnForYouContent"
                block
                variant="text"
                rounded="0"
                class="mb-2 pa-0"
                v-on:click="setForYouView(true)"
              >
                {{ t('view.homeView.forYou') }}
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
                id="btnSubscriptionContent"
                block
                variant="text"
                rounded="0"
                class="mb-2 pa-0"
                v-on:click="setForYouView(false)"
              >
              {{ t('view.homeView.subscriptions') }}
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
            <AddTwitComponent
              :user-picture-url="userStore.userProfil?.profileImgPath ?? ''"
              :content="undefined"
              v-on:submit:form="addTwitAction"
            ></AddTwitComponent>
          </v-col>
          <v-divider class="border-opacity-25"></v-divider>
        </v-col>
        <v-infinite-scroll :items="twits" @load="load">
          <template v-for="(item, index) in twits" :key="index + 1">
            <TwitComponent
              :twit-id="item.id ?? 0"
              :twit-content="item.content ?? ''"
              :twit-date="item.createdAt ?? ''"
              :user-id="item.authorId ?? ''"
              :username="item.authorUsername ?? ''"
              :user-picture-url="item.authorProfileImgPath ?? ''"
              :twit-like-number="item.nbLikes?.toString() ?? '0'"
              :twit-message-number="item.nbComments?.toString() ?? '0'"
              :twit-re-twit-number="item.nbReposts?.toString() ?? '0'"
              :is-liked="item.isLikedByUser ?? false"
              :id-re-twit="item.isRepostedByUser ?? false"
              v-on:openTwit="openTwit"
              v-on:like="likeTwit"
              v-on:retwit="onClickRePost(item.id ?? 0)"
              v-on:delete-twit="deleteTwit"
              v-on:edit-twit="onClickEditTwit(item.id ?? 0)"
              v-on:comment="openCommentDialog(item)"
            />
          </template>
        </v-infinite-scroll>
      </div>
      </v-col>
    </v-row>
    <AddComment
      v-if="commentTwitDialog"
      :twit-id="addEditTwit?.id ?? 0"
      :twit-content="addEditTwit?.content ?? ''"
      :twit-date="addEditTwit?.createdAt ?? ''"
      :user-id="addEditTwit?.authorId ?? ''"
      :username="addEditTwit?.authorUsername ?? ''"
      :user-twit-picture-url="addEditTwit?.authorProfileImgPath ?? ''"
      :user-comment-picture-url="addEditTwit?.authorProfileImgPath ?? ''"
      :open="commentTwitDialog"
      v-on:submit:form="commentDialogAction"
    />
    <AddTwitPopupComponent
      v-if="addEditTwitDialog"
      :user-picture-url="userStore.userProfil?.profileImgPath ?? ''"
      :open="addEditTwitDialog"
      :title="isEditingTwit ? t('view.homeView.twit.edit.title') : t('view.homeView.twit.repost.title')"
      :content="addEditTwit?.content ?? ''"
      v-on:submit:form="repostTwitDialogAction"
    ></AddTwitPopupComponent>
    <v-overlay v-model="commentTwitDialog" persistent />
  </v-container>
</template>

<script setup lang="ts">
import AddComment from '@/components/twit/addCommentComponent.vue'
import AddTwitComponent from '@/components/twit/addTwitComponent.vue'
import TwitComponent from '@/components/twit/twitComponent.vue'
import { Twit, type Twit_TwitDTO } from '@/core/api'
import PageNameEnum from '@/core/types/enums/pageNameEnum'
import { useTwitStore } from '@/stores/twitStore'
import { useUserStore } from '@/stores/userStore'
import { ref, watch, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import type { VCol } from 'vuetify/components'
import { useLikeStore } from '@/stores/likeStore'
import { useRepostsStore } from '@/stores/repostsStore'
import AddTwitPopupComponent from '@/components/twit/addTwitPopupComponent.vue'

const router = useRouter()
const isForYouView = ref<boolean>(true)
const twitStore = useTwitStore()
const userStore = useUserStore()
const likeStore = useLikeStore()
const repostStore = useRepostsStore()
const { t } = useI18n()
const scrollableCol = ref<HTMLElement | null>(null)

const commentTwitDialog = ref<boolean>(false)
const addEditTwitDialog = ref<boolean>(false)
const addEditTwit = ref<Twit_TwitDTO | undefined>()

const twits: Ref<Array<Twit_TwitDTO>> = ref([])
const idTwitToDo = ref<number>(0)
const isEditingTwit = ref<boolean>(false)


const likeTwit = async(id: number) => {
  const twit: Twit_TwitDTO | undefined = twits.value.find(p => p.id === id)
  if (twit) {
    const updated = await likeStore.switchLike(id)
    if (updated) {
      toast.success(t('view.homeView.twit.like.success'))
      twit.isLikedByUser = !twit.isLikedByUser
      if(twit.isLikedByUser) {
        twit.nbLikes = (twit.nbLikes ?? 0) + 1
      } else {
        twit.nbLikes = (twit.nbLikes ?? 0) - 1
      }
    } else {
      toast.error(t('view.homeView.twit.like.error'))
    }
  }
}

const onClickEditTwit = (id: number) => {
  addEditTwit.value = twits.value.find(p => p.id === id)
  if (addEditTwit.value) {
    idTwitToDo.value = addEditTwit.value.id ?? 0
    isEditingTwit.value = true
    addEditTwitDialog.value = true
  }
}

const onClickRePost = async(id: number) => {
  const twit: Twit_TwitDTO | undefined = twits.value.find(p => p.id === idTwitToDo.value)
  if (twit && twit.isRepostedByUser) {
    const result = await repostStore.deleteRepost(id)
    if (result) {
        twit.isRepostedByUser = !twit.isRepostedByUser
        twit.nbReposts = (twit.nbReposts ?? 0) - 1
        toast.success(t('view.homeView.twit.repost.delete.success'))
      } else {
        toast.error(t('view.homeView.twit.repost.delete.error'))
      }
  } else {
    idTwitToDo.value = id
    addEditTwitDialog.value = true
  }
}


const deleteTwit = async (id: number) => {
  const twit: Twit_TwitDTO | undefined = twits.value.find(p => p.id === id)
  if(twit) {
    const result = await twitStore.deleteTwit(id)
    if(result) {
      toast.success(t('view.homeView.twit.delete.success'))
      twits.value = twits.value.filter(p => p.id !== id)
    } else {
      toast.error(t('view.homeView.twit.delete.error'))
    }
  }
}

function goToProfilPage() {
  router.push({ name: PageNameEnum.PROFIL, params: { username: '@' + userStore.getUsername } })
}

function goToHomePage() {
  router.push({ name: PageNameEnum.MAIN })
}

async function load({ side, done }: { side: any; done: (status: any) => void }) {
  await fetchTwits()
  done('ok')
}

async function fetchTwits() {
  if (isForYouView.value) {
    await twitStore.fetchForYouTwit()
    twits.value = []
    if(twitStore.twitsForYou.length === 0) {
      return
    }
    twits.value = twitStore.twitsForYou
  } else {
    await twitStore.fetchFollowTwits()
    twits.value = []
    if(twitStore.twitsFollow.length === 0) {
      return
    }
    twits.value = twitStore.twitsFollow
    }
}

watch(
  () => isForYouView.value,
  async () => {
    if(twits.value.length == 0) {
      return
    }
    if (isForYouView.value) {
      if(twitStore.twitsForYou.length === 0) {
        await fetchTwits()
      }
    } else {
      if(twitStore.twitsFollow.length === 0) {
        await fetchTwits()
      }
    }
    scrollableCol.value?.scrollTo({ top: 0, behavior: 'smooth' });
  },
  { immediate: true }
)

function setForYouView(item: boolean) {
  isForYouView.value = item
}

const repostTwitDialogAction = async (confirm: boolean, data?: string) => {
  if (confirm && data) {
    const twit: Twit_TwitDTO | undefined = twits.value.find(p => p.id === idTwitToDo.value)
    if (twit) {
      // if editing a twit, we update the content
      if (isEditingTwit.value) {
        const result = await repostStore.createRepost(idTwitToDo.value, data)
        if(result) {
          toast.success(t('view.homeView.twit.edit.success'))
        } else {
          toast.error(t('view.homeView.twit.edit.error'))
        }
      } // else if reposting a twit
      else {
        const result = await repostStore.createRepost(idTwitToDo.value, data)
        if(result) {
          toast.success(t('view.homeView.twit.repost.create.success'))
          twit.isRepostedByUser = !twit.isRepostedByUser
          if(twit.isRepostedByUser) {
            twit.nbReposts = (twit.nbReposts ?? 0) + 1
          } else {
            twit.nbReposts = (twit.nbReposts ?? 0) - 1
          }
        } else {
          toast.error(t('view.homeView.twit.repost.create.error'))
        }
      }
    }
  }
  addEditTwitDialog.value = false
}

async function commentDialogAction(confirm: boolean, data?: string) {
  if (confirm && data) {
    const twit = {
      content: data,
      author: "/api/users/" + userStore.userProfil?.id,
      status: Twit.status.PUBLISHED,
      parent: addEditTwit.value?.id,
      likes: [],
      rePost: []
    }
    const result = await twitStore.createTwit(twit as unknown as Twit)

    if (result) {
      toast.success(t('view.homeView.twit.post.success'))
      twits.value.unshift(result as unknown as Twit_TwitDTO)
    } else {
      toast.error(t('view.homeView.twit.post.error'))
    }
  }
  commentTwitDialog.value = false
}
function openCommentDialog(data: Twit_TwitDTO) {
  addEditTwit.value = twits.value.find(p => p.id === data.id)
  commentTwitDialog.value = true
}

function openTwit(id: number) {
  router.push({ name: PageNameEnum.TWIT, params: { idTwit: id } })
}

async function addTwitAction(confirm: boolean, data?: string) {
  if (confirm && data) {
    const twit = {
      content: data,
      author: "/api/users/" + userStore.userProfil?.id,
      status: Twit.status.PUBLISHED,
      parent: null,
      likes: [],
      rePost: []
    }
    const result = await twitStore.createTwit(twit as unknown as Twit)

    if (result) {
      toast.success(t('view.homeView.twit.post.success'))
      twits.value.unshift(result as unknown as Twit_TwitDTO)
    } else {
      toast.error(t('view.homeView.twit.post.error'))
    }
  }
}
</script>
