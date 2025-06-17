<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageNameEnum from '@/core/types/enums/pageNameEnum'
import AddTwitPopupComponent from '../twit/addTwitPopupComponent.vue'
import { onMounted, ref, watch, type Ref } from 'vue'
import { useLoginStore } from '@/stores/loginStore'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { Twit, type Twit_TwitDTO } from '@/core/api'
import { useTwitStore } from '@/stores/twitStore'
import { toast } from 'vue3-toastify'

const router = useRouter()
const { t } = useI18n()
const loginStore = useLoginStore()
const userStore = useUserStore()
const twitStore = useTwitStore()

const props = defineProps<{ footerMode: boolean }>()
const addTwitDialog = ref<boolean>()

const dropdownUserItems: Ref<Array<{ title: string; click: () => void }>> = ref([])

onMounted(() => {
  dropdownUserItems.value = [
    {
      title: `${t('components.navigationForm.disconnect')}`,
      click: disconnectUser,
    },
  ]
})

watch(
  () => userStore.userProfil,
  newValue => {
    if (newValue && newValue.username)
      dropdownUserItems.value[0].title = `${t('components.navigationForm.disconnectFrom')} @${newValue.username}`
  }
)

function goToHome() {
  router.push('/')
}

function goToExplore() {
  router.push('/explore/tabs/for_you')
}

function goToMessages() {
  router.push('/messages')
}

function goToProfil() {
  router.push({ name: PageNameEnum.PROFIL, params: { username: '@' + userStore.getUsername } })
}

function createPost() {
  addTwitDialog.value = true
}

function disconnectUser() {
  loginStore.logout()
}

const addTwitDialogAction = async (confirm: boolean, data?: unknown) => {
  if (confirm && data) {
    const twit = {
      content: data,
      author: "/api/users/" + userStore.userProfil?.id,
      status: Twit.status.PUBLISHED,
      likes: [],
      rePost: []
    }
    const result = await twitStore.createTwit(twit as unknown as Twit)

    if (result) {
      toast.success(t('view.homeView.twit.post.success'))
      twitStore.twitsForYou.unshift(result as unknown as Twit_TwitDTO)
    } else {
      toast.error(t('view.homeView.twit.post.error'))
    }
  }
  addTwitDialog.value = false
}
</script>

<template>
  <!-- Sidebar navigation -->
  <div v-if="!props.footerMode" class="d-flex justify-end">
    <v-navigation-drawer class="bg-black pa-4 position-sticky h-screen w-75" permanent>
      <div>
        <v-list color="transparent">
          <v-list-item
            class="mr-10 my-3 user-select-none w-25"
            rounded="xl"
            link
            :ripple="false"
            v-on:click="goToHome"
            id="btnHomeLogo"
          >
            <template v-slot:prepend>
              <v-avatar size="30">
                <v-img
                  class="user-select-none"
                  aspect-ratio="16/9"
                  cover
                  src="/src/assets/images/logo.png"
                ></v-img>
              </v-avatar>
            </template>
          </v-list-item>
          <v-list-item
            class="mr-10 my-3 user-select-none"
            rounded="xl"
            link
            :ripple="false"
            id="btnHome"
            v-on:click="goToHome"
          >
            <template v-slot:prepend>
              <v-icon size="30" color="white">mdi-home</v-icon>
            </template>
            <v-list-item-title>{{ $t('components.navigationForm.home') }}</v-list-item-title>
          </v-list-item>
          <v-list-item
            class="mr-10 my-3 user-select-none"
            rounded="xl"
            link
            :ripple="false"
            id="btnExplore"
            v-on:click="goToExplore"
          >
            <template v-slot:prepend>
              <v-icon size="30" color="white">mdi-magnify</v-icon>
            </template>
            <v-list-item-title>{{ $t('components.navigationForm.explore') }}</v-list-item-title>
          </v-list-item>

          <v-list-item
            class="mr-10 my-3 user-select-none"
            rounded="xl"
            link
            :ripple="false"
            id="btnMessages"
            v-on:click="goToMessages"
          >
            <template v-slot:prepend>
              <v-icon size="large" color="white">mdi-email</v-icon>
            </template>
            <v-list-item-title>{{ $t('components.navigationForm.message') }}</v-list-item-title>
          </v-list-item>

          <v-list-item
            id="list-item-profile"
            class="mr-10 my-3 user-select-none"
            rounded="xl"
            link
            :ripple="false"
            v-on:click="goToProfil"
          >
            <template v-slot:prepend>
              <v-icon size="30" color="white">mdi-account</v-icon>
            </template>
            <v-list-item-title>{{ $t('components.navigationForm.profile') }}</v-list-item-title>
          </v-list-item>

          <v-btn
            size="large"
            id="btnCreatePost"
            class="bg-white my-2 px-16 w-75"
            v-on:click="createPost"
          >
            {{ $t('components.navigationForm.post') }}
          </v-btn>
        </v-list>
      </div>

      <template v-slot:append>
        <v-menu location="top center">
          <template v-slot:activator="{ props }">
            <v-list-item
              id="listItemUserManagement"
              class="my-2 mb-5 user-select-none"
              rounded="xl"
              link
              prepend-icon="mdi-home"
              title="Accueil"
              :ripple="false"
              v-bind="props"
            >
              <template v-slot:subtitle>
                <p>@{{ userStore.userProfil?.username }}</p>
              </template>
              <template v-slot:title>
                <p>{{ userStore.userProfil?.username }}</p>
              </template>
              <template v-slot:prepend>
                <v-avatar :image="userStore.userProfil?.profileImgPath" size="45"></v-avatar>
              </template>
              <template v-slot:append>
                <v-icon icon="mdi-dots-horizontal"></v-icon>
              </template>
            </v-list-item>
          </template>

          <v-list class="mb-5 bg-black rounded-xl border-white border-md" :border="true">
            <v-list-item v-for="(item, index) in dropdownUserItems" :key="index">
              <v-list-item-title
                id="itemDisconnectUser"
                v-on:click="item.click"
                class="user-select-none hoverable"
              >
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-navigation-drawer>
  </div>

  <!-- Footer navigation -->
  <v-footer v-else app class="bg-black text-white d-flex justify-center">
    <v-container class="d-flex justify-center">
      <v-row no-gutters class="w-75 justify-space-evenly">
        <v-col cols="auto" class="d-flex justify-center">
          <v-icon size="32" icon="mdi-home" v-on:click="goToHome" id="btnHomeMobile"></v-icon>
        </v-col>
        <v-col cols="auto" class="d-flex justify-center">
          <v-icon
            size="32"
            icon="mdi-magnify"
            v-on:click="goToExplore"
            id="btnExploreMobile"
          ></v-icon>
        </v-col>
        <v-col cols="auto" class="d-flex justify-center">
          <v-icon
            size="32"
            icon="mdi-email"
            v-on:click="goToMessages"
            id="btnMessagesMobile"
          ></v-icon>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>

  <v-overlay v-model="addTwitDialog" persistent />
  <AddTwitPopupComponent
    v-if="addTwitDialog"
    :user-picture-url="userStore.userProfil?.profileImgPath ?? ''"
    :content="''"
    :title="$t('components.navigationForm.addTwitTitle')"
    :open="addTwitDialog"
    v-on:submit:form="addTwitDialogAction"
  ></AddTwitPopupComponent>
</template>
