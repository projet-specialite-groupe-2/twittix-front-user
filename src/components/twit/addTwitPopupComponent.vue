<script setup lang="ts">
import { toRef } from 'vue'
import AddTwitComponent from './addTwitComponent.vue'

const props = defineProps<{
  userPictureUrl: string
  open: boolean
}>()

const emit = defineEmits<{
  (eventName: 'submit:form', dialog: boolean, data?: string): void
}>()

function redirect(confirm: boolean, data?: string) {
  emit('submit:form', confirm, data)
}

const refDialog = toRef(props, 'open')
</script>

<template>
  <v-dialog v-model="refDialog" width="50%" persistent>
    <v-card class="mx-auto w-100 h-auto pa-5" :ripple="false">
      <v-btn icon="mdi-close" class="bg-black mb-5" v-on:click="emit('submit:form', false)">
      </v-btn>
      <AddTwitComponent
        :user-picture-url="props.userPictureUrl"
        v-on:submit:form="redirect"
      ></AddTwitComponent>
    </v-card>
  </v-dialog>
</template>
<style scoped>
.v-dialog > .v-overlay__content > .v-card {
  flex: none;
}
</style>
