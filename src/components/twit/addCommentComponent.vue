<script setup lang="ts">
import dayjs from 'dayjs';
import { computed, ref, toRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
    twitId: number
    userId: string
    username: string
    twitDate: string
    twitContent: string
    userTwitPictureUrl: string
    userCommentPictureUrl: string
	open: boolean
}>()

const emit = defineEmits<{
	(eventName: 'submit:form', dialog: boolean, data?: string): void
}>()

const refDialog = toRef(props, 'open')

const { locale } = useI18n()

const twitLimit = 280
const twitLenght = ref<number>(0)
const twitPourcentage = ref<number>(0)
const twitText = ref<string>('')

const formattedDate = computed(() => {
  dayjs.locale(locale.value);
  return dayjs(props.twitDate).format("DD MMM.");
});

watch(
	() => twitText.value,
	() => {
    twitLenght.value = twitText.value.length
    twitPourcentage.value = twitLenght.value / twitLimit * 100
	},
	{ immediate: true },
)

function progressCircularColor(): string {
  if (twitPourcentage.value < 80) return 'blue'
  if (twitPourcentage.value < 90) return 'orange'
  return 'red'
}
</script>

<template>
    <v-dialog v-model="refDialog" width="50%" persistent>
        <v-card
            class="mx-auto w-100 h-auto pa-5"
            :ripple="false"
        >
        <v-btn icon="mdi-close" class="bg-black mb-5"
            v-on:click="emit('submit:form', false)">
        </v-btn>
        <v-container>
            <v-row>
                <v-col cols="1" class="pt-0">
                    <v-avatar :image="props.userTwitPictureUrl"></v-avatar>
                    <v-divider :vertical="true"></v-divider>
                </v-col>
                <v-col cols="11">
                    <v-row class="ml-2">
                        <a v-on:click.stop="" class="font-weight-black mx-1 profile-name">{{ props.username }}</a>
                        <p class="mx-1 text-medium-emphasis">{{ props.userId }}</p>
                        <p class="mx-1 text-medium-emphasis">{{ formattedDate }}</p>
                    </v-row>
                    <v-row  class="ml-3">
                        <p class="text-left text-white-space">{{ props.twitContent }}</p>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-textarea
                class="mx-2"
                :label="$t('components.addComment.postAnwser')"
                variant="plain"
                auto-grow
                rows="2"
                v-model="twitText"
                :maxlength="twitLimit"
            >
            <template v-slot:prepend>
                <v-avatar size="40">
                    <v-img :src="props.userCommentPictureUrl" alt="Avatar" />
                </v-avatar>
            </template>
            </v-textarea>
                <v-row justify="end">
                    <v-divider class="pa-1 border-opacity-25"></v-divider>
                    <div class="h-100">
                        <v-progress-circular :model-value="twitPourcentage" :size="35" width="5" :color="progressCircularColor()">
                            <template v-slot:default v-if="twitPourcentage >= 80"> {{ twitLimit - twitLenght }} </template>
                        </v-progress-circular>
                        <v-divider vertical class="ml-5 h-50 border-opacity-25"></v-divider>
                        <v-btn v-on:click="emit('submit:form', true, twitText)" class="bg-white ml-5">
                            {{ $t('components.addComment.anwser') }}
                        </v-btn>
                    </div>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<style scoped>
.v-dialog > .v-overlay__content > .v-card{
    flex: none;
}
</style>
