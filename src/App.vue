<template>
  <main id="body-block">
    <router-view id="content_page" v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </main>
</template>

<script setup lang="ts"></script>
