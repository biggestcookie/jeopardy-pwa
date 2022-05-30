<script lang="ts" setup>
import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
  IonToolbar,
  onIonViewWillEnter,
} from "@ionic/vue";
import { Ref, ref } from "vue";
import { useRoute } from "vue-router";
import Heading from "../components/Heading.vue";
import { Question } from "../models/season.model";
import { useGameStore } from "../store/game";
import { useLoadingStore } from "../store/loading";
// import { useSeasonData } from "../use/useSeasonData";

// useSeasonData();
const route = useRoute();
const gameStore = useGameStore();
const loadingStore = useLoadingStore();

const category: Ref<string> = ref("");
const question: Ref<Question | null> = ref(null);

gameStore.$subscribe(() => {
  loadQuestion();
});

onIonViewWillEnter(() => {
  loadQuestion();
});

function loadQuestion() {
  if (Object.keys(gameStore.seasonData)?.length) {
    const episodeDate = Object.keys(gameStore.seasonData)[
      Number(route.params.episodeNumber) - 1
    ];

    category.value = Object.keys(
      gameStore.seasonData[episodeDate][route.params.round as string]
    )[Number(route.params.categoryNumber) - 1];

    question.value =
      gameStore.seasonData[episodeDate][route.params.round as string][
        category.value
      ][Number(route.params.questionNumber) - 1];

    loadingStore.loading = false;
  }
}
</script>

<template>
  <ion-page class="ion-page" id="main-content">
    <heading
      >Season {{ route.params.season }}, Episode
      {{ route.params.episodeNumber }} -
      {{
        route.params.round === "3"
          ? "Final Jeopardy"
          : `Round ${route.params.round}`
      }}</heading
    >
    <ion-content class="ion-padding">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-breadcrumbs>
            <ion-breadcrumb :router-link="`/`" router-direction="back">
              Seasons
            </ion-breadcrumb>
            <ion-breadcrumb
              :router-link="`/season/${route.params.season}`"
              router-direction="back"
            >
              Episodes
            </ion-breadcrumb>
            <ion-breadcrumb
              :router-link="`/season/${route.params.season}/episode/${route.params.episodeNumber}`"
              router-direction="back"
            >
              Rounds
            </ion-breadcrumb>
            <ion-breadcrumb
              v-if="route.params.round !== '3'"
              :router-link="`/season/${route.params.season}/episode/${route.params.episodeNumber}/round/${route.params.round}`"
            >
              Categories
            </ion-breadcrumb>
            <ion-breadcrumb active> Question </ion-breadcrumb>
          </ion-breadcrumbs>
        </ion-buttons>
      </ion-toolbar>
      <ion-card class="ion-padding">
        <ion-card-header>
          <ion-card-subtitle>
            <h5>{{ category }}</h5>
          </ion-card-subtitle>
          <ion-card-title class="ion-text-justify">
            {{ question?.answer }}
          </ion-card-title>
        </ion-card-header>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
