<template>
  <v-app id="app">
    <!-- Sidebar -->
     <v-main class="pa-0" id="body-block" v-if="route?.meta?.sidebar && !isMobile">
      <v-row class="fill-height" no-gutters>
        <v-col cols="4" md="4" lg="4" 
        style="
          border-right: 1px solid rgb(47, 51, 54);
        ">
          <NavigationComponent :footer-mode="false"></NavigationComponent>
        </v-col>
        
        <v-col cols="4" md="8" lg="4" class="fill-height">
          <router-view id="content_page" v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </v-col>
        
        <v-col cols="4" lg="4" class="fill-height d-lg-block d-md-none"
          style="
            border-left: 1px solid rgb(47, 51, 54);
          ">
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
