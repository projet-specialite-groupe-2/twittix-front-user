<template>
  <v-text-field
    prepend-inner-icon="mdi-magnify"
    density="compact"
    :placeholder="$t(placeholder)"
    variant="outlined"
    bg-color="transparent"
    color="blue"
    flat
    hide-details
    rounded
  ></v-text-field>
</template>

<script setup lang="ts">
defineProps({
  placeholder: {
    type: String,
    default: () => 'view.messagesPage.placeholder',
  },
})
</script>
