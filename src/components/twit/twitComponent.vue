<script setup lang="ts">
import PageNameEnum from '@/core/types/enums/pageNameEnum';
import { useUserStore } from '@/stores/userStore';
import dayjs from 'dayjs';
import { computed, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { locale } = useI18n()
const router = useRouter()
const menu: Ref<boolean> = ref(false)
const userStore = useUserStore()

const props = defineProps<{
    twitId: number
    userId: string
    username: string
    twitDate: string
    twitContent: string
    userPictureUrl: string
    twitMessageNumber: string
    twitReTwitNumber: string
    twitLikeNumber: string
    isLiked: boolean
    idReTwit: boolean
}>()

const emit = defineEmits<{
	(eventName: 'like', id: number): void
	(eventName: 'retwit', id: number): void
	(eventName: 'comment', id: number): void
	(eventName: 'openTwit', id: number): void
	(eventName: 'deleteTwit', id: number): void
	(eventName: 'editTwit', id: number): void
}>()

const formattedDate = computed(() => {
  dayjs.locale(locale.value);
  return dayjs(props.twitDate).format("DD MMM.");
});

const editPost = () => {
  menu.value = false
  emit('editTwit', props.twitId)
}

const deletePost = () => {
  menu.value = false
  emit('deleteTwit', props.twitId)
}

function openTwit() {
    emit('openTwit', props.twitId)
}

function likeTwit() {
    emit('like', props.twitId)
}
function reTwit() {
    emit('retwit', props.twitId)

}
function commentTwit() {
    emit('comment', props.twitId)
}

function redirectToProfile() {
    router.push({ name: PageNameEnum.PROFIL, params: { username: `@${props.username}` } })
}

</script>

<template>
    <v-container class="py-0 px-3" :id="`twit`">
        <v-card
            class="mx-auto w-100 h-100 bg-black pa-5"
            style="border-radius: 0 !important;"
            link
            :ripple="false"
            v-on:click="openTwit"
        >
        <v-row>
            <v-col cols="1" class="pt-0">
                <v-avatar :image="props.userPictureUrl"></v-avatar>
            </v-col>
            <v-col cols="11">
                <v-row class="ml-2">
                    <a v-on:click.stop="redirectToProfile" class="font-weight-black mx-1 profile-name">{{ props.username }}</a>
                    <p class="mx-1 text-medium-emphasis">{{ props.userId }}</p>
                    <p class="mx-1 text-medium-emphasis">{{ formattedDate }}</p>

                    <div class="ml-auto">
                      <v-menu v-if="props.userId.toString() == userStore.userProfil?.id?.toString()" v-model="menu" :close-on-content-click="false" location="start">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            icon="mdi-dots-horizontal"
                            variant="plain"
                            size="small"
                            v-bind="props"
                          ></v-btn>
                        </template>
                        <v-card
                          min-width="300"
                          class="bg-black"
                          style="
                            border-color: rgb(47, 51, 54);
                            border-width: 1px;
                            box-shadow:
                              rgba(255, 255, 255, 0.2) 0px 0px 15px,
                              rgba(255, 255, 255, 0.15) 0px 0px 3px 1px;
                          "
                        >
                          <v-list class="w-full d-flex flex-row bg-black pa-0">
                            <v-list-item class="pa-0">
                              <template v-slot:append>
                                <v-btn @click="deletePost" class="w-full bg-black text-red" prepend-icon="mdi-delete-outline">
                                  {{ $t('components.twitComponent.deletePost') }}
                                </v-btn>
                              </template>
                            </v-list-item>
                          </v-list>

                          <v-divider></v-divider>

                          <v-list class="w-full d-flex flex-row bg-black pa-0">
                            <v-list-item class="pa-0">
                              <template v-slot:append>
                                <v-btn @click="editPost" class="w-full bg-black" prepend-icon="mdi-pencil">
                                  {{ $t('components.twitComponent.editPost') }}
                                </v-btn>
                              </template>
                            </v-list-item>
                          </v-list>
                        </v-card>
                      </v-menu>
                  </div>
                </v-row>

                <v-row  class="ml-3">
                    <p class="text-left text-white-space">{{ props.twitContent }}</p>
                </v-row>
            </v-col>
        </v-row>
        <v-row no-gutters class="mt-5 w-100 justify-space-evenly">
            <v-col cols="auto" class="d-flex justify-center">
                <v-btn variant="text" class="custom-btn custom-btn-comment" id="btnMessageTwit" v-on:click.stop="commentTwit">
                    <v-icon start>mdi-message-outline</v-icon>
                    <span>{{ props.twitMessageNumber }}</span>
                </v-btn>
            </v-col>
            <v-col cols="auto" class="d-flex justify-center">
                <v-btn variant="text" :class="props.idReTwit ? 'custom-btn-retwit' : 'custom-btn custom-btn-retwit-hover'" id="btnRepostTwit"  v-on:click.stop="reTwit">
                    <v-icon start size="24">mdi-repeat-variant</v-icon>
                    <span>{{ props.twitReTwitNumber }}</span>
                </v-btn>
            </v-col>
            <v-col cols="auto" class="d-flex justify-center">
                <v-btn variant="text" :class="props.isLiked ? 'custom-btn-like' : 'custom-btn custom-btn-like-hover'" id="btnLikeTwit" v-on:click.stop="likeTwit">
                    <v-icon start v-if="props.isLiked">mdi-heart</v-icon>
                    <v-icon start v-else>mdi-heart-outline</v-icon>
                    <span>{{ props.twitLikeNumber }}</span>
                </v-btn>
            </v-col>
        </v-row>
        </v-card>
    </v-container>
    <v-divider class="border-opacity-25 mx-3 my-0"></v-divider>
</template>

<style>
.custom-btn {
  color: #71767B;
  transition: all 0.3s ease;
}

.custom-btn-comment:hover {
  color: #1D9BF0;
}

.custom-btn-retwit {
  color: #00BA7C;
}

.custom-btn-retwit-hover:hover {
  color: #00BA7C;
}

.custom-btn-like {
  color: #F91880;
}

.custom-btn-like-hover:hover {
  color: #F91880;
}

.profile-name:hover{
    text-decoration: underline;
}

.text-white-space{
    white-space: pre-line;
}

</style>
