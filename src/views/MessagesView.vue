<template>
  <v-container class="pa-0" fluid>
    <v-row>
      <v-col
        cols="7"
        justify="center"
        align="center"
        class="pa-0 overflow-y-scroll"
        style="
          border-left: 1px solid rgb(47, 51, 54);
          border-right: 1px solid rgb(47, 51, 54);
          height: 100vh;
        "
      >
        <v-col class="position-sticky top-0" style="z-index: 1; backdrop-filter: blur(10px)">
          <v-row class="d-flex justify-space-between w-100 px-4 pt-8">
            <v-col sm="10" md="10">
              <v-row>
                <h2>
                  {{ $t('view.messagesPage.title') }}
                </h2>
              </v-row>
            </v-col>

            <v-col sm="2" md="2" class="d-flex justify-center">
              <v-row class="d-flex align-center justify-end gap-2">
                <v-btn
                  class="bg-transparent"
                  density="comfortable"
                  icon="mdi-cog-outline"
                  size="small"
                ></v-btn>

                <v-dialog>
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-btn
                      v-bind="activatorProps"
                      class="bg-transparent"
                      density="comfortable"
                      icon="mdi-email-plus-outline"
                      size="small"
                    ></v-btn>
                  </template>

                  <template v-slot:default="{ isActive }">
                    <v-card class="bg-black px-4">
                      <v-card-actions class="px-2 py-4">
                        <v-col class="pa-0">
                          <v-row>
                            <v-col cols="2" class="d-flex align-center justify-start pa-0">
                              <v-btn icon="mdi-close" size="large" @click="isActive.value = false">
                              </v-btn>
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
                                  Create groups
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
                  </template>
                </v-dialog>
              </v-row>
            </v-col>
          </v-row>
        </v-col>

        <v-col>
          <v-row class="d-flex align-center w-100 pa-4">
            <SearchInput />
          </v-row>
          <v-hover v-slot="{ isHovering, props }">
            <v-row
              v-bind="props"
              class="d-flex align-center w-100 pa-2 cursor-pointer"
              :style="{ backgroundColor: isHovering ? '#1c1c1c' : '' }"
            >
              <v-col cols="3" class="d-flex justify-center align-center pa-0">
                <v-sheet
                  class="pa-3 bg-transparent"
                  style="border-radius: 50%; border: 1px solid rgb(47, 51, 54)"
                >
                  <v-icon color="white" icon="mdi-email-outline"></v-icon>
                </v-sheet>
              </v-col>
              <v-col cols="9" class="align-start justify-start">
                <v-row class="d-flex align-center">
                  <span class="text-subtitle-2 font-weight-bold">
                    {{ $t('view.messagesPage.messagesRequests') }}
                  </span>
                </v-row>
                <v-row>
                  <span class="text-caption font-weight-light text-grey">
                    {{ $t('view.messagesPage.penddingRequests', { count: 2 }) }}
                  </span>
                </v-row>
              </v-col>
            </v-row>
          </v-hover>

          <MessageCard
            v-for="i in 20"
            :key="i"
            profile-name="Swann"
            username="@Swann"
            date="12 Janv"
            sub-title="Ca va ?"
          />
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import SearchInput from '@/components/Fields/SearchInput.vue'
import MessageCard from '@/components/MessageCard/MessageCard.vue'

import { ref } from 'vue'

const isFocused = ref<boolean>(false)

const onFocus = () => {
  isFocused.value = true
}

const onBlur = () => {
  isFocused.value = false
}
</script>
