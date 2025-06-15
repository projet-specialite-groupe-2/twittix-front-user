<template>
  <v-container>
    <v-row class="d-flex align-center justify-space-between">
      <SearchInput :placeholder="'view.exploreView.searchPlaceholder'" />
      <v-btn
        class="bg-transparent"
        density="comfortable"
        icon="mdi-cog-outline"
        size="small"
      ></v-btn>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import SearchInput from '@/components/Fields/SearchInput.vue'
</script>
