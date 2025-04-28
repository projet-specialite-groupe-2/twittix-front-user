<template>
  <v-container fluid class="pa-0" style="height: 100vh !important; overflow-y: scroll">
    <template v-if="userProfil !== null">
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
                  {{ $t('view.profilPage.posts') }}
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
            src="https://picsum.photos/1920/1080"
            max-height="200px"
            height="100%"
          ></v-img>

          <v-avatar
            v-if="!userProfilLoading"
            class="avatar-absolute ms-4"
            image="https://picsum.photos/200"
          ></v-avatar>

          <div class="d-flex flex-column">
            <div class="d-none d-sm-flex">
              <v-dialog v-model="dialog" @update:model-value="handleDialogClose">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    v-if="!userProfilLoading"
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
                          src="https://picsum.photos/1920/1080"
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
                          <v-img src="https://picsum.photos/200"></v-img>
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
                          :label="$t('view.loginPage.name')"
                          v-model="userProfilUpdated.username"
                        >
                        </v-text-field>

                        <v-text-field
                          class="pb-4"
                          :label="$t('view.loginPage.bio')"
                          v-model="userProfilUpdated.biography"
                        >
                        </v-text-field>

                        <div>
                          <span class="opacity-50 text-subtitle-2"
                            >{{ $t('view.loginPage.dateDeNaissance') }} •
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
                          src="https://picsum.photos/1920/1080"
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
                          <v-img src="https://picsum.photos/200"></v-img>
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
                          :label="$t('view.loginPage.name')"
                          v-model="userProfilUpdated.username"
                        >
                        </v-text-field>

                        <v-text-field
                          class="pb-4"
                          :label="$t('view.loginPage.bio')"
                          v-model="userProfilUpdated.biography"
                        >
                        </v-text-field>

                        <div>
                          <span class="opacity-50 text-subtitle-2"
                            >{{ $t('view.loginPage.dateDeNaissance') }} •
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
          </div>
        </v-col>
      </v-row>

      <div class="mt-5 px-5">
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

      <v-infinite-scroll :items="items" @load="load">
        <template v-for="item in items" :key="item">
          <TwitComponent
            :twit-id="item.id ?? 0"
            :twit-content="item.content ?? ''"
            :twit-date="item.createdAt ?? ''"
            :user-id="item.author?.userIdentifier ?? ''"
            :username="item.author?.username ?? ''"
            :user-picture-url="item.author?.profileImgPath ?? ''"
            :twit-like-number="'976'"
            :twit-message-number="'9786'"
            :twit-re-twit-number="'876'"
            :is-liked="item.isLiked ?? false"
            :id-re-twit="item.isRetwit ?? false"
            v-on:like="likeTwit"
            v-on:retwit="reTwit"
            v-on:comment="openCommentDialog(item)"
          />
        </template>
      </v-infinite-scroll>

      <AddComment
        v-if="commentTwitDialog"
        :twit-id="addEditTwit?.id ?? 0"
        :twit-content="addEditTwit?.content ?? ''"
        :twit-date="addEditTwit?.createdAt ?? ''"
        :user-id="addEditTwit?.author?.userIdentifier ?? ''"
        :username="addEditTwit?.author?.username ?? ''"
        :user-picture-url="addEditTwit?.author?.profileImgPath ?? ''"
        :open="commentTwitDialog"
        v-on:submit:form="commentDialogAction"
      />
      <v-overlay v-model="commentTwitDialog" persistent />
    </template>
    <div v-else class="text-center mt-8">
      <v-icon size="64" color="red" class="mb-4">mdi-account-off</v-icon>
      <div class="text-red font-weight-bold text-h5">{{ $t('view.profilPage.userNotFound') }}</div>
      <div class="text-grey text-subtitle-1 mt-2">
        {{ $t('view.profilPage.profileNotFound') }}
      </div>
      <v-btn size="large" class="bg-white mt-6 px-16" @click="$router.push({ name: 'Main' })">
        {{ $t('view.profilPage.backToMain') }}
      </v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import AddComment from '@/components/twit/addCommentComponent.vue'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import 'dayjs/locale/en-gb'
import { ref, watch, onMounted, type Ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import TwitComponent from '@/components/twit/twitComponent.vue'
import { Twit, type User } from '@/core/api'
import { useUserStore } from '@/stores/userStore'
import { useI18n } from 'vue-i18n'
import { getCurrentInstance } from 'vue'

const { locale } = useI18n()
dayjs.locale(locale.value)

const { proxy } = getCurrentInstance()
const userStore = useUserStore()
const route = useRoute()
const isForYouView = ref<boolean>(true)
const twitLimit = 280
const twitLenght = ref<number>(0)
const twitPourcentage = ref<number>(0)
const twitText = ref<string>('')
const twitId = ref<number>(1)
const profilNotFound = ref<boolean>(false)

const items: Ref<Array<Twit>> = ref([])

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

function incrementId(): number {
  twitId.value = twitId.value + 1
  return twitId.value
}

function likeTwit(id: number) {
  const twit = items.value.find(p => p.id === id)
  if (twit) {
    twit.isLiked = !twit.isLiked
  }
}

function reTwit(id: number) {
  const twit = items.value.find(p => p.id === id)
  if (twit) {
    twit.isRetwit = !twit.isRetwit
  }
}

function handleDialogClose(isOpen: boolean) {
  if (!isOpen) {
    editBirthday.value = false
  }
}

async function load({ done }) {
  // Perform API call
  for (let i = 0; i < 30; i++) {
    const res = await api()
    items.value.push(res)
  }

  done('ok')
}

function commentDialogAction(confirm: boolean, data?: unknown) {
  if (confirm && data) {
    // Todo with APIs
  }
  commentTwitDialog.value = false
}

function openCommentDialog(data: Twit) {
  addEditTwit.value = items.value.find(p => p.id === data.id)
  commentTwitDialog.value = true
}

async function api(): Promise<Twit> {
  return {
    id: incrementId(),
    content:
      '⚽🔥 *Inazuma Eleven* : Le rêve de tous les fans de foot ⚡! Des matchs de folie, des techniques super puissantes 💥 et des personnages inoubliables 👕! \n\nLa Team Raimon 🏆 et ses héros comme Mark Evans 🧢, Axel Blaze 🔥 et la légende de la Tornado 🔄 qui nous font vibrer à chaque épisode! 😍⚡\n\nQui est votre joueur préféré? 🤔🎮 \n#InazumaEleven #Football #Anime #GénérationTornade',
    author: {
      id: 123,
      createdAt: '2024-03-01T12:00:00+00:00',
      updatedAt: '2024-03-05T14:30:00+00:00',
      deletedAt: null,
      email: 'johndoe@example.com',
      roles: ['USER'],
      password: '',
      username: 'johndoe',
      biography: 'Passionate about technology and coding.',
      birthdate: '1995-06-15',
      profileImgPath:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Maupassant_par_Nadar.jpg/440px-Maupassant_par_Nadar.jpg',
      private: false,
      active: true,
      banned: false,
      twits: [],
      conversations: [],
      messages: [],
      userIdentifier: '@johndoe123',
    } as User,
    status: Twit.status.PUBLISHED,
    parent: null,
    createdAt: '2025-03-07T08:54:25+00:00',
  }
}

const saveEdit = async () => {
  // Vérification de chaque champ modifié avant l'envoi
  if (
    userProfilUpdated.value.username.length === 0 ||
    userProfilUpdated.value.biography.length === 0 ||
    userProfilUpdated.value.birthday.length === 0
  ) {
    proxy.$toast.error(proxy.$t('view.profilPage.fillAllFields') as string)
    return
  }

  // Envoi de la requête d'update
  const userProfil = {
    ...userStore.userProfil,
    birthdate: dayjs(userProfilUpdated.value.birthday).format('YYYY-MM-DD'),
    biography: userProfilUpdated.value.biography,
    username: userProfilUpdated.value.username,
  }

  // Fermeture des modales
  dialog.value = false
  dialogMobile.value = false

  // Appel de la méthode d'update du store
  const res = await userStore.updateUserProfil(userProfil)

  if (res.success) {
    proxy.$toast.success(proxy.$t('view.profilPage.editProfilSuccess') as string)
  } else {
    proxy.$toast.error(proxy.$t('view.profilPage.editProfilError') as string)
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
  if (userStore.loading || !userStore.userProfil) {
    return null
  }
  return {
    nbPosts: userStore.userProfil?.twits?.length ?? 0,
    nbFollowers: userStore.userProfil?.followers?.length ?? 0,
    nbFollowings: userStore.userProfil?.followings?.length ?? 0,
    birthday: userStore.userProfil?.birthdate
      ? dayjs(userStore.userProfil?.birthdate).format('D MMMM YYYY')
      : 'Pas de date définie',
    userIdentifier: userStore.userProfil?.username ? `@${userStore.userProfil?.username}` : '',
    biography: userStore.userProfil?.biography ?? '',
    username: userStore.userProfil?.username ?? '',
  }
})

onMounted(() => {
  // Récup du username de la route
  let username = route.params.username as string
  if (!username && username.length === 0 && username[0] !== '@') {
    profilNotFound.value = true
    return
  }
  username = username.substring(1)
  // Chargement du profil du user
  userStore.fetchUserProfil(username)
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
  () => {
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
