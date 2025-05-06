<template>
  <v-app id="app" class="h-screen overflow-hidden">
    <!-- Sidebar -->
    <v-main class="pa-0" id="body-block" v-if="route?.meta?.sidebar && !isMobile">
      <v-row class="fill-height" no-gutters>
        <v-col cols="4" md="4" lg="4" style="border-right: 1px solid rgb(47, 51, 54)">
          <NavigationComponent :footer-mode="false"></NavigationComponent>
        </v-col>

        <v-col cols="4" md="8" lg="4" class="fill-height">
          <router-view id="content_page" v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </v-col>

        <v-col
          v-if="$route.name === PageNameEnum.MESSAGES_DETAIL"
          cols="4"
          lg="4"
          style="border-left: 1px solid rgb(47, 51, 54)"
        >
          <router-view name="message_details" />
        </v-col>
        <v-col
          v-if="$route.name === PageNameEnum.MESSAGES_DETAIL_INFO"
          cols="4"
          lg="4"
          style="border-left: 1px solid rgb(47, 51, 54)"
        >
          <router-view name="message_details_info" />
        </v-col>
        <v-col
          v-else
          cols="4"
          lg="4"
          class="fill-height d-lg-block d-md-none"
          style="border-left: 1px solid rgb(47, 51, 54)"
        >
          <div class="bg-black about h-100"></div>
        </v-col>
      </v-row>

      <MessageBox
        v-if="
          $route.name !== PageNameEnum.MESSAGES &&
          $route.name !== PageNameEnum.MESSAGES_DETAIL &&
          $route.name !== PageNameEnum.MESSAGES_DETAIL_INFO
        "
      />
    </v-main>

    <!-- NO sidebar -->
    <v-main v-else id="body-block">
      <router-view id="content_page" v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </v-main>

    <!-- Footer -->
    <NavigationComponent
      v-if="isMobile && route?.meta?.sidebar"
      :footer-mode="true"
    ></NavigationComponent>
  </v-app>
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useRoute } from 'vue-router'
import NavigationComponent from './components/shared/NavigationComponent.vue'
import MessageBox from './components/Message/MessageBox.vue'
import PageNameEnum from './core/types/enums/pageNameEnum'
import { useLoginStore } from '@/stores/loginStore'

const route = useRoute()
const loginStore = useLoginStore()
const router = useRouter()

const display = useDisplay()
const isMobile = computed(() => display.smAndDown.value)

watch(
  () => loginStore.token,
  (newToken: string | null) => {
    // If the token is null, remove it from localStorage
    if (newToken) localStorage.setItem('token', newToken)
    else {
      localStorage.removeItem('token')
      router.push({ name: PageNameEnum.LOGIN })
    }
  }
)

onMounted(() => {
  const token = window.localStorage.getItem('token')
  if (token) loginStore.token = token
})
</script>

<style scoped>
.rotate-btn {
  transition: transform 0.3s ease;
}
.rotate-180 {
  transform: rotate(180deg);
}
</style>
