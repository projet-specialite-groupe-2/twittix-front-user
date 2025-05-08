<template>
    <v-container fluid class="pa-0" style="height: 100vh !important; overflow-y: scroll">
    <v-row class="position-sticky top-0" style="z-index: 10 !important">
      <v-col cols="12" class="py-0">
        <div
          class="d-flex align-center d-inline-block w-100 h-100 pa-3"
          style="backdrop-filter: blur(10px)"
        >
          <v-btn
            icon="mdi-arrow-left"
            size="small"
            class="bg-black mr-6"
            @click.prevent="$router.go(-1)"
          />

          <div>
            <h3>{{ $t('view.profilPage.posts') }}</h3>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="position-relative mt-6">
      <TwitComponent v-if="twit"
          :twit-id="twit.id ?? 0"
          :twit-content="twit.content ?? ''"
          :twit-date="twit.createdAt ?? ''"
          :user-id="twit.author?.userIdentifier ?? ''"
          :username="twit.author?.username ?? ''"
          :user-picture-url="twit.author?.profileImgPath ?? ''"
          :twit-like-number="'976'"
          :twit-message-number="'9786'"
          :twit-re-twit-number="'876'"
          :is-liked="twit.isLiked ?? false"
          :id-re-twit="twit.isRetwit ?? false"
          v-on:like="likeTwit"
          v-on:retwit="reTwit"
          v-on:comment="openCommentDialog"
        />

        <v-container>
          <v-textarea
            class="mx-2 ma-5"
            :label="$t('Postez votre réponse')"
            variant="plain"
            auto-grow
            rows="2"
            v-model="twitText"
            :maxlength="twitLimit"
          >
            <template v-slot:prepend>
              <v-avatar size="40">
                <v-img :src="userPictureURL" alt="Avatar" />
              </v-avatar>
            </template>
          </v-textarea>
          <v-row justify="end">
            <div>
              <v-progress-circular
              :model-value="twitPourcentage"
              :size="35"
              width="5"
              :color="progressCircularColor()"
              >
              <template v-slot:default v-if="twitPourcentage >= 80">
                {{ twitLimit - twitLenght }}
              </template>
            </v-progress-circular>
            <v-btn class="bg-white ml-5 mb-5 me-5">
              {{ $t('Répondre') }}
            </v-btn>
          </div>
          <v-divider class="pa-1 border-opacity-25"></v-divider>
          </v-row>
        </v-container>

        <div v-for="item in commentary" :key="item">
          <TwitComponent v-if="twit"
          :twit-id="item.id ?? 0"
          :twit-content="item.content ?? ''"
          :twit-date="item.createdAt ?? ''"
          :user-id="item.author?.userIdentifier ?? ''"
          :username="item.author?.username ?? ''"
          :user-picture-url="item.author?.profileImgPath ?? ''"
          :twit-like-number="'976'"
          :twit-message-number="'9786'"
          :twit-re-twit-number="'876'"
          :is-liked="item.isLiked ?? false"
          :id-re-twit="item.isRetwit ?? false"
          v-on:openTwit="openTwit"
          v-on:like="likeTwit"
          v-on:retwit="reTwit"
          v-on:comment="openCommentDialog"
        />
        </div>
    </v-row>

    <AddComment
      v-if="commentTwitDialog"
      :twit-id="twit?.id ?? 0"
      :twit-content="twit?.content ?? ''"
      :twit-date="twit?.createdAt ?? ''"
      :user-id="twit?.author?.userIdentifier ?? ''"
      :username="twit?.author?.username ?? ''"
      :user-picture-url="twit?.author?.profileImgPath ?? ''"
      :open="commentTwitDialog"
      v-on:submit:form="commentDialogAction"
    />
    <v-overlay v-model="commentTwitDialog" persistent />
  </v-container>
</template>

<script setup lang="ts">
import AddComment from '@/components/twit/addCommentComponent.vue';
import TwitComponent from '@/components/twit/twitComponent.vue';
import { Twit, type User } from '@/core/api';
import PageNameEnum from '@/core/types/enums/pageNameEnum';
import type { Ref } from 'vue';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const twit: Ref<Twit | undefined> = ref(undefined)
const twitId: Ref<number> = ref(+router.currentRoute.value.params.idTwit)

const commentTwitDialog = ref<boolean>(false)
const commentary: Ref<Array<Twit>> = ref([])

const twitLimit = 280
const twitLenght = ref<number>(0)
const twitPourcentage = ref<number>(0)
const twitText = ref<string>('')

const userPictureURL =   'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Maupassant_par_Nadar.jpg/440px-Maupassant_par_Nadar.jpg'

onMounted(async () => {
  twit.value = await getTwit(undefined);

  for (let i = 0; i < 30; i++) {
    const res = await getTwit(i)
    commentary.value.push(res)
  }
});

watch(
  () => twitText.value,
  () => {
    twitLenght.value = twitText.value.length
    twitPourcentage.value = (twitLenght.value / twitLimit) * 100
  },
  { immediate: true }
)

function progressCircularColor(): string {
  if (twitPourcentage.value < 80) return 'blue'
  if (twitPourcentage.value < 90) return 'orange'
  return 'red'
}

async function getTwit(id: number | undefined): Promise<Twit> {
  return {
    id: id ? id : twitId.value,
    content:
      '⚽🔥 *Inazuma Eleven* : Le rêve de tous les fans de foot ⚡! Des matchs de folie, des techniques super puissantes 💥 et des personnages inoubliables 👕! \n\nLa Team Raimon 🏆 et ses héros comme Mark Evans 🧢, Axel Blaze 🔥 et la légende de la Tornado 🔄 qui nous font vibrer à chaque épisode! 😍⚡\n\nQui est votre joueur préféré? 🤔🎮 \n#InazumaEleven #Football #Anime #GénérationTornade',
    author: {
      id: 123,
      createdAt: '2024-03-01T12:00:00+00:00',
      updatedAt: '2024-03-05T14:30:00+00:00',
      deletedAt: null,
      email: 'johndoe@example.com',
      roles: ['USER'],
      username: 'johndoe',
      biography: 'Passionate about technology and coding.',
      birthdate: '1995-06-15',
      profileImgPath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Maupassant_par_Nadar.jpg/440px-Maupassant_par_Nadar.jpg',
      private: false,
      active: true,
      banned: false,
      twits: [],
      conversations: [],
      messages: [],
      userIdentifier: '@johndoe123',
    } as unknown as User,
    status: Twit.status.PUBLISHED,
    parent: null,
    createdAt: '2025-03-07T08:54:25+00:00',
  }
}

function likeTwit(){

}
function reTwit(){

}

function openCommentDialog() {
  commentTwitDialog.value = true
}

function commentDialogAction(confirm: boolean, data?: unknown) {
  if (confirm && data) {
    // Todo with APIs
  }
  commentTwitDialog.value = false
}

function openTwit(id: number) {
  router.push({ name: PageNameEnum.TWIT, params : { idTwit: id } })
}

</script>

<style scoped>
</style>
