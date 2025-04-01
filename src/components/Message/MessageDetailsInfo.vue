<template>
  <v-sheet class="d-flex flex-column h-screen" flat>
    <v-col class="position-sticky top-0" style="z-index: 1">
      <v-row class="d-flex justify-start w-100 px-4 pt-8 pb-2" style="backdrop-filter: blur(10px)">
        <v-row class="d-flex align-center ga-4">
          <v-sheet
            class="bg-transparent"
            style="border-radius: 50%; border: 1px solid rgb(47, 51, 54)"
          >
            <v-btn
              class="bg-transparent"
              density="comfortable"
              icon="mdi-arrow-left"
              size="small"
              @click="navigateBack"
            ></v-btn>
          </v-sheet>
          <h3>ZywOo</h3>
        </v-row>
      </v-row>
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
