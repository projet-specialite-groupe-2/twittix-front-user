<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="5" class="d-none d-sm-flex justify-center align-center">
        <v-img :max-width="300" aspect-ratio="16/9" cover src="/logo.png"></v-img>
      </v-col>

      <v-col cols="12" class="d-flex d-sm-none" justify="start">
        <v-img :max-width="100" aspect-ratio="16/9" cover src="/logo.png"></v-img>
      </v-col>

      <v-col cols="12" sm="7">
        <h1 class="text-lg-h1 text-md-h2 text-h3 font-weight-bold mb-15">
          {{ $t('view.loginPage.title') }}
        </h1>
        <h2 class="text-lg-h3 text-md-h4 text-h6 font-weight-bold mb-8">
          {{ $t('view.loginPage.inscription') }}.
        </h2>

        <!-- FORMULAIRE DE CREATION DE COMPTE -->
        <div class="d-flex flex-column mb-14" style="max-width: 330px">
          <div class="d-none d-sm-flex">
            <v-dialog v-model="dialogRegisterModelValue" @update:model-value="handleDialogClose">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  id="register-button"
                  v-bind="activatorProps"
                  size="large"
                  class="bg-red w-100 mb-2"
                >
                  {{ $t('view.loginPage.createAccount') }}
                </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card class="bg-black">
                  <v-card-actions>
                    <v-row>
                      <v-col class="d-flex align-center justify-start">
                        <v-btn
                          v-if="registerStep === 1"
                          icon="mdi-close"
                          size="large"
                          @click="isActive.value = false"
                        >
                        </v-btn>
                        <v-btn
                          v-else
                          icon="mdi-arrow-left"
                          size="large"
                          @click="registerStep = 1"
                        ></v-btn>
                      </v-col>
                      <v-col class="d-flex align-center justify-center">
                        <v-img :max-width="50" aspect-ratio="16/9" cover src="/logo.png"></v-img
                      ></v-col>
                      <v-col> </v-col>
                    </v-row>
                  </v-card-actions>

                  <v-form
                    class="d-flex flex-column fill-height"
                    style="height: 550px !important"
                    @submit.prevent="register"
                  >
                    <div
                      v-if="loginStore.loading"
                      class="fill-height d-flex justify-center align-center"
                    >
                      <v-progress-circular indeterminate></v-progress-circular>
                    </div>

                    <template v-else>
                      <div v-if="registerStep === 1" class="px-12 py-4">
                        <v-card-title class="text-h4 font-weight-bold px-0 pt-0">
                          {{ $t('view.loginPage.createYourAccount') }}
                        </v-card-title>

                        <div class="pb-4">
                          <v-text-field
                            id="register-username-field"
                            v-model="registerData.username"
                            class="pb-0"
                            :label="$t('view.loginPage.username')"
                            :rules="[required, username]"
                          ></v-text-field>

                          <v-text-field
                            id="register-email-field"
                            v-model="registerData.email"
                            type="email"
                            label="Email"
                            :rules="[required, email]"
                          ></v-text-field>
                        </div>

                        <v-card-title class="text-h6 font-weight-bold px-0 pt-0">
                          {{ $t('view.loginPage.dateDeNaissance') }}
                        </v-card-title>

                        <v-card-text class="text-disabled text-caption px-0 fs-7">
                          {{ $t('view.loginPage.dateNaissanceParagraphe') }}
                        </v-card-text>

                        <v-row>
                          <v-col class="pb-0">
                            <v-select
                              id="register-day-field"
                              v-model="registerData.day"
                              :label="$t('view.loginPage.jour')"
                              :items="listOfDays"
                              :rules="[required]"
                            ></v-select>
                          </v-col>
                          <v-col class="pb-0">
                            <v-select
                              id="register-month-field"
                              v-model="registerData.month"
                              :label="$t('view.loginPage.mois')"
                              :items="listOfMonths"
                              :rules="[required]"
                            ></v-select>
                          </v-col>
                          <v-col class="pb-0">
                            <v-select
                              id="register-year-field"
                              v-model="registerData.year"
                              :label="$t('view.loginPage.annee')"
                              :items="listOfYears"
                              :rules="[required]"
                            ></v-select>
                          </v-col>

                          <v-col cols="12" class="pt-0">
                            <span
                              v-if="!isOver18 && isOver18 !== null"
                              id="register-error-message-birthdate"
                              class="text-red fs-7"
                            >
                              Vous devez avoir au moins 18 ans pour vous inscrire.
                            </span>
                          </v-col>
                        </v-row>
                      </div>
                      <div v-else class="px-12 py-4">
                        <v-card-title class="text-h4 font-weight-bold px-0 pt-0">
                          {{ $t('view.loginPage.setPassword') }}
                        </v-card-title>

                        <div class="pb-4">
                          <v-text-field
                            id="register-password-field"
                            v-model="registerData.password"
                            :label="$t('view.loginPage.password')"
                            :type="showPassword ? 'text' : 'password'"
                            :rules="[required]"
                          >
                            <template v-slot:append>
                              <v-btn
                                class="bg-black"
                                :icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click="showPassword = !showPassword"
                              ></v-btn>
                            </template>
                          </v-text-field>

                          <v-text-field
                            id="register-confirm-password-field"
                            v-model="registerData.confirmPassword"
                            :label="$t('view.loginPage.passwordConfirmation')"
                            :type="showPassword ? 'text' : 'password'"
                            :rules="[required, samePasswordConfirmation]"
                          >
                            <template v-slot:append>
                              <v-btn
                                class="bg-black"
                                :icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click="showPassword = !showPassword"
                              ></v-btn>
                            </template>
                          </v-text-field>
                        </div>
                      </div>

                      <div class="mt-auto px-12 pb-8">
                        <v-btn
                          v-if="registerStep == 1"
                          id="register-button-next"
                          size="large"
                          class="bg-white w-100"
                          :disabled="!canRegisterStep1 || !isOver18"
                          @click="registerStep = 2"
                        >
                          {{ $t('view.loginPage.suivant') }}
                        </v-btn>
                        <v-btn
                          v-else
                          id="register-button-create-account"
                          size="large"
                          class="bg-white w-100"
                          type="submit"
                          :disabled="!canRegisterStep2"
                        >
                          {{ $t('view.loginPage.createYourAccount') }}
                        </v-btn>
                      </div>
                    </template>
                  </v-form>
                </v-card>
              </template>
            </v-dialog>
          </div>

          <div class="d-flex d-sm-none">
            <v-dialog
              v-model="dialogRegisterMobilModelValue"
              transition="dialog-bottom-transition"
              fullscreen
              @update:model-value="handleDialogClose"
            >
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn v-bind="activatorProps" size="large" class="bg-red bg-red w-100 mb-2">
                  {{ $t('view.loginPage.createAccount') }}
                </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card class="bg-black" style="border-radius: 0 !important">
                  <v-card-actions>
                    <v-row>
                      <v-col class="d-flex align-center justify-start">
                        <v-btn
                          v-if="registerStep === 1"
                          icon="mdi-close"
                          size="large"
                          @click="isActive.value = false"
                        >
                        </v-btn>
                        <v-btn
                          v-else
                          icon="mdi-arrow-left"
                          size="large"
                          @click="registerStep = 1"
                        ></v-btn>
                      </v-col>
                      <v-col class="d-flex align-center justify-center">
                        <v-img :max-width="50" aspect-ratio="16/9" cover src="/logo.png"></v-img
                      ></v-col>
                      <v-col> </v-col>
                    </v-row>
                  </v-card-actions>

                  <v-form class="d-flex flex-column fill-height" @submit.prevent="register">
                    <div
                      v-if="loginStore.loading"
                      class="fill-height d-flex justify-center align-center"
                    >
                      <v-progress-circular indeterminate></v-progress-circular>
                    </div>

                    <template v-else>
                      <div v-if="registerStep === 1" class="px-12 py-4">
                        <v-card-title class="text-h4 font-weight-bold px-0 pt-0">
                          {{ $t('view.loginPage.createYourAccount') }}
                        </v-card-title>

                        <div class="pb-4">
                          <v-text-field
                            v-model="registerData.username"
                            class="pb-0"
                            :label="$t('view.loginPage.username')"
                            :rules="[required, username]"
                          ></v-text-field>

                          <v-text-field
                            v-model="registerData.email"
                            type="email"
                            label="Email"
                            :rules="[required, email]"
                          ></v-text-field>
                        </div>

                        <v-card-title class="text-h6 font-weight-bold px-0 pt-0">
                          {{ $t('view.loginPage.dateDeNaissance') }}
                        </v-card-title>

                        <v-card-text class="text-disabled text-caption px-0 fs-7">
                          {{ $t('view.loginPage.dateNaissanceParagraphe') }}
                        </v-card-text>

                        <v-row>
                          <v-col class="pb-0">
                            <v-select
                              v-model="registerData.month"
                              :label="$t('view.loginPage.mois')"
                              :items="listOfMonths"
                              :rules="[required]"
                            ></v-select>
                          </v-col>
                          <v-col class="pb-0">
                            <v-select
                              v-model="registerData.day"
                              :label="$t('view.loginPage.jour')"
                              :items="listOfDays"
                              :rules="[required]"
                            ></v-select>
                          </v-col>
                          <v-col class="pb-0">
                            <v-select
                              v-model="registerData.year"
                              :label="$t('view.loginPage.annee')"
                              :items="listOfYears"
                              :rules="[required]"
                            ></v-select>
                          </v-col>

                          <v-col cols="12" class="pt-0">
                            <span v-if="!isOver18 && isOver18 !== null" class="text-red fs-7">
                              Vous devez avoir au moins 18 ans pour vous inscrire.
                            </span>
                          </v-col>
                        </v-row>
                      </div>
                      <div v-else class="px-12 py-4">
                        <v-card-title class="text-h4 font-weight-bold px-0 pt-0">
                          {{ $t('view.loginPage.setPassword') }}
                        </v-card-title>

                        <div class="pb-4">
                          <v-text-field
                            v-model="registerData.password"
                            :label="$t('view.loginPage.password')"
                            :type="showPassword ? 'text' : 'password'"
                            :rules="[required]"
                          >
                            <template v-slot:append>
                              <v-btn
                                class="bg-black"
                                :icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click="showPassword = !showPassword"
                              ></v-btn>
                            </template>
                          </v-text-field>

                          <v-text-field
                            v-model="registerData.confirmPassword"
                            :label="$t('view.loginPage.passwordConfirmation')"
                            :type="showPassword ? 'text' : 'password'"
                            :rules="[required, samePasswordConfirmation]"
                          >
                            <template v-slot:append>
                              <v-btn
                                class="bg-black"
                                :icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click="showPassword = !showPassword"
                              ></v-btn>
                            </template>
                          </v-text-field>
                        </div>
                      </div>

                      <div class="mt-auto px-12 pb-8">
                        <v-btn
                          v-if="registerStep == 1"
                          size="large"
                          class="bg-white w-100"
                          :disabled="!canRegisterStep1 || !isOver18"
                          @click="registerStep = 2"
                        >
                          {{ $t('view.loginPage.suivant') }}
                        </v-btn>
                        <v-btn
                          v-else
                          size="large"
                          class="bg-white w-100"
                          type="submit"
                          :disabled="!canRegisterStep2"
                        >
                          {{ $t('view.loginPage.createYourAccount') }}
                        </v-btn>
                      </div>
                    </template>
                  </v-form>
                </v-card>
              </template>
            </v-dialog>
          </div>

          <span class="text-disabled text-caption">
            {{ $t('view.loginPage.confidentialite') }}
          </span>
        </div>

        <!-- FORMULAIRE DE CONNEXION DE COMPTE -->
        <h3 class="text-lg-h4 text-md-h6 text-h7 font-weight-bold mb-6">
          {{ $t('view.loginPage.hasAccount') }}
        </h3>

        <div class="d-none d-sm-flex">
          <v-dialog v-model="dialogModelValue" @update:model-value="handleDialogClose">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                id="login-button"
                v-bind="activatorProps"
                variant="outlined"
                size="large"
                :class="['px-16', 'text-red', 'mb-2']"
                style="width: 330px"
                @click="resetState"
              >
                {{ $t('view.loginPage.seConnecter') }}
              </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card class="bg-black">
                <v-card-actions>
                  <v-row>
                    <v-col class="d-flex align-center justify-start">
                      <v-btn
                        v-if="connectionStep === 1"
                        icon="mdi-close"
                        size="large"
                        @click="isActive.value = false"
                      >
                      </v-btn>
                      <v-btn
                        v-else-if="connectionStep === 2"
                        icon="mdi-arrow-left"
                        size="large"
                        @click="connectionStep = 1"
                      ></v-btn>
                      <v-btn
                        v-else
                        icon="mdi-arrow-left"
                        size="large"
                        @click="connectionStep = 2"
                      ></v-btn>
                    </v-col>
                    <v-col class="d-flex align-center justify-center">
                      <v-img :max-width="50" aspect-ratio="16/9" cover src="/logo.png"></v-img>
                    </v-col>
                    <v-col> </v-col>
                  </v-row>
                </v-card-actions>

                <v-form
                  class="d-flex flex-column fill-height"
                  style="height: 550px !important"
                  @submit.prevent="login"
                >
                  <div
                    v-if="loginStore.loading"
                    class="fill-height d-flex justify-center align-center"
                  >
                    <v-progress-circular indeterminate></v-progress-circular>
                  </div>

                  <template v-else>
                    <div class="px-12 py-4">
                      <v-card-title class="text-h4 font-weight-bold px-0 pt-0 text-wrap">
                        {{ $t('view.loginPage.connectezVous') }}
                      </v-card-title>

                      <template v-if="connectionStep !== 3">
                        <v-text-field
                          id="login-email-field"
                          type="email"
                          :label="$t('view.loginPage.adresseEmail')"
                          :disabled="connectionStep === 2"
                          v-model="loginData.email"
                          :rules="[required, email]"
                        ></v-text-field>

                        <v-text-field
                          v-if="connectionStep === 2"
                          id="login-password-field"
                          :type="showPassword ? 'text' : 'password'"
                          :label="$t('view.loginPage.motDePasse')"
                          v-model="loginData.password"
                          :rules="[required]"
                        >
                          <template v-slot:append>
                            <v-btn
                              class="bg-black"
                              :icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                              @click="showPassword = !showPassword"
                            ></v-btn>
                          </template>
                        </v-text-field>
                      </template>
                      <template v-else>
                        <v-text-field
                          type="number"
                          :label="$t('view.loginPage.authCode')"
                          v-model="askedCodeForAuth"
                          control-variant="hidden"
                          :rules="[required]"
                        ></v-text-field>
                      </template>
                    </div>

                    <div class="mt-auto px-12 pb-8">
                      <v-btn
                        v-if="connectionStep === 1"
                        id="login-button-next"
                        size="large"
                        class="bg-white w-100"
                        :disabled="
                          loginData.email === '' || typeof email(loginData.email) === 'string'
                        "
                        @click="connectionStep = 2"
                      >
                        {{ $t('view.loginPage.suivant') }}
                      </v-btn>

                      <v-btn
                        v-else-if="connectionStep === 2"
                        id="login-button-connect"
                        :disabled="loginData.password === ''"
                        size="large"
                        class="bg-white w-100"
                        type="submit"
                      >
                        {{ $t('view.loginPage.seConnecter') }}
                      </v-btn>

                      <v-btn
                        v-else-if="connectionStep === 3"
                        :disabled="askedCodeForAuth === ''"
                        size="large"
                        class="bg-white w-100"
                        type="submit"
                      >
                        {{ $t('view.loginPage.validateAuthCode') }}
                      </v-btn>

                      <v-btn variant="outlined" class="w-100 mt-6">
                        {{ $t('view.loginPage.motDePasseOublie') }}
                      </v-btn>
                    </div>
                  </template>
                </v-form>
              </v-card>
            </template>
          </v-dialog>
        </div>
        <div class="d-flex d-sm-none">
          <v-dialog
            v-model="dialogMobilModelValue"
            transition="dialog-bottom-transition"
            fullscreen
            @update:model-value="handleDialogClose"
          >
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                variant="outlined"
                size="large"
                :class="['px-16', 'text-red', 'mb-2']"
                style="width: 330px"
                @click="resetState"
              >
                {{ $t('view.loginPage.seConnecter') }}
              </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card class="bg-black">
                <v-card-actions>
                  <v-row>
                    <v-col class="d-flex align-center justify-start">
                      <v-btn
                        v-if="connectionStep === 1"
                        icon="mdi-close"
                        size="large"
                        @click="isActive.value = false"
                      >
                      </v-btn>
                      <v-btn
                        v-else-if="connectionStep === 2"
                        icon="mdi-arrow-left"
                        size="large"
                        @click="connectionStep = 1"
                      ></v-btn>
                      <v-btn
                        v-else
                        icon="mdi-arrow-left"
                        size="large"
                        @click="connectionStep = 2"
                      ></v-btn>
                    </v-col>
                    <v-col class="d-flex align-center justify-center">
                      <v-img :max-width="50" aspect-ratio="16/9" cover src="/logo.png"></v-img>
                    </v-col>
                    <v-col> </v-col>
                  </v-row>
                </v-card-actions>

                <v-form
                  class="d-flex flex-column fill-height"
                  style="height: 550px !important"
                  @submit.prevent="login"
                >
                  <div
                    v-if="loginStore.loading"
                    class="fill-height d-flex justify-center align-center"
                  >
                    <v-progress-circular indeterminate></v-progress-circular>
                  </div>

                  <template v-else>
                    <div class="px-12 py-4">
                      <v-card-title class="text-h4 font-weight-bold px-0 pt-0 text-wrap">
                        {{ $t('view.loginPage.connectezVous') }}
                      </v-card-title>

                      <template v-if="connectionStep !== 3">
                        <v-text-field
                          type="email"
                          :label="$t('view.loginPage.adresseEmail')"
                          :disabled="connectionStep === 2"
                          v-model="loginData.email"
                          :rules="[required, email]"
                        ></v-text-field>

                        <v-text-field
                          v-if="connectionStep === 2"
                          :type="showPassword ? 'text' : 'password'"
                          :label="$t('view.loginPage.motDePasse')"
                          v-model="loginData.password"
                          :rules="[required]"
                        >
                          <template v-slot:append>
                            <v-btn
                              class="bg-black"
                              :icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                              @click="showPassword = !showPassword"
                            ></v-btn>
                          </template>
                        </v-text-field>
                      </template>
                      <template v-else>
                        <v-text-field
                          type="number"
                          :label="$t('view.loginPage.authCode')"
                          v-model="askedCodeForAuth"
                          control-variant="hidden"
                          :rules="[required]"
                        ></v-text-field>
                      </template>
                    </div>

                    <div class="mt-auto px-12 pb-8">
                      <v-btn
                        v-if="connectionStep === 1"
                        size="large"
                        class="bg-white w-100"
                        :disabled="
                          loginData.email === '' || typeof email(loginData.email) === 'string'
                        "
                        @click="connectionStep = 2"
                      >
                        {{ $t('view.loginPage.suivant') }}
                      </v-btn>

                      <v-btn
                        v-else-if="connectionStep === 2"
                        :disabled="loginData.password === ''"
                        size="large"
                        class="bg-white w-100"
                        type="submit"
                      >
                        {{ $t('view.loginPage.seConnecter') }}
                      </v-btn>

                      <v-btn
                        v-else-if="connectionStep === 3"
                        :disabled="askedCodeForAuth === ''"
                        size="large"
                        class="bg-white w-100"
                        type="submit"
                      >
                        {{ $t('view.loginPage.validateAuthCode') }}
                      </v-btn>

                      <v-btn variant="outlined" class="w-100 mt-6">
                        {{ $t('view.loginPage.motDePasseOublie') }}
                      </v-btn>
                    </div>
                  </template>
                </v-form>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/stores/loginStore'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import PageNameEnum from '@/core/types/enums/pageNameEnum'
const { locale, t } = useI18n()
import { useDisplay } from 'vuetify'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import 'dayjs/locale/fr'
import 'dayjs/locale/en-gb'
dayjs.locale(locale.value)
dayjs.extend(isSameOrAfter)

const loginStore = useLoginStore()
const router = useRouter()

const listOfMonths = Array.from({ length: 12 }, (_, i) => i + 1)

const listOfDays = Array.from({ length: 31 }, (_, i) => i + 1)

const listOfYears = Array.from({ length: 90 }, (_, i) => 2025 - i)

const connectionStep = ref<number>(1)
const registerStep = ref<number>(1)
const showPassword = ref<boolean>(false)
const dialogModelValue = ref<boolean>(false)
const dialogRegisterModelValue = ref<boolean>(false)

const dialogMobilModelValue = ref<boolean>(false)
const dialogRegisterMobilModelValue = ref<boolean>(false)
const display = useDisplay()

const askedCodeForAuth = ref<string | null>('')

const isMobile = computed(() => display.smAndDown.value)

const loginData = reactive({
  email: '',
  password: '',
})

const registerData = reactive({
  username: '',
  email: '',
  day: null,
  month: null,
  year: null,
  password: '',
  confirmPassword: '',
})

onMounted(() => {
  // Verify if user is already exist
  if (loginStore.loginEmail) {
    if (isMobile) dialogModelValue.value = true
    else dialogMobilModelValue.value = true

    // Set email
    loginData.email = loginStore.loginEmail

    // Go to the step 2
    connectionStep.value = 2
  }
})

onUnmounted(() => {
  // Reset state when component is unmounted
  resetState()
})

const handleDialogClose = (isOpen: boolean) => {
  if (!isOpen) {
    resetState()
  }
}

const login = async () => {
  if (connectionStep.value === 3) {
    await askForAuthToken()
    return
  }

  const res = await loginStore.login(loginData)

  if (res) {
    // Pass to the last step
    connectionStep.value = 3
    toast.success(t('view.loginPage.emailAuthCode') as string)
  } else {
    toast.error(t('view.loginPage.loginError') as string)
  }
}

const askForAuthToken = async () => {
  const resToken = await loginStore.askCodeForToken({
    email: loginData.email,
    code: Number(askedCodeForAuth.value),
  })

  if (resToken) {
    // Close dialog
    setFalseToDialog()

    // Redirect to the main page
    router.push({ name: PageNameEnum.MAIN })
  } else {
    toast.error(t('view.loginPage.authCodeError') as string)
  }
}

const register = async () => {
  const userInfo = {
    username: registerData.username,
    email: registerData.email,
    birthdate: `${registerData.year}-${registerData.month}-${registerData.day}`,
    password: registerData.password,
  }

  const res = await loginStore.register(userInfo)

  // Close dialog
  setFalseToDialog()

  if (res) toast.success(t('view.loginPage.registerSuccess') as string)
  else toast.error(t('view.loginPage.registerError') as string)
}

const resetState = () => {
  connectionStep.value = 1
  loginData.email = ''
  loginData.password = ''
  askedCodeForAuth.value = ''
  registerStep.value = 1
  showPassword.value = false
  registerData.username = ''
  registerData.email = ''
  registerData.day = null
  registerData.month = null
  registerData.year = null
  registerData.password = ''
  registerData.confirmPassword = ''
}

const setFalseToDialog = () => {
  dialogModelValue.value = false
  dialogMobilModelValue.value = false
  dialogRegisterModelValue.value = false
  dialogRegisterMobilModelValue.value = false
}

const required = (v: string) => !!v || t('view.loginPage.fieldRequired')

const email = (v: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(v) || t('view.loginPage.invalidEmail')
}

const username = (v: string) => {
  const regex = /^[a-zA-Z0-9_-]{3,30}$/
  return regex.test(v) || t('view.loginPage.invalidUsername')
}

const samePasswordConfirmation = (v: string) => {
  return v === registerData.password || t('view.loginPage.passwordsDoNotMatch')
}

const canRegisterStep1 = computed(() => {
  return (
    (registerData.username &&
      registerData.email &&
      registerData.day &&
      registerData.month &&
      registerData.year) ??
    false
  )
})

const canRegisterStep2 = computed(() => {
  return (
    (registerData.password &&
      registerData.confirmPassword &&
      registerData.password === registerData.confirmPassword) ??
    false
  )
})

const isOver18 = computed(() => {
  if (!registerData.year || !registerData.month || !registerData.day) {
    return null
  }

  const birthDate = dayjs(
    `${registerData.year}-${registerData.month}-${registerData.day}`,
    'YYYY-M-D'
  )
  const today = dayjs()
  const age = today.diff(birthDate, 'year')

  return age > 18 || (age === 18 && today.isSameOrAfter(birthDate.add(18, 'year')))
})
</script>
