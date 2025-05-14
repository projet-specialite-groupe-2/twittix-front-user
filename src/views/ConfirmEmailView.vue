<template>
  <v-container fluid class="pa-0" style="height: 100vh !important">
    <div v-if="loginStore.loading" class="text-center mt-8">
      <v-icon size="64" color="white" class="mb-4">mdi-account</v-icon>
      <div class="text-white font-weight-bold text-h5">
        {{ $t('view.confirmEmail.confirmEmailWait') }}
      </div>
      <div class="text-grey text-subtitle-1 my-2">
        {{ $t('view.confirmEmail.emailConfirmMessageWait') }}
      </div>
      <div class="d-flex justify-center align-center">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>
    </div>

    <div v-else-if="!loginStore.loading && isConfirmed" class="text-center mt-8">
      <v-icon size="64" color="green" class="mb-4">mdi-account-check</v-icon>
      <div class="text-green font-weight-bold text-h5">
        {{ $t('view.confirmEmail.confirmEmail') }}
      </div>
      <div class="text-grey text-subtitle-1 mt-2">
        {{ $t('view.confirmEmail.emailConfirmMessage') }}
      </div>
      <v-btn size="large" class="bg-white mt-6 px-16" @click="$router.push({ name: 'Main' })">
        {{ $t('view.confirmEmail.goToLogin') }}
      </v-btn>
    </div>

    <div v-else-if="!loginStore.loading && !isConfirmed" class="text-center mt-8">
      <v-icon size="64" color="red" class="mb-4">mdi-account-off</v-icon>
      <div class="text-red font-weight-bold text-h5">
        {{ $t('view.confirmEmail.confirmEmailError') }}
      </div>
      <div class="text-grey text-subtitle-1 mt-2">
        {{ $t('view.confirmEmail.emailConfirmMessageError') }}
      </div>
      <v-btn size="large" class="bg-white mt-6 px-16" @click="$router.push({ name: 'Main' })">
        {{ $t('view.confirmEmail.goToLoginPage') }}
      </v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLoginStore } from '@/stores/loginStore'

const route = useRoute()
const loginStore = useLoginStore()
const isConfirmed: Ref<boolean> = ref(false)

onMounted(async () => {
  const token = route.query.token as string
  const email = route.query.email as string

  if (!token || !email) {
    isConfirmed.value = false
    return
  }

  isConfirmed.value = await loginStore.verifyEmail(token, email)
})
</script>
