<script lang="ts" setup>
import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonToolbar,
  onIonViewWillEnter,
} from "@ionic/vue";
import { Ref, ref } from "vue";
import { useRoute } from "vue-router";
import Heading from "../components/Heading.vue";
import { Episode } from "../models/season.model";
import { useGameStore } from "../store/game";
import { useLoadingStore } from "../store/loading";
// import { useSeasonData } from "../use/useSeasonData";

// useSeasonData();

const route = useRoute();
const gameStore = useGameStore();
const loadingStore = useLoadingStore();

const rounds: Ref<Episode> = ref({});

gameStore.$subscribe(() => {
  loadRoundsList();
});

onIonViewWillEnter(async () => {
  loadRoundsList();
});

function loadRoundsList() {
  if (Object.keys(gameStore.seasonData)?.length) {
    const episodeDate = Object.keys(gameStore.seasonData)[
      Number(route.params.episodeNumber) - 1
    ];

    rounds.value = gameStore.seasonData[episodeDate];
    loadingStore.loading = false;
  }
}
</script>

<template>
  <ion-page class="ion-page" id="main-content">
    <heading
      >Season {{ route.params.season }}, Episode
      {{ route.params.episodeNumber }}</heading
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
            <ion-breadcrumb active>Rounds</ion-breadcrumb>
          </ion-breadcrumbs>
        </ion-buttons>
      </ion-toolbar>
      <ion-grid fixed>
        <ion-row v-for="(_, key) in rounds" :key="key">
          <ion-col>
            <template v-if="key !== '3'">
              <ion-card
                button
                :router-link="`/season/${route.params.season}/episode/${route.params.episodeNumber}/round/${key}`"
              >
                <ion-card-header>
                  <ion-card-title> Round {{ key }} </ion-card-title>
                </ion-card-header>
              </ion-card>
            </template>
            <template v-else>
              <ion-card
                button
                :router-link="`/season/${route.params.season}/episode/${route.params.episodeNumber}/round/${key}/category/1/question/1`"
              >
                <ion-card-header>
                  <ion-card-title> Final Jeopardy </ion-card-title>
                </ion-card-header>
              </ion-card>
            </template>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
ion-row {
  > * {
    white-space: nowrap;
  }
}
</style>
