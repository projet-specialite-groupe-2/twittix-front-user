<template>
  <v-container fluid class="pa-0" style="height: 100vh !important; overflow-y: scroll">
  <v-row class="position-sticky top-0" style="z-index: 10 !important">
    <v-col cols="12" class="py-0">
      <div
        class="d-flex align-center d-inline-block w-100 h-100 pa-3"
        style="backdrop-filter: blur(10px)"
      >
        <v-btn
          id="btnTwitViewBack"
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
        v-on:retwit="onClickCurrentRePost"
        v-on:comment="openCurrentCommentDialog"
        v-on:delete-twit="deleteCurrentTwit"
        v-on:edit-twit="onClickEditCurrentTwit"
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
              <v-img :src="'/banner.jpg'" alt="Avatar" />
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
          <v-btn class="bg-white ml-5 mb-5 me-5" v-on:click="commentCurrentDialogAction(true, twitText)">
            {{ $t('view.twitView.reply') }}
          </v-btn>
        </div>
        <v-divider class="pa-1 border-opacity-25"></v-divider>
        </v-row>
      </v-container>
      <v-infinite-scroll class="w-100 h-100"  :items="comments" @load="load">
        <template v-for="(item, index) in comments" :key="item.id">
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
            v-on:retwit="onClickRePost(item.id ?? 0)"
            v-on:delete-twit="deleteTwit"
            v-on:edit-twit="onClickEditTwit(item.id ?? 0)"
            v-on:comment="openCommentDialog(item.id ?? 0)"
          />
        </template>
        <template #loading>
          <div v-if="!allCommentsLoaded">
            <v-progress-circular indeterminate color="white" />
          </div>
        </template>
      </v-infinite-scroll>
  </v-row>

  <AddComment
    v-if="commentTwitDialog"
    :twit-id="addEditTwit?.id ?? 0"
    :twit-content="addEditTwit?.content ?? ''"
    :twit-date="addEditTwit?.createdAt ?? ''"
    :user-id="addEditTwit?.authorId ?? ''"
    :username="addEditTwit?.authorUsername ?? ''"
    :user-twit-picture-url="'/banner.jpg'"
    :user-comment-picture-url="'/banner.jpg'"
    :open="commentTwitDialog"
    v-on:submit:form="commentDialogAction"
  />
  <AddTwitPopupComponent
      v-if="addEditTwitDialog"
      :user-picture-url="'/banner.jpg'"
      :open="addEditTwitDialog"
      :title="isEditingTwit ? t('view.homeView.twit.edit.title') : t('view.homeView.twit.repost.title')"
      :content="addEditTwit?.content ?? ''"
      v-on:submit:form="repostTwitDialogAction"
    ></AddTwitPopupComponent>
    <v-overlay v-model="commentTwitDialog" persistent />
  <v-overlay v-model="commentTwitDialog" persistent />
</v-container>
</template>

<script setup lang="ts">
import AddComment from '@/components/twit/addCommentComponent.vue';
import AddTwitPopupComponent from '@/components/twit/addTwitPopupComponent.vue';
import TwitComponent from '@/components/twit/twitComponent.vue';
import { Twit, type Twit_TwitDTO, type User } from '@/core/api';
import PageNameEnum from '@/core/types/enums/pageNameEnum';
import { useLikeStore } from '@/stores/likeStore';
import { useRepostsStore } from '@/stores/repostsStore';
import { useTwitStore } from '@/stores/twitStore';
import { useUserStore } from '@/stores/userStore';
import type { Ref } from 'vue';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter()
const { t } = useI18n()
const twit: Ref<Twit_TwitDTO | undefined> = ref(undefined)
const twitId: Ref<number> = ref(+router.currentRoute.value.params.idTwit)
const twitStore = useTwitStore()
const userStore = useUserStore()
const likeStore = useLikeStore()
const repostStore = useRepostsStore()

const commentTwitDialog = ref<boolean>(false)
const comments: Ref<Array<Twit_TwitDTO>> = ref([])
const currentUser = ref<User | undefined>(undefined)
const idTwitToDo = ref<number>(0)
const addEditTwit = ref<Twit_TwitDTO | undefined>()
const isEditingTwit = ref<boolean>(false)
const addEditTwitDialog = ref<boolean>(false)
const editCurrentTwit = ref<boolean>(false)
const allCommentsLoaded = ref<boolean>(false)

const twitLimit = 280
const twitLenght = ref<number>(0)
const twitPourcentage = ref<number>(0)
const twitText = ref<string>('')
const commentPageNumber = ref<number>(1)

onMounted(async () => {
  twit.value = await twitStore.fetchTwitById(twitId.value)
  currentUser.value = userStore.userProfil
});


const fetchComments = async () => {
  if(allCommentsLoaded.value) return
  const res = await twitStore.fetchCommentOfTwit(twitId.value, commentPageNumber.value)
  if(res.length === 0) {
    allCommentsLoaded.value = true
    return
  }
  commentPageNumber.value += 1
  if (Array.isArray(res)) {
    comments.value.push(...res)
  }
}

watch(
  () => twitText.value,
  () => {
    twitLenght.value = twitText.value.length
    twitPourcentage.value = (twitLenght.value / twitLimit) * 100
  },
  { immediate: true }
)

const progressCircularColor = (): string => {
  if (twitPourcentage.value < 80) return 'blue'
  if (twitPourcentage.value < 90) return 'orange'
  return 'red'
}

const likeCurrentTwit = async() => {
  if (twit.value) {
    await likeStore.switchLike(twit.value.id ?? 0)
    toast.success(t('view.twitView.twit.like.success'))
    twit.value.isLikedByUser = !twit.value.isLikedByUser
    if(twit.value.isLikedByUser) {
      twit.value.nbLikes = (twit.value.nbLikes ?? 0) + 1
    } else {
      twit.value.nbLikes = (twit.value.nbLikes ?? 0) - 1
    }
  }
}


const onClickEditCurrentTwit = (id: number) => {
  idTwitToDo.value = twitId.value
  isEditingTwit.value = true
  addEditTwitDialog.value = true
  addEditTwit.value = twit.value
  editCurrentTwit.value = true
}

const onClickEditTwit = (id: number) => {
  addEditTwit.value = comments.value.find(p => p.id === id)
  if (addEditTwit.value) {
    idTwitToDo.value = addEditTwit.value.id ?? 0
    isEditingTwit.value = true
    addEditTwitDialog.value = true
  }
}

const onClickCurrentRePost = async() => {
  if (twit.value && twit.value.isRepostedByUser) {
    const result = await repostStore.deleteRepost(twit.value.id ?? 0)
    if (result) {
        twit.value.isRepostedByUser = !twit.value.isRepostedByUser
        twit.value.nbReposts = (twit.value.nbReposts ?? 0) - 1
        toast.success(t('view.twitView.twit.repost.delete.success'))
      } else {
        toast.error(t('view.twitView.twit.repost.delete.error'))
      }
  } else {
    idTwitToDo.value = twit.value?.id ?? 0
    addEditTwitDialog.value = true
    editCurrentTwit.value = true
  }
}

const repostTwitDialogAction = async (confirm: boolean, data?: string) => {
  if (confirm && data) {
    if (!editCurrentTwit.value) {
      const post: Twit_TwitDTO | undefined = comments.value.find(p => p.id === idTwitToDo.value)
      if (post) {
        // if editing a twit, we update the content
        if (isEditingTwit.value) {
          const result = await twitStore.updateTwit(idTwitToDo.value, data)
          if(result) {
            toast.success(t('view.twitView.twit.edit.success'))
            post.content = data
          } else {
            toast.error(t('view.twitView.twit.edit.error'))
          }
        } // else if reposting a twit
        else {
          const result = await repostStore.createRepost(idTwitToDo.value, data)
          if(result) {
            toast.success(t('view.twitView.twit.repost.create.success'))
            post.isRepostedByUser = !post.isRepostedByUser
            if(post.isRepostedByUser) {
              post.nbReposts = (post.nbReposts ?? 0) + 1
            } else {
              post.nbReposts = (post.nbReposts ?? 0) - 1
            }
          } else {
            toast.error(t('view.twitView.twit.repost.create.error'))
          }
        }
      }
    } else if (twit.value) {
      // if editing a twit, we update the content
      if (isEditingTwit.value) {
          const result = await twitStore.updateTwit(idTwitToDo.value, data)
          if(result) {
            toast.success(t('view.twitView.twit.edit.success'))
            twit.value.content = data
          } else {
            toast.error(t('view.twitView.twit.edit.error'))
          }
        } // else if reposting a twit
        else {
          const result = await repostStore.createRepost(idTwitToDo.value, data)
          if(result) {
            toast.success(t('view.twitView.twit.repost.create.success'))
            twit.value.isRepostedByUser = !twit.value.isRepostedByUser
            if(twit.value.isRepostedByUser) {
              twit.value.nbReposts = (twit.value.nbReposts ?? 0) + 1
            } else {
              twit.value.nbReposts = (twit.value.nbReposts ?? 0) - 1
            }
          } else {
            toast.error(t('view.twitView.twit.repost.create.error'))
          }
        }
    }
  }
  isEditingTwit.value = false
  addEditTwitDialog.value = false
  idTwitToDo.value = 0
}

const likeTwit = async(id: number) => {
  const comment: Twit_TwitDTO | undefined = comments.value.find(p => p.id === id)
  if (comment) {
    const updated = await likeStore.switchLike(id)
    if (updated) {
      toast.success(t('view.homeView.twit.like.success'))
      comment.isLikedByUser = !comment.isLikedByUser
      if(comment.isLikedByUser) {
        comment.nbLikes = (comment.nbLikes ?? 0) + 1
      } else {
        comment.nbLikes = (comment.nbLikes ?? 0) - 1
      }
    } else {
      toast.error(t('view.homeView.twit.like.error'))
    }
  }
}

const onClickRePost = async(id: number) => {
  const comment: Twit_TwitDTO | undefined = comments.value.find(p => p.id === idTwitToDo.value)
  if (comment && comment.isRepostedByUser) {
    const result = await repostStore.deleteRepost(id)
    if (result) {
        comment.isRepostedByUser = !comment.isRepostedByUser
        comment.nbReposts = (comment.nbReposts ?? 0) - 1
        toast.success(t('view.homeView.twit.repost.delete.success'))
      } else {
        toast.error(t('view.homeView.twit.repost.delete.error'))
      }
  } else {
    idTwitToDo.value = id
    addEditTwitDialog.value = true
  }
}

const deleteCurrentTwit = async() => {
  const result = await twitStore.deleteTwit(twitId.value)
    if(result) {
      toast.success(t('view.homeView.twit.delete.success'))
      comments.value = comments.value.filter(p => p.id !== twitId.value)
    } else {
      toast.error(t('view.homeView.twit.delete.error'))
    }
  router.push({ name: PageNameEnum.MAIN })
}


const deleteTwit = async (id: number) => {
  const twit: Twit_TwitDTO | undefined = comments.value.find(p => p.id === id)
  if(twit) {
    const result = await twitStore.deleteTwit(id)
    if(result) {
      toast.success(t('view.homeView.twit.delete.success'))
      comments.value = comments.value.filter(p => p.id !== id)
    } else {
      toast.error(t('view.homeView.twit.delete.error'))
    }
  }
}

const openCommentDialog = (id: number) => {
  addEditTwit.value = comments.value.find(p => p.id === id)
  idTwitToDo.value = id
  commentTwitDialog.value = true
}

const openCurrentCommentDialog = () => {
  addEditTwit.value = twit.value
  idTwitToDo.value = twitId.value
  commentTwitDialog.value = true
  isEditingTwit.value = false
  addEditTwitDialog.value = false
}

const commentCurrentDialogAction = async (confirm: boolean, data?: unknown) => {
  idTwitToDo.value = twitId.value
  commentDialogAction(confirm, data)
  if (confirm && data) {
    twitText.value = ''
    twitLenght.value = 0
    twitPourcentage.value = 0
  }
}

const commentDialogAction = async(confirm: boolean, data?: unknown) => {
  if (confirm && data) {
    const twitCommented = {
      content: data,
      author: "/api/users/" + userStore.userProfil?.id,
      status: Twit.status.PUBLISHED,
      parent: idTwitToDo.value,
      likes: [],
      rePost: []
    }

    const result = await twitStore.createTwit(twitCommented as unknown as Twit)

    if (result) {
      toast.success(t('view.homeView.twit.post.success'))
      if (idTwitToDo.value === twitId.value) {
        comments.value.unshift(result as unknown as Twit_TwitDTO)
        twit.value!.nbComments = (twit.value!.nbComments ?? 0) + 1
      } else {
        const comment: Twit_TwitDTO | undefined = comments.value.find(p => p.id === idTwitToDo.value)
        if (comment) {
          comment.nbComments = (comment.nbComments ?? 0) + 1
        }
      }
    } else {
      toast.error(t('view.homeView.twit.post.error'))
    }
  }
  idTwitToDo.value = 0
  commentTwitDialog.value = false
}

const openTwit = (id: number) => {
  router.push({ name: PageNameEnum.TWIT, params : { idTwit: id } })
}

async function load({ side, done }: { side: any; done: (status: any) => void }) {
  await fetchComments()
  done('ok')
}

</script>
