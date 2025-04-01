<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="5" class="d-none d-sm-flex justify-center align-center">
        <v-img :max-width="300" aspect-ratio="16/9" cover src="/src/assets/images/logo.png"></v-img>
      </v-col>

      <v-col cols="12" class="d-flex d-sm-none" justify="start">
        <v-img :max-width="100" aspect-ratio="16/9" cover src="/src/assets/images/logo.png"></v-img>
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
            <v-dialog>
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn v-bind="activatorProps" size="large" class="bg-red w-100 mb-2">
                  {{ $t('view.loginPage.createAccount') }}
                </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card class="bg-black">
                  <v-card-actions>
                    <v-row>
                      <v-col class="d-flex align-center justify-start">
                        <v-btn icon="mdi-close" size="large" @click="isActive.value = false">
                        </v-btn>
                      </v-col>
                      <v-col class="d-flex align-center justify-center">
                        <v-img
                          :max-width="50"
                          aspect-ratio="16/9"
                          cover
                          src="/src/assets/images/logo.png"
                        ></v-img
                      ></v-col>
                      <v-col> </v-col>
                    </v-row>
                  </v-card-actions>

                  <div class="px-12 py-4">
                    <v-card-title class="text-h4 font-weight-bold px-0 pt-0">
                      {{ $t('view.loginPage.createYourAccount') }}
                    </v-card-title>

                    <div class="pb-4">
                      <v-text-field class="pb-0" label="Nom et prénom"></v-text-field>

                      <v-text-field type="email" label="Email"></v-text-field>
                    </div>

                    <v-card-title class="text-h6 font-weight-bold px-0 pt-0">
                      {{ $t('view.loginPage.dateDeNaissance') }}
                    </v-card-title>

                    <v-card-text class="text-disabled text-caption px-0 fs-7">
                      {{ $t('view.loginPage.dateNaissanceParagraphe') }}
                    </v-card-text>

                    <v-row>
                      <v-col>
                        <v-select
                          :label="$t('view.loginPage.mois')"
                          :items="listOfMonths"
                        ></v-select>
                      </v-col>
                      <v-col>
                        <v-select :label="$t('view.loginPage.jour')" :items="listOfDays"></v-select>
                      </v-col>
                      <v-col>
                        <v-select
                          :label="$t('view.loginPage.annee')"
                          :items="listOfYears"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </div>

                  <div class="mt-auto px-12 pb-8">
                    <v-btn size="large" class="bg-white w-100">
                      {{ $t('view.loginPage.createYourAccount') }}
                    </v-btn>
                  </div>
                </v-card>
              </template>
            </v-dialog>
          </div>

          <div class="d-flex d-sm-none">
            <v-dialog transition="dialog-bottom-transition" fullscreen>
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
                        <v-btn icon="mdi-close" size="large" @click="isActive.value = false">
                        </v-btn>
                      </v-col>
                      <v-col class="d-flex align-center justify-center">
                        <v-img
                          :max-width="50"
                          aspect-ratio="16/9"
                          cover
                          src="/src/assets/images/logo.png"
                        ></v-img
                      ></v-col>
                      <v-col> </v-col>
                    </v-row>
                  </v-card-actions>

                  <div class="px-12 py-4">
                    <v-card-title class="text-h4 font-weight-bold px-0 pt-0">
                      {{ $t('view.loginPage.createYourAccount') }}
                    </v-card-title>

                    <div class="pb-4">
                      <v-text-field class="pb-0" label="Nom et prénom"></v-text-field>

                      <v-text-field type="email" label="Email"></v-text-field>
                    </div>

                    <v-card-title class="text-h6 font-weight-bold px-0 pt-0">
                      {{ $t('view.loginPage.dateDeNaissance') }}
                    </v-card-title>

                    <v-card-text class="text-disabled text-caption px-0 fs-7">
                      {{ $t('view.loginPage.dateNaissanceParagraphe') }}
                    </v-card-text>

                    <v-row>
                      <v-col>
                        <v-select
                          :label="$t('view.loginPage.mois')"
                          :items="listOfMonths"
                        ></v-select>
                      </v-col>
                      <v-col>
                        <v-select :label="$t('view.loginPage.jour')" :items="listOfDays"></v-select>
                      </v-col>
                      <v-col>
                        <v-select
                          :label="$t('view.loginPage.annee')"
                          :items="listOfYears"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </div>

                  <div class="mt-auto px-12 pb-8">
                    <v-btn size="large" class="bg-white w-100">
                      {{ $t('view.loginPage.createYourAccount') }}
                    </v-btn>
                  </div>
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
          <v-dialog>
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
                      <v-btn icon="mdi-close" size="large" @click="isActive.value = false"> </v-btn>
                    </v-col>
                    <v-col class="d-flex align-center justify-center">
                      <v-img
                        :max-width="50"
                        aspect-ratio="16/9"
                        cover
                        src="/src/assets/images/logo.png"
                      ></v-img>
                    </v-col>
                    <v-col> </v-col>
                  </v-row>
                </v-card-actions>

                <div class="px-12 py-4">
                  <v-card-title class="text-h4 font-weight-bold px-0 pt-0 text-wrap">
                    {{ $t('view.loginPage.connectezVous') }}
                  </v-card-title>

                  <v-text-field
                    type="email"
                    :label="$t('view.loginPage.adresseEmail')"
                    :disabled="connectionStep == 2"
                  ></v-text-field>

                  <v-text-field
                    v-if="connectionStep == 2"
                    :type="showPassword ? 'text' : 'password'"
                    :label="$t('view.loginPage.motDePasse')"
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

                <div class="mt-auto px-12 pb-8">
                  <v-btn
                    v-if="connectionStep == 1"
                    size="large"
                    class="bg-white w-100"
                    @click="connectionStep = 2"
                  >
                    {{ $t('view.loginPage.suivant') }}
                  </v-btn>
                  <v-btn v-else size="large" class="bg-white w-100">
                    {{ $t('view.loginPage.seConnecter') }}
                  </v-btn>

                  <v-btn variant="outlined" class="w-100 mt-6">
                    {{ $t('view.loginPage.motDePasseOublie') }}
                  </v-btn>
                </div>
              </v-card>
            </template>
          </v-dialog>
        </div>
        <div class="d-flex d-sm-none">
          <v-dialog transition="dialog-bottom-transition" fullscreen>
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
                      <v-btn icon="mdi-close" size="large" @click="isActive.value = false"> </v-btn>
                    </v-col>
                    <v-col class="d-flex align-center justify-center">
                      <v-img
                        :max-width="50"
                        aspect-ratio="16/9"
                        cover
                        src="/src/assets/images/logo.png"
                      ></v-img>
                    </v-col>
                    <v-col> </v-col>
                  </v-row>
                </v-card-actions>

                <div class="px-12 py-4">
                  <v-card-title class="text-h4 font-weight-bold px-0 pt-0 text-wrap">
                    {{ $t('view.loginPage.connectezVous') }}
                  </v-card-title>

                  <v-text-field
                    type="email"
                    :label="$t('view.loginPage.adresseEmail')"
                    :disabled="connectionStep == 2"
                  ></v-text-field>

                  <v-text-field
                    v-if="connectionStep == 2"
                    :type="showPassword ? 'text' : 'password'"
                    :label="$t('view.loginPage.motDePasse')"
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

                <div class="mt-auto px-12 pb-8">
                  <v-btn
                    v-if="connectionStep == 1"
                    size="large"
                    class="bg-white w-100"
                    @click="connectionStep = 2"
                  >
                    {{ $t('view.loginPage.suivant') }}
                  </v-btn>
                  <v-btn v-else size="large" class="bg-white w-100">
                    {{ $t('view.loginPage.seConnecter') }}
                  </v-btn>

                  <v-btn variant="outlined" class="w-100 mt-6">
                    {{ $t('view.loginPage.motDePasseOublie') }}
                  </v-btn>
                </div>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const listOfMonths = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
]

const listOfDays = Array.from({ length: 31 }, (_, i) => i + 1)

const listOfYears = Array.from({ length: 105 }, (_, i) => 2025 - i)

const connectionStep = ref(1)
const showPassword = ref(false)

const resetState = () => {
  connectionStep.value = 1
  showPassword.value = false
}
</script>
