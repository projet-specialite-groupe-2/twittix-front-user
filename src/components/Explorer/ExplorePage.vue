<template>
  <span>{{ tab }}</span>
</template>

<script setup lang="ts">
defineProps({
  tab: {
    type: String,
    required: true,
  },
})
</script>
