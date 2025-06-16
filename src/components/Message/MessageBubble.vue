<template>
  <v-col class="d-flex flex-column justify-end" :class="isMe ? 'align-end' : 'align-start'">
    <v-card
      :color="isMe ? 'blue' : 'grey_custom'"
      class="pa-3 rounded-lg"
      :class="[
        isMe ? 'primary--text text--white' : '',
        isMe ? 'message-bubble-me' : 'message-bubble-other',
      ]"
      style="max-width: 65%"
    >
      <div>{{ text }}</div>
    </v-card>
    <v-col
      style="max-height: 10px"
      cols="12"
      class="pa-0"
      :class="isMe ? 'text-end' : 'text-start'"
    >
      <div class="pa-0 text-caption mb-2">{{ time }}</div>
    </v-col>
  </v-col>
</template>

<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    isMe: {
      type: Boolean,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.message-bubble-me {
  border-bottom-right-radius: 0% !important;
}

.message-bubble-other {
  border-bottom-left-radius: 0% !important;
}
</style>
