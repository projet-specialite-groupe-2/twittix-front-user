<template>
  <v-dialog v-model="isActive">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        class="bg-transparent"
        density="comfortable"
        icon="mdi-email-plus-outline"
        :size="iconSize"
      ></v-btn>
    </template>

    <v-card class="bg-black px-4">
      <v-card-actions class="px-2 py-4">
        <v-col class="pa-0">
          <v-row>
            <v-col cols="2" class="d-flex align-center justify-start pa-0">
              <v-btn icon="mdi-close" :size="iconSize" @click="isActive = false"> </v-btn>
            </v-col>
            <v-col cols="8" class="d-flex align-center justify-start pa-0">
              <h2 class="text-h6 font-weight-bold w-100">
                {{ $t('view.messagesPage.newMessage') }}
              </h2>
            </v-col>
            <v-col cols="2" class="d-flex align-center justify-end pa-0">
              <v-btn class="bg-white px-6">
                {{ $t('view.messagesPage.next') }}
              </v-btn>
            </v-col>
          </v-row>

          <v-row class="px-2">
            <v-text-field
              :placeholder="$t('view.messagesPage.searchPeople')"
              bg-color="transparent"
              variant="solo"
              hide-details
              @focus="onFocus"
              @blur="onBlur"
            >
              <template v-slot:prepend-inner>
                <v-icon :color="isFocused ? 'blue' : ''">mdi-magnify</v-icon>
              </template>
            </v-text-field>
          </v-row>
          <v-row>
            <v-divider></v-divider>
          </v-row>
        </v-col>
      </v-card-actions>

      <v-col>
        <v-hover v-slot="{ isHovering, props }">
          <v-row
            v-bind="props"
            class="d-flex align-center cursor-pointer px-2 py-2"
            :style="{ backgroundColor: isHovering ? '#1c1c1c' : '' }"
          >
            <v-col cols="1" class="justify-center align-center pa-0">
              <v-avatar
                class="bg-transparent"
                style="border: 1px solid rgb(29, 155, 240); border-radius: 50%"
              >
                <v-icon color="blue" icon="mdi-account-group" size="small"></v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="11" class="align-start justify-start">
              <v-row class="d-flex align-center ga-2 w-100">
                <span class="text-subtitle-2 font-weight-bold text-blue">
                  {{ $t('view.messagesPage.createGroup') }}
                </span>
              </v-row>
            </v-col>
          </v-row>
        </v-hover>

        <v-row>
          <v-divider></v-divider>
        </v-row>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

// Définition des props
defineProps({
  iconSize: {
    type: String,
    default: 'small', // Valeur par défaut : 'small', mais peut être 'large', 'x-large', etc.
  },
})

const isActive = ref(false)
const isFocused = ref(false)

const onFocus = () => (isFocused.value = true)
const onBlur = () => (isFocused.value = false)
</script>
