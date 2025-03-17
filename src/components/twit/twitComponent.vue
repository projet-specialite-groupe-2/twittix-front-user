<script setup lang="ts">
import dayjs from 'dayjs';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';


const { locale } = useI18n()

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
}>()

const formattedDate = computed(() => {
  dayjs.locale(locale.value);
  return dayjs(props.twitDate).format("DD MMM.");
});

function openTwit() {
    emit('openTwit', props.twitId)
    console.log('twit opened')
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
    console.log('profile')
}

</script>

<template>
    <v-container class="py-0 px-3">
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
                </v-row>
                <v-row  class="ml-3">
                    <p class="text-left text-white-space">{{ props.twitContent }}</p>
                </v-row>
            </v-col>
        </v-row>
        <v-row no-gutters class="mt-5 w-100 justify-space-evenly">
            <v-col cols="auto" class="d-flex justify-center">
                <v-btn variant="text" class="custom-btn custom-btn-comment" v-on:click.stop="commentTwit">
                    <v-icon start>mdi-message-outline</v-icon>
                    <span>{{ props.twitMessageNumber }}</span>
                </v-btn>
            </v-col>
            <v-col cols="auto" class="d-flex justify-center">
                <v-btn variant="text" :class="props.idReTwit ? 'custom-btn-retwit' : 'custom-btn custom-btn-retwit-hover'"  v-on:click.stop="reTwit">
                    <v-icon start size="24">mdi-repeat-variant</v-icon>
                    <span>{{ props.twitReTwitNumber }}</span>
                </v-btn>
            </v-col>
            <v-col cols="auto" class="d-flex justify-center">
                <v-btn variant="text" :class="props.isLiked ? 'custom-btn-like' : 'custom-btn custom-btn-like-hover'" v-on:click.stop="likeTwit">
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