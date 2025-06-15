<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-row
      id="userCard"
      v-bind="props"
      class="d-flex align-center w-100 py-2 px-2 cursor-pointer ga-2 pb-2"
      :style="{ backgroundColor: isHovering ? '#1c1c1c' : '' }"
      @click="onUserClick()"
    >
      <v-col cols="1" class="d-flex justify-center align-center pa-0">
        <v-sheet
          class="bg-transparent"
          style="border-radius: 50%; border: 1px solid rgb(47, 51, 54)"
        >
          <v-avatar size="45">
            <v-img
              style="object-fit: cover; width: 100%; height: 100%"
              src="https://pbs.twimg.com/profile_images/1888167261417897984/IZYKCEJg_400x400.jpg"
            ></v-img>
          </v-avatar>
        </v-sheet>
      </v-col>
      <v-col cols="8" class="align-start justify-start">
        <v-row class="d-flex align-center">
          <span class="text-subtitle-2 font-weight-bold">
            {{ profileName }}
          </span>
        </v-row>
        <v-row>
          <span class="text-body-2 font-weight-light text-grey">
            {{ username }}
          </span>
        </v-row>
      </v-col>
    </v-row>
  </v-hover>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'UserCard',
  props: {
    id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    profileName: {
      type: String,
      required: true,
    },
    onUserClick: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const menu = ref(false)

    return {
      menu,
    }
  },
})
</script>
