<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup lang="ts">
import { usePetStore } from '@/stores/petStore'
const petStore = usePetStore()
await petStore.fetchPetById(1)
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
