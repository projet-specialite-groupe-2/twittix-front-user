<template>
  <v-sheet class="d-flex flex-column h-screen" flat>
    <v-col class="position-sticky top-0" style="z-index: 1">
      <v-row
        class="d-flex justify-start w-100 px-4 pt-8 pb-4 ga-2"
        style="backdrop-filter: blur(10px)"
      >
        <v-btn
          class="bg-transparent"
          density="comfortable"
          icon="mdi-arrow-left"
          size="small"
          @click="navigateBack"
        ></v-btn>
        <h3>Infos de la conversation</h3>
      </v-row>
      <v-row class="d-flex justify-start mx-4 my-2">
        <v-avatar size="40">
          <v-img
            style="object-fit: cover; width: 100%; height: 100%"
            src="https://pbs.twimg.com/profile_images/1888167261417897984/IZYKCEJg_400x400.jpg"
          ></v-img>
        </v-avatar>
      </v-row>
      <v-divider></v-divider>
      <v-col class="justify-start mx-2 my-2">
        <v-row>
          <h2>Notifications</h2>
        </v-row>
        <v-row class="d-flex flex-row align-center justify-space-between">
          <span class="text-subtitle-1">Recevoir les notifications</span>
          <v-switch color="blue" class="d-flex justify-end" />
        </v-row>
      </v-col>
      <v-divider></v-divider>
      <v-col>
        <v-row class="d-flex align-center justify-center">
          <v-btn class="bg-transparent w-100" icon="mdi-trash-can">
            <span class="text-subtitle-1 text-blue">Bloquer les MP</span>
          </v-btn>
        </v-row>
        <v-row class="d-flex align-center justify-center">
          <v-btn class="bg-transparent w-100" icon="mdi-trash-can">
            <span class="text-subtitle-1 text-blue">Tout bloquer</span>
          </v-btn>
        </v-row>
        <v-row class="d-flex align-center justify-center">
          <v-btn class="bg-transparent w-100" icon="mdi-trash-can">
            <span class="text-subtitle-1 text-blue">Signaler</span>
          </v-btn>
        </v-row>
        <v-row class="d-flex align-center justify-center">
          <v-btn class="bg-transparent w-100" icon="mdi-trash-can">
            <span class="text-subtitle-1 text-blue"
              >Signaler la conversion comme du contenu illégal dans l'UE
            </span>
          </v-btn>
        </v-row>
        <v-row class="d-flex align-center justify-center">
          <v-btn class="bg-transparent w-100" icon="mdi-trash-can">
            <span class="text-subtitle-1 text-red">Quitter la conversation</span>
          </v-btn>
        </v-row>
      </v-col>
    </v-col>
  </v-sheet>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateBack = () => {
  router.back()
}
</script>
