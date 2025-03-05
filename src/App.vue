<template >
  <v-app id="app">
    <!-- Sidebar -->
     <v-main class="pa-0" id="body-block" v-if="route?.meta?.sidebar && !isMobile">
      <v-row class="fill-height" no-gutters>
        <v-col cols="6" md="4" lg="3">
          <NavigationComponent :footer-mode="false"></NavigationComponent>
        </v-col>
        
        <v-divider vertical></v-divider>
        
        <v-col cols="6" md="8" lg="6" class="fill-height">
          <router-view id="content_page" v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </v-col>
        
        <v-col cols="3" lg="3" class="fill-height d-lg-block d-md-none">
          <div class="bg-black about h-100"></div>
        </v-col>
      </v-row>
    </v-main>
        
        <!-- NO sidebar -->
    <v-main v-else id="body-block">
      <router-view id="content_page" v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </v-main>

    <!-- Footer -->
    <NavigationComponent v-if="isMobile && route?.meta?.sidebar" :footer-mode="true"></NavigationComponent>
  </v-app>
</template>

<script  setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import { useRoute } from 'vue-router'
import NavigationComponent from "./components/shared/NavigationComponent.vue";


const route = useRoute()

const display = useDisplay();
const isMobile = computed(() => display.smAndDown.value);
</script>
