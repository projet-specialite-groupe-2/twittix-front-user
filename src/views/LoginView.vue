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

        <div class="d-flex flex-column mb-14" style="max-width: 330px">
          <v-dialog>
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                size="large"
                class="bg-blue"
                :class="['px-16', 'mb-2']"
              >
                {{ $t('view.loginPage.createAccount') }}
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
                      <v-number-input
                        :reverse="false"
                        controlVariant="stacked"
                        :label="$t('view.loginPage.mois')"
                        :hideInput="false"
                        inset
                      ></v-number-input>
                    </v-col>
                    <v-col>
                      <v-number-input
                        :reverse="false"
                        controlVariant="stacked"
                        :label="$t('view.loginPage.jour')"
                        :hideInput="false"
                        inset
                      ></v-number-input>
                    </v-col>
                    <v-col>
                      <v-number-input
                        :reverse="false"
                        controlVariant="stacked"
                        :label="$t('view.loginPage.annee')"
                        :hideInput="false"
                        inset
                      ></v-number-input>
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

          <span class="text-disabled text-caption">
            {{ $t('view.loginPage.confidentialite') }}
          </span>
        </div>

        <h3 class="text-lg-h4 text-md-h6 text-h7 font-weight-bold mb-6">
          {{ $t('view.loginPage.hasAccount') }}
        </h3>
        <v-btn
          variant="outlined"
          size="large"
          :class="['px-16', 'text-blue', 'mb-2']"
          style="width: 330px"
        >
          {{ $t('view.loginPage.seConnecter') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>
