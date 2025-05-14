<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  userPictureUrl: string
}>()

const emit = defineEmits<{
  (eventName: 'submit:form', dialog: boolean, data?: string): void
}>()

const twitLimit = 280
const twitLenght = ref<number>(0)
const twitPourcentage = ref<number>(0)
const twitText = ref<string>('')

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
</script>

<template>
  <v-container>
    <v-textarea
      class="mx-2"
      :label="$t('view.homeView.WhatsNew')"
      variant="plain"
      auto-grow
      rows="2"
      v-model="twitText"
      :maxlength="twitLimit"
    >
      <template v-slot:prepend>
        <v-avatar size="40">
          <v-img :src="props.userPictureUrl" alt="Avatar" />
        </v-avatar>
      </template>
    </v-textarea>
    <v-row justify="end">
      <v-divider class="pa-1 border-opacity-25"></v-divider>
      <div class="h-100">
        <v-progress-circular
          v-if="twitLenght > 0"
          :model-value="twitPourcentage"
          :size="35"
          width="5"
          :color="progressCircularColor()"
        >
          <template v-slot:default v-if="twitPourcentage >= 80">
            {{ twitLimit - twitLenght }}
          </template>
        </v-progress-circular>
        <v-divider vertical class="ml-5 h-50 border-opacity-25"></v-divider>
        <v-btn class="bg-white ml-5" v-on:click="emit('submit:form', true, twitText)">
          {{ $t('components.navigationForm.post') }}
        </v-btn>
      </div>
    </v-row>
  </v-container>
</template>
