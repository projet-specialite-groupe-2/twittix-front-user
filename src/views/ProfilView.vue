<template>
  <v-container fluid class="pa-0" style="height: 100vh !important; overflow-y: scroll">
    <div v-if="userStore.loading" class="fill-height d-flex justify-center align-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else-if="profilNotFound" class="text-center mt-8">
      <v-icon size="64" color="red" class="mb-4">mdi-account-off</v-icon>
      <div class="text-red font-weight-bold text-h5">{{ $t('view.profilPage.userNotFound') }}</div>
      <div class="text-grey text-subtitle-1 mt-2">
        {{ $t('view.profilPage.profileNotFound') }}
      </div>
      <v-btn size="large" class="bg-white mt-6 px-16" @click="$router.push({ name: 'Main' })">
        {{ $t('view.profilPage.backToMain') }}
      </v-btn>
    </div>
    <template v-else-if="userProfil !== null && !profilNotFound">
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
              <v-skeleton-loader
                v-if="userProfilLoading"
                color="primary"
                max-width="300"
                type="heading"
              ></v-skeleton-loader>
              <template v-else>
                <h3>{{ userProfil?.username }}</h3>

                <h5 class="opacity-50">
                  {{ userProfil?.nbPosts }}
                  {{
                    userProfil?.nbPosts <= 1
                      ? $t('view.profilPage.post')
                      : $t('view.profilPage.posts')
                  }}
                </h5>
              </template>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row class="position-relative mt-6">
        <v-col class="pa-0" style="max-height: 275px">
          <v-img
            v-if="!userProfilLoading"
            width="auto"
            aspect-ratio="16/9"
            cover
            src="/banner.jpg"
            max-height="200px"
            height="100%"
          ></v-img>

          <v-avatar
            v-if="!userProfilLoading"
            class="avatar-absolute ms-4"
            :image="userProfil.image"
          ></v-avatar>

          <div class="d-flex flex-column">
            <template v-if="userStore.itsMe(userProfil.email)">
              <div class="d-none d-sm-flex">
                <v-dialog v-model="dialog" @update:model-value="handleDialogClose">
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-btn
                      v-if="!userProfilLoading"
                      id="edit-profil-button"
                      v-bind="activatorProps"
                      size="large"
                      variant="outlined"
                      style="position: absolute; right: 15px; bottom: 0"
                      class="me-4"
                    >
                      {{ $t('view.profilPage.editProfil') }}
                    </v-btn>
                  </template>

                  <template v-slot:default="{ isActive }">
                    <v-card class="bg-black overflow-hidden">
                      <v-card-actions>
                        <v-row>
                          <v-col cols="7" class="d-flex align-center justify-start pt-1 mb-1">
                            <v-btn icon="mdi-close" size="large" @click="isActive.value = false">
                            </v-btn>

                            <h2 class="ms-3 text-h5">{{ $t('view.profilPage.editProfil') }}</h2>
                          </v-col>
                          <v-col cols="5" class="d-flex align-center justify-end pt-1 mb-1">
                            <v-btn
                              size="large"
                              class="bg-white px-6 py-2 mr-2 h-auto"
                              @click="saveEdit"
                            >
                              {{ $t('view.profilPage.save') }}
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-actions>

                      <v-row class="position-relative" style="max-height: 250px">
                        <v-col class="pa-0 position-relative">
                          <v-img
                            width="auto"
                            aspect-ratio="16/9"
                            cover
                            src="/banner.jpg"
                            max-height="170px"
                            height="100%"
                            class="d-flex align-center position-relative"
                          >
                            <div class="smoke-screen"></div>
                            <div class="d-flex justify-center align-center">
                              <v-btn
                                icon="mdi-camera"
                                class="mx-3 text-white"
                                style="background-color: rgba(0, 0, 0, 0.5)"
                              >
                              </v-btn>
                              <v-btn
                                icon="mdi-close"
                                class="mx-3 text-white"
                                style="background-color: rgba(0, 0, 0, 0.5)"
                              >
                              </v-btn>
                            </div>
                          </v-img>

                          <v-avatar class="avatar-absolute-edit">
                            <v-img :src="userProfil.image"></v-img>
                            <div class="smoke-screen"></div>

                            <v-btn
                              icon="mdi-camera"
                              class="mx-3 text-white position-absolute"
                              style="background-color: rgba(0, 0, 0, 0.5)"
                            >
                            </v-btn>
                          </v-avatar>
                        </v-col>
                      </v-row>

                      <v-row class="px-8 py-4">
                        <v-col class="pa-0">
                          <v-text-field
                            id="edit-profil-name"
                            class="pb-4"
                            :label="$t('view.profilPage.name')"
                            v-model="userProfilUpdated.username"
                          >
                          </v-text-field>

                          <v-text-field
                            id="edit-profil-bio"
                            class="pb-4"
                            :label="$t('view.profilPage.bio')"
                            v-model="userProfilUpdated.biography"
                          >
                          </v-text-field>

                          <div>
                            <span class="opacity-50 text-subtitle-2"
                              >{{ $t('view.profilPage.birthDate') }} •
                            </span>
                            <button
                              type="button"
                              class="text-subtitle-2 text-red"
                              @click="editBirthday = !editBirthday"
                            >
                              {{ $t('view.profilPage.edit') }}
                            </button>
                          </div>

                          <div v-if="!editBirthday" id="edit-profil-birthday">
                            {{ userProfilUpdated.birthday }}
                          </div>
                          <v-text-field v-else class="pb-4" v-model="birthdayInput" type="date" />
                        </v-col>
                      </v-row>
                    </v-card>
                  </template>
                </v-dialog>
              </div>

              <div class="d-flex d-sm-none">
                <v-dialog
                  transition="dialog-bottom-transition"
                  fullscreen
                  v-model="dialogMobile"
                  @update:model-value="handleDialogClose"
                >
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-btn
                      v-if="!userProfilLoading"
                      id="edit-profil-mobile"
                      v-bind="activatorProps"
                      size="large"
                      variant="outlined"
                      style="position: absolute; right: 15px; bottom: 0"
                      class="me-4"
                    >
                      {{ $t('view.profilPage.editProfil') }}
                    </v-btn>
                  </template>

                  <template v-slot:default="{ isActive }">
                    <v-card class="bg-black overflow-hidden">
                      <v-card-actions>
                        <v-row>
                          <v-col cols="7" class="d-flex align-center justify-start pt-1 mb-1">
                            <v-btn icon="mdi-close" size="large" @click="isActive.value = false">
                            </v-btn>

                            <h2 class="ms-3 text-h6">{{ $t('view.profilPage.editProfil') }}</h2>
                          </v-col>
                          <v-col cols="5" class="d-flex align-center justify-end pt-1 mb-1">
                            <v-btn
                              size="large"
                              class="bg-white px-6 py-2 mr-2 h-auto"
                              @click="saveEdit"
                            >
                              {{ $t('view.profilPage.save') }}
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-actions>

                      <v-row class="position-relative" style="max-height: 250px">
                        <v-col class="pa-0 position-relative">
                          <v-img
                            width="auto"
                            aspect-ratio="16/9"
                            cover
                            src="/banner.jpg"
                            max-height="170px"
                            height="100%"
                            class="d-flex align-center position-relative"
                          >
                            <div class="smoke-screen"></div>
                            <div class="d-flex justify-center align-center">
                              <v-btn
                                icon="mdi-camera"
                                class="mx-3 text-white"
                                style="background-color: rgba(0, 0, 0, 0.5)"
                              >
                              </v-btn>
                              <v-btn
                                icon="mdi-close"
                                class="mx-3 text-white"
                                style="background-color: rgba(0, 0, 0, 0.5)"
                              >
                              </v-btn>
                            </div>
                          </v-img>

                          <v-avatar class="avatar-absolute-edit">
                            <v-img :src="userProfil.image"></v-img>
                            <div class="smoke-screen"></div>

                            <v-btn
                              icon="mdi-camera"
                              class="mx-3 text-white position-absolute"
                              style="background-color: rgba(0, 0, 0, 0.5)"
                            >
                            </v-btn>
                          </v-avatar>
                        </v-col>
                      </v-row>

                      <v-row class="px-8 py-4">
                        <v-col class="pa-0">
                          <v-text-field
                            class="pb-4"
                            :label="$t('view.profilPage.name')"
                            v-model="userProfilUpdated.username"
                          >
                          </v-text-field>

                          <v-text-field
                            class="pb-4"
                            :label="$t('view.profilPage.bio')"
                            v-model="userProfilUpdated.biography"
                          >
                          </v-text-field>

                          <div>
                            <span class="opacity-50 text-subtitle-2"
                              >{{ $t('view.profilPage.birthDate') }} •
                            </span>
                            <button
                              type="button"
                              class="text-subtitle-2 text-red"
                              @click="editBirthday = !editBirthday"
                            >
                              {{ $t('view.profilPage.edit') }}
                            </button>
                          </div>

                          <div v-if="!editBirthday">{{ userProfilUpdated.birthday }}</div>
                          <v-text-field v-else class="pb-4" v-model="birthdayInput" type="date" />
                        </v-col>
                      </v-row>
                    </v-card>
                  </template>
                </v-dialog>
              </div>
            </template>
            <v-btn
              v-else
              size="large"
              variant="outlined"
              style="position: absolute; right: 15px; bottom: 0"
              class="me-4"
            >
              {{ $t('view.profilPage.follow') }}
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <div id="profil-page-user-info" class="mt-5 px-5">
        <v-skeleton-loader
          v-if="userProfilLoading"
          color="primary"
          type="paragraph"
        ></v-skeleton-loader>
        <template v-else>
          <h2>{{ userProfil?.username }}</h2>

          <h4 class="opacity-50 font-weight-light mb-3">{{ userProfil?.userIdentifier }}</h4>

          <div class="font-weight-medium mb-3">{{ userProfil?.biography }}</div>

          <div class="d-flex">
            <div>
              <b>{{ userProfil?.nbFollowings }}&nbsp;</b>
              <span class="opacity-50">{{ $t('view.profilPage.following') }}</span>
            </div>
            <div class="mx-5">
              <b>{{ userProfil?.nbFollowers }}&nbsp;</b>
              <span class="opacity-50">{{ $t('view.profilPage.followers') }}</span>
            </div>
          </div>
        </template>
      </div>

      <v-row no-gutters class="mt-6">
        <v-col class="px-0">
          <v-btn
            block
            variant="text"
            rounded="0"
            class="mb-2 pa-0"
            v-on:click="isForYouView = true"
          >
            {{ $t('view.profilPage.posts') }}
          </v-btn>
          <v-progress-linear
            v-if="isForYouView"
            class="w-25 mx-auto"
            color="red"
            model-value="100"
            style="margin: 0 auto !important"
          ></v-progress-linear>
        </v-col>
        <v-col class="px-0">
          <v-btn
            block
            variant="text"
            rounded="0"
            class="mb-2 pa-0"
            v-on:click="isForYouView = false"
          >
            {{ $t('view.profilPage.likes') }}
          </v-btn>
          <v-progress-linear
            v-if="!isForYouView"
            class="w-25"
            color="red"
            model-value="100"
            style="margin: 0 auto !important"
          ></v-progress-linear>
        </v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>

      <template v-for="item in myTwits" :key="item.id">
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

      <v-overlay v-model="commentTwitDialog" persistent />
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
    </template>
  </v-container>
</template>

<script setup lang="ts">
import AddComment from '@/components/twit/addCommentComponent.vue'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/fr'
import 'dayjs/locale/en-gb'
import { ref, watch, onMounted, onUnmounted, onUpdated, type Ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TwitComponent from '@/components/twit/twitComponent.vue'
import { useUserStore } from '@/stores/userStore'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { Twit, type Twit_TwitDTO } from '@/core/api'
import { useTwitStore } from '@/stores/twitStore'
import { useRepostsStore } from '@/stores/repostsStore'
import { useLikeStore } from '@/stores/likeStore'
import PageNameEnum from '@/core/types/enums/pageNameEnum'

const { locale, t } = useI18n()
dayjs.extend(customParseFormat)
dayjs.locale(locale.value)

const userStore = useUserStore()
const twitStore = useTwitStore()
const repostStore = useRepostsStore()
const likeStore = useLikeStore()
const route = useRoute()
const router = useRouter()
const isForYouView = ref<boolean>(true)
const twitLimit = 280
const twitLenght = ref<number>(0)
const twitPourcentage = ref<number>(0)
const twitText = ref<string>('')
const profilNotFound = ref<boolean>(false)
const selectedUserProfil = ref<object | null>(null)

const commentTwitDialog = ref<boolean>(false)
const addEditTwit = ref<Twit | undefined>()

const editBirthday = ref<boolean>(false)
const dialog = ref<boolean>(false)
const dialogMobile = ref<boolean>(false)

interface EditUserInterface {
  birthday: string
  biography: string
  username: string
}

const userProfilUpdated = ref<EditUserInterface>({
  birthday: '',
  biography: '',
  username: '',
})

const idTwitToDo = ref<number>(0)
const isEditingTwit = ref<boolean>(false)
const addEditTwitDialog = ref<boolean>(false)

function handleDialogClose(isOpen: boolean) {
  if (!isOpen) {
    editBirthday.value = false
  }
}

async function commentDialogAction(confirm: boolean, data?: string) {
  if (confirm && data) {
    const twit = {
      content: data,
      author: '/api/users/' + userStore.userProfil?.id,
      status: Twit.status.PUBLISHED,
      parent: addEditTwit.value?.id,
      likes: [],
      rePost: [],
    }
    const result = await twitStore.createTwit(twit as unknown as Twit)

    if (result) {
      toast.success(t('view.homeView.twit.post.success'))
      let currentTwit = myTwits.value.find(p => p.id === addEditTwit.value?.id)
      if (currentTwit) {
        currentTwit.nbComments = (currentTwit.nbComments ?? 0) + 1
      }
    } else {
      toast.error(t('view.homeView.twit.post.error'))
    }
  }
  commentTwitDialog.value = false
}

const saveEdit = async () => {
  // Verify attributes before sending the request
  if (
    userProfilUpdated.value.username.length === 0 ||
    userProfilUpdated.value.biography.length === 0 ||
    userProfilUpdated.value.birthday.length === 0
  ) {
    toast.error(t('view.profilPage.fillAllFields') as string)
    return
  }

  // Send request to update user profile
  const parsedDate = dayjs(userProfilUpdated.value.birthday, 'D MMMM YYYY', 'fr', true)
  const userProfil = {
    ...userStore.userProfil,
    birthdate: parsedDate.format('YYYY-MM-DD'),
    biography: userProfilUpdated.value.biography,
    username: userProfilUpdated.value.username,
  }

  // Close the dialog
  dialog.value = false
  dialogMobile.value = false

  // Call API to update user profile
  const res = await userStore.updateUserProfil(userProfil)

  if (res.success) {
    toast.success(t('view.profilPage.editProfilSuccess') as string)
    // Call the API to fetch the updated user profile
    selectedUserProfil.value = await userStore.fetchUserProfil(userProfil.username)
  } else {
    toast.error(t('view.profilPage.editProfilError') as string)
  }
}

const birthdayInput = computed({
  get: () => {
    const parsed = dayjs(userProfilUpdated.value.birthday, 'DD/MM/YYYY', true)
    return parsed.isValid() ? parsed.format('YYYY-MM-DD') : ''
  },
  set: (val: string) => {
    const parsed = dayjs(val, 'YYYY-MM-DD', true)
    userProfilUpdated.value.birthday = parsed.isValid() ? parsed.format('DD/MM/YYYY') : ''
  },
})

const userProfilLoading = computed(() => {
  return userStore.loading
})

const userProfil = computed(() => {
  if (selectedUserProfil.value === null) return null
  return {
    image: selectedUserProfil.value?.profileImgPath ?? '',
    nbPosts: selectedUserProfil.value?.twits?.length ?? 0,
    nbFollowers: selectedUserProfil.value?.followers?.length ?? 0,
    nbFollowings: selectedUserProfil.value?.followings?.length ?? 0,
    birthday: selectedUserProfil.value?.birthdate
      ? dayjs(selectedUserProfil.value?.birthdate).format('D MMMM YYYY')
      : 'Pas de date définie',
    userIdentifier: selectedUserProfil.value?.username
      ? `@${selectedUserProfil.value?.username}`
      : '',
    biography: selectedUserProfil.value?.biography ?? '',
    username: selectedUserProfil.value?.username ?? '',
    email: selectedUserProfil.value?.email ?? '',
  }
})

onMounted(async () => {
  // Get username from route
  let username = route.params.username as string
  if (!username && username.length === 0 && username[0] !== '@') {
    profilNotFound.value = true
    return
  }
  username = username.substring(1)

  // Load user profil
  selectedUserProfil.value = await userStore.fetchUserProfil(username)
  if (!selectedUserProfil.value) {
    profilNotFound.value = true
    return
  }

  await userStore.fetchUserTwits(selectedUserProfil.value)
})

const myTwits = computed(() => {
  if (userStore.loading) return []
  return userStore.userTwits
})

onUnmounted(() => {
  selectedUserProfil.value = null
})

watch(
  () => twitText.value,
  () => {
    twitLenght.value = twitText.value.length
    twitPourcentage.value = (twitLenght.value / twitLimit) * 100
  },
  { immediate: true }
)
watch(
  () => userProfil.value,
  async () => {
    if (userProfil.value !== null) {
      userProfilUpdated.value = {
        birthday: userProfil.value.birthday,
        biography: userProfil.value.biography,
        username: userProfil.value.username,
      }
    }
  },
  { immediate: true }
)

const likeTwit = async (id: number) => {
  const twit: Twit_TwitDTO | undefined = myTwits.value.find(p => p.id === id)
  if (twit) {
    await likeStore.switchLike(id)
    twit.isLikedByUser = !twit.isLikedByUser
    if (twit.isLikedByUser) {
      twit.nbLikes = (twit.nbLikes ?? 0) + 1
    } else {
      twit.nbLikes = (twit.nbLikes ?? 0) - 1
    }
  }
}

const onClickRePost = async (id: number) => {
  const twit: Twit_TwitDTO | undefined = myTwits.value.find(p => p.id === idTwitToDo.value)
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
  const twit: Twit_TwitDTO | undefined = myTwits.value.find(p => p.id === id)
  if (twit) {
    const result = await twitStore.deleteTwit(id)
    if (result) {
      toast.success(t('view.homeView.twit.delete.success'))
      if (isForYouView.value) {
        userStore.userTwits = userStore.userTwits.filter(p => p.id !== id)
      } else {
        userStore.userTwits = userStore.userTwits.filter(p => p.id !== id)
      }
    } else {
      toast.error(t('view.homeView.twit.delete.error'))
    }
  }
}

const onClickEditTwit = (id: number) => {
  addEditTwit.value = myTwits.value.find(p => p.id === id)
  if (addEditTwit.value) {
    idTwitToDo.value = addEditTwit.value.id ?? 0
    isEditingTwit.value = true
    addEditTwitDialog.value = true
  }
}

function openCommentDialog(data: Twit_TwitDTO) {
  addEditTwit.value = myTwits.value.find(p => p.id === data.id)
  commentTwitDialog.value = true
}

function openTwit(id: number) {
  router.push({ name: PageNameEnum.TWIT, params: { idTwit: id } })
}
</script>

<style scoped>
.avatar-absolute {
  bottom: 23%;
  left: 80px;
  transform: translate(-50%, 0%);
  height: 130px;
  width: 130px;
  border: 3px solid #000;
}

.avatar-absolute-edit {
  bottom: 20%;
  left: 85px;
  transform: translate(-50%, 0%);
  height: 120px;
  width: 120px;
  border: 3px solid #000;
}

.smoke-screen {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

@media screen and (max-width: 600px) {
  .avatar-absolute {
    left: 60px;
    height: 100px;
    width: 100px;
  }
}
</style>
