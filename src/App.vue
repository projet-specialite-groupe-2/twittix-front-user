<template>
  <v-app id="app">
    <v-main id="body-block">
      <router-view id="content_page" v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </v-main>
  </v-app>
</template>

<style>
.v-overlay__scrim {
  background-color: rgba(91, 112, 131, 0.9) !important;
}
</style>
