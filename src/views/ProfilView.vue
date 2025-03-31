<template>
  <v-container fluid>
    <v-row class="position-sticky top-0">
      <v-col
        cols="12"
        class="d-flex align-center d-inline-block"
        style="z-index: 1; backdrop-filter: blur(10px)"
      >
        <v-btn icon="mdi-arrow-left" size="small" class="bg-black mr-6" />

        <div>
          <h3>Florent</h3>
          <h5 class="opacity-50">157 posts</h5>
        </div>
      </v-col>
    </v-row>

    <v-row class="position-relative">
      <v-col class="pa-0" style="max-height: 275px">
        <v-img
          width="auto"
          aspect-ratio="16/9"
          cover
          src="https://picsum.photos/1920/1080"
          max-height="200px"
          height="100%"
        ></v-img>

        <v-avatar class="avatar-absolute" image="https://picsum.photos/200"></v-avatar>

        <div class="d-flex flex-column">
          <div class="d-none d-sm-flex">
            <v-dialog>
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  size="large"
                  variant="outlined"
                  style="position: absolute; right: 15px; bottom: 0"
                >
                  Éditer le profil
                </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card class="bg-black overflow-hidden">
                  <v-card-actions>
                    <v-row>
                      <v-col cols="7" class="d-flex align-center justify-start pt-1 mb-1">
                        <v-btn icon="mdi-close" size="large" @click="isActive.value = false">
                        </v-btn>

                        <h2 class="ms-3 text-h5">Éditer le profil</h2>
                      </v-col>
                      <v-col cols="5" class="d-flex align-center justify-end pt-1 mb-1">
                        <v-btn size="large" class="bg-white px-6 py-2 mr-2 h-auto">
                          Enregistrer
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>

                  <v-row class="position-relative" style="max-height: 250px">
                    <v-col class="pa-0 position-relative">
                      <v-img
                        width="auto"
                        aspect-ratio="16/9"
                        cover
                        src="https://picsum.photos/1920/1080"
                        max-height="170px"
                        height="100%"
                        class="d-flex align-center position-relative"
                      >
                        <div class="smoke-screen"></div>
                        <div class="d-flex justify-center align-center">
                          <v-btn
                            icon="mdi-camera"
                            class="mx-3 text-white"
                            style="background-color: rgba(0, 0, 0, 0.5)"
                          >
                          </v-btn>
                          <v-btn
                            icon="mdi-close"
                            class="mx-3 text-white"
                            style="background-color: rgba(0, 0, 0, 0.5)"
                          >
                          </v-btn>
                        </div>
                      </v-img>

                      <v-avatar class="avatar-absolute-edit">
                        <v-img src="https://picsum.photos/200"></v-img>
                        <div class="smoke-screen"></div>

                        <v-btn
                          icon="mdi-camera"
                          class="mx-3 text-white position-absolute"
                          style="background-color: rgba(0, 0, 0, 0.5)"
                        >
                        </v-btn>
                      </v-avatar>
                    </v-col>
                  </v-row>

                  <v-row class="px-8 py-4">
                    <v-col class="pa-0">
                      <v-text-field class="pb-4" label="Nom"> </v-text-field>

                      <v-text-field class="pb-4" label="Bio"> </v-text-field>

                      <div>
                        <span class="opacity-50 text-subtitle-2">Date de naissance • </span>
                        <button type="button" class="text-subtitle-2 text-blue">Éditer</button>
                      </div>

                      <div>27 Janvier 2003</div>
                    </v-col>
                  </v-row>
                </v-card>
              </template>
            </v-dialog>
          </div>

          <div class="d-flex d-sm-none">
            <v-dialog transition="dialog-bottom-transition" fullscreen>
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  size="large"
                  variant="outlined"
                  style="position: absolute; right: 15px; bottom: 0"
                >
                  Éditer le profil
                </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card class="bg-black overflow-hidden">
                  <v-card-actions>
                    <v-row>
                      <v-col cols="7" class="d-flex align-center justify-start pt-1 mb-1">
                        <v-btn icon="mdi-close" size="large" @click="isActive.value = false">
                        </v-btn>

                        <h2 class="ms-3 text-h6">Éditer le profil</h2>
                      </v-col>
                      <v-col cols="5" class="d-flex align-center justify-end pt-1 mb-1">
                        <v-btn size="large" class="bg-white px-6 py-2 mr-2 h-auto">
                          Enregistrer
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>

                  <v-row class="position-relative" style="max-height: 250px">
                    <v-col class="pa-0 position-relative">
                      <v-img
                        width="auto"
                        aspect-ratio="16/9"
                        cover
                        src="https://picsum.photos/1920/1080"
                        max-height="170px"
                        height="100%"
                        class="d-flex align-center position-relative"
                      >
                        <div class="smoke-screen"></div>
                        <div class="d-flex justify-center align-center">
                          <v-btn
                            icon="mdi-camera"
                            class="mx-3 text-white"
                            style="background-color: rgba(0, 0, 0, 0.5)"
                          >
                          </v-btn>
                          <v-btn
                            icon="mdi-close"
                            class="mx-3 text-white"
                            style="background-color: rgba(0, 0, 0, 0.5)"
                          >
                          </v-btn>
                        </div>
                      </v-img>

                      <v-avatar class="avatar-absolute-edit">
                        <v-img src="https://picsum.photos/200"></v-img>
                        <div class="smoke-screen"></div>

                        <v-btn
                          icon="mdi-camera"
                          class="mx-3 text-white position-absolute"
                          style="background-color: rgba(0, 0, 0, 0.5)"
                        >
                        </v-btn>
                      </v-avatar>
                    </v-col>
                  </v-row>

                  <v-row class="px-8 py-4">
                    <v-col class="pa-0">
                      <v-text-field class="pb-4" label="Nom"> </v-text-field>

                      <v-text-field class="pb-4" label="Bio"> </v-text-field>

                      <div>
                        <span class="opacity-50 text-subtitle-2">Date de naissance • </span>
                        <button type="button" class="text-subtitle-2 text-blue">Éditer</button>
                      </div>

                      <div>27 Janvier 2003</div>
                    </v-col>
                  </v-row>
                </v-card>
              </template>
            </v-dialog>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2>Florent</h2>
        <h4 class="opacity-50 font-weight-light mb-3">@RealEl_Floww</h4>

        <div class="font-weight-medium mb-3">Je suis un jeune homme</div>

        <div class="d-flex">
          <div><b>157</b> <span class="opacity-50">abonnements</span></div>
          <div class="mx-5"><b>30</b> <span class="opacity-50">abonnés</span></div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>

<style scoped>
.avatar-absolute {
  bottom: 23%;
  left: 80px;
  transform: translate(-50%, 0%);
  height: 130px;
  width: 130px;
  border: 3px solid #000;
}

.avatar-absolute-edit {
  bottom: 20%;
  left: 85px;
  transform: translate(-50%, 0%);
  height: 120px;
  width: 120px;
  border: 3px solid #000;
}

.smoke-screen {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

@media screen and (max-width: 600px) {
  .avatar-absolute {
    left: 60px;
    height: 100px;
    width: 100px;
  }
}
</style>
