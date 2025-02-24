<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import router from '@/router'

const { t } = useI18n()
const props = defineProps<{ footerMode: boolean }>()

const userId = "@RealEl_Floww"
const username = "Florent"
const userPictureURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Maupassant_par_Nadar.jpg/440px-Maupassant_par_Nadar.jpg"

const dropdownUserItems = [
        { title: `${t('components.navigationForm.disconnectFrom')} ${userId}`, click: disconnectUser},
      ]

function goToHome() {
  console.log("home")
  router.push('/')
}

function goToExplore() {
  console.log("explore")
  router.push('/explore')
  // TODO
}

function goToMessages() {
  console.log("messages")
  router.push('/messages')
  // TODO
}

function goToProfil() {
  console.log("profil")
  const username = userId.replace('@', '');
  router.push(`${username}`)
  // TODO
}

function createPost() {
  console.log("post")
  // TODO
}

function disconnectUser(){
  console.log("disconnect user")
  // TODO

}
</script>

<template>
  <!-- Sidebar navigation -->
    <v-navigation-drawer
    v-if="!props.footerMode"
      class="bg-black pa-4 position-sticky h-screen w-100"
      permanent
    >
    <div >
      <v-list color="transparent">
        <v-list-item rounded="xl" :ripple="false">
          <v-img class="user-select-none" :max-width="50" aspect-ratio="16/9" cover src="/src/assets/images/logo.png"></v-img>
        </v-list-item>
        <v-list-item class="mr-10 my-2 user-select-none" rounded="xl" link prepend-icon="mdi-home" :title="$t('components.navigationForm.home')" :ripple="false" v-on:click="goToHome"></v-list-item>
        <v-list-item class="mr-10 mY-2 user-select-none" rounded="xl" link prepend-icon="mdi-magnify" :title="$t('components.navigationForm.explore')" :ripple="false" v-on:click="goToExplore"></v-list-item>
        <v-list-item class="mr-10 my-2 user-select-none" rounded="xl" link prepend-icon="mdi-email" :title="$t('components.navigationForm.message')" :ripple="false" v-on:click="goToMessages"></v-list-item>
        <v-list-item class="mr-10 my-2 user-select-none" rounded="xl" link prepend-icon="mdi-account" :title="$t('components.navigationForm.profile')"  :ripple="false" v-on:click="goToProfil"></v-list-item>
        <v-btn size="large" class="bg-white w-100 my-2" v-on:click="createPost">
          <!-- TODO -->
          {{ $t('components.navigationForm.post') }}
        </v-btn>
      </v-list>
    </div>

      <template v-slot:append>
          <v-menu location="top center">
            <template v-slot:activator="{ props }">
              <v-list-item class="w-100 my-2 mb-5 user-select-none" rounded="xl" link prepend-icon="mdi-home" title="Accueil" :ripple="false" v-bind="props">
              <template v-slot:subtitle>
                <p>{{ userId }}</p>
              </template>
              <template v-slot:title>
                <p>{{ username }}</p>
              </template>
              <template v-slot:prepend>
                <v-avatar :image="userPictureURL" size="45"></v-avatar>
              </template>
              <template v-slot:append>
                <v-icon icon="mdi-dots-horizontal"></v-icon>
              </template>
              </v-list-item>
            </template>
          
            <v-list class="mb-5 bg-black rounded-xl border-white border-md" :border="true">
              <v-list-item
                v-for="(item, index) in dropdownUserItems"
                :key="index"
              >
                <v-list-item-title v-on:click="item.click"
                  class="user-select-none">{{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
      </template>
    </v-navigation-drawer>

  <!-- Footer navigation -->
  <v-footer v-else app class="bg-black text-white d-flex justify-center">
    <v-container class="d-flex justify-center">
      <v-row no-gutters class="w-75 justify-space-evenly">
        <v-col cols="auto" class="d-flex justify-center">
          <v-icon size="32" icon="mdi-home" v-on:click="goToHome"></v-icon>
        </v-col>
        <v-col cols="auto" class="d-flex justify-center">
          <v-icon size="32" icon="mdi-magnify" v-on:click="goToExplore"></v-icon>
        </v-col>
        <v-col cols="auto" class="d-flex justify-center">
          <v-icon size="32" icon="mdi-email" v-on:click="goToMessages"></v-icon>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>