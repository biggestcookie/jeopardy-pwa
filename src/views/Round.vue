<script lang="ts" setup>
import {
  IonAccordion,
  IonAccordionGroup,
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
  onIonViewWillEnter,
} from "@ionic/vue";
import { Ref, ref } from "vue";
import { useRoute } from "vue-router";
import Heading from "../components/Heading.vue";
import { Category } from "../models/season.model";
import { useGameStore } from "../store/game";
import { useLoadingStore } from "../store/loading";
// import { useSeasonData } from "../use/useSeasonData";

// useSeasonData();
const route = useRoute();
const gameStore = useGameStore();
const loadingStore = useLoadingStore();

const categories: Ref<Category> = ref({});

gameStore.$subscribe(() => {
  loadCategories();
});

onIonViewWillEnter(() => {
  loadCategories();
});

function loadCategories() {
  if (Object.keys(gameStore.seasonData)?.length) {
    const episodeDate = Object.keys(gameStore.seasonData)[
      Number(route.params.episodeNumber) - 1
    ];

    categories.value =
      gameStore.seasonData[episodeDate][route.params.round as string];

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
            <ion-breadcrumb active> Categories </ion-breadcrumb>
          </ion-breadcrumbs>
        </ion-buttons>
      </ion-toolbar>

      <ion-grid fixed>
        <ion-accordion-group>
          <!-- <template v-if="route.params.round !== '3'"> -->
          <ion-row v-for="(value, key, categoryIndex) in categories" :key="key">
            <ion-col>
              <ion-accordion>
                <ion-item slot="header">
                  <ion-label>{{ key }}</ion-label>
                </ion-item>
                <ion-item slot="content">
                  <ion-grid>
                    <ion-row>
                      <ion-col
                        v-for="(question, questionIndex) in value"
                        :key="question.value"
                      >
                        <ion-card
                          button
                          :router-link="`/season/${
                            route.params.season
                          }/episode/${route.params.episodeNumber}/round/${
                            route.params.round
                          }/category/${categoryIndex + 1}/question/${
                            questionIndex + 1
                          }`"
                        >
                          <ion-card-header>
                            <ion-card-title class="ion-text-center">
                              ${{ question.value }}
                            </ion-card-title>
                          </ion-card-header>
                        </ion-card>
                      </ion-col>
                    </ion-row>
                  </ion-grid>
                </ion-item>
              </ion-accordion>
            </ion-col>
          </ion-row>
          <!-- </template> -->
          <!-- <ion-card v-else>
            <ion-card-header>
              <ion-card-title class="ion-text-center">
                {{ Object.keys(categories)[0] }}
              </ion-card-title>
            </ion-card-header>
          </ion-card> -->
        </ion-accordion-group>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
