<template>
  <v-container class="pa-0 pt-2" color="black">
    <v-row v-for="trend in trends" :key="trend.category">
      <v-col cols="12">
        <v-row>
          <span class="text-caption font-weight-light text-grey">{{ trend.category }}</span>
        </v-row>
        <v-row>
          <span class="text-white font-weight-bold">{{ trend.title }}</span>
        </v-row>
        <v-row>
          <span class="text-caption font-weight-light text-grey">{{ trend.publications }}</span>
        </v-row>
      </v-col>
      <v-divider class="my-2" />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const trends = [
  { category: 'Sports', title: 'Coupe du monde 2026', publications: '125K publications' },
  { category: 'Politique', title: 'Elections présidentielles', publications: '89K publications' },
  { category: 'Divertissement', title: 'Festival de Cannes', publications: '45K publications' },
  { category: 'Technologie', title: 'Sortie iPhone 16', publications: '78K publications' },
  { category: 'Musique', title: 'Album Taylor Swift', publications: '156K publications' },
  { category: 'Cinéma', title: 'Dune 2', publications: '92K publications' },
  { category: 'Economie', title: 'Bitcoin ATH', publications: '67K publications' },
]
</script>
