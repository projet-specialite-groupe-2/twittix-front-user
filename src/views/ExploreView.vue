<template>
  <v-container>
    <v-col cols="12">
      <v-row class="d-flex align-center justify-space-between">
        <SearchInput :placeholder="'view.exploreView.searchPlaceholder'" />
        <v-btn
          class="bg-transparent"
          density="comfortable"
          icon="mdi-cog-outline"
          size="small"
        ></v-btn>
      </v-row>
      <v-row>
        <v-col class="px-0">
          <v-btn
            id="btnForYouContent"
            block
            variant="text"
            rounded="0"
            class="mb-2 pa-0"
            v-on:click="setCurrentTab(TAB_STATE.FOR_YOU)"
          >
            {{ $t('view.homeView.forYou') }}
          </v-btn>
          <v-progress-linear
            v-if="selectedTab === TAB_STATE.FOR_YOU"
            class="w-100"
            color="red"
            model-value="100"
          ></v-progress-linear>
        </v-col>
        <v-col class="px-0">
          <v-btn
            id="btnSubscriptionTendancesContent"
            block
            variant="text"
            rounded="0"
            class="mb-2 pa-0"
            v-on:click="setCurrentTab(TAB_STATE.TRENDING)"
          >
            {{ $t('view.exploreView.tendances') }}
          </v-btn>
          <v-progress-linear
            v-if="selectedTab === TAB_STATE.TRENDING"
            class="w-100"
            color="red"
            model-value="100"
          ></v-progress-linear>
        </v-col>
        <v-col class="px-0">
          <v-btn
            id="btnSubscriptionTendancesContent"
            block
            variant="text"
            rounded="0"
            class="mb-2 pa-0"
            v-on:click="setCurrentTab(TAB_STATE.NEWS)"
          >
            {{ $t('view.exploreView.actualites') }}
          </v-btn>
          <v-progress-linear
            v-if="selectedTab === TAB_STATE.NEWS"
            class="w-100"
            color="red"
            model-value="100"
          ></v-progress-linear>
        </v-col>
        <v-col class="px-0">
          <v-btn
            id="btnSubscriptionSportsContent"
            block
            variant="text"
            rounded="0"
            class="mb-2 pa-0"
            v-on:click="setCurrentTab(TAB_STATE.SPORTS)"
          >
            {{ $t('view.exploreView.sports') }}
          </v-btn>
          <v-progress-linear
            v-if="selectedTab === TAB_STATE.SPORTS"
            class="w-100"
            color="red"
            model-value="100"
          ></v-progress-linear>
        </v-col>
        <v-col class="px-0">
          <v-btn
            id="btnSubscriptionDivertissementContent"
            block
            variant="text"
            rounded="0"
            class="mb-2 pa-0"
            v-on:click="setCurrentTab(TAB_STATE.ENTERTAINMENT)"
          >
            {{ $t('view.exploreView.divertissement') }}
          </v-btn>
          <v-progress-linear
            v-if="selectedTab === TAB_STATE.ENTERTAINMENT"
            class="w-100"
            color="red"
            model-value="100"
          ></v-progress-linear>
        </v-col>
      </v-row>
      <v-col cols="12">
        <ExplorePage />
      </v-col>
    </v-col>
  </v-container>
</template>

<script setup lang="ts">
import ExplorePage from '@/components/Explorer/ExplorePage.vue'
import SearchInput from '@/components/Fields/SearchInput.vue'
import PageNameEnum from '@/core/types/enums/pageNameEnum'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const selectedTab = route.params.tab

const TAB_STATE = {
  FOR_YOU: 'for_you',
  TRENDING: 'trending',
  NEWS: 'news',
  SPORTS: 'sports',
  ENTERTAINMENT: 'entertainment',
}

const currentTab = ref(TAB_STATE.FOR_YOU)

const setCurrentTab = (tab: string) => {
  currentTab.value = tab
  router.push({ name: PageNameEnum.EXPLORER_DETAIL, params: { tab } })
}
</script>
