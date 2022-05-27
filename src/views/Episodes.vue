<script lang="ts" setup>
import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonToolbar,
  onIonViewWillEnter,
} from "@ionic/vue";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Heading from "../components/Heading.vue";
import SortButton from "../components/SortButton.vue";
import { useGameStore } from "../store/game";
import { useLoadingStore } from "../store/loading";
import { Season } from "../types/season.model";

const loadingStore = useLoadingStore();
const gameStore = useGameStore();
const router = useRouter();
const route = useRoute();

type IndexAndEpisode = [index: number, episodeDate: Date];
const seasons: IndexAndEpisode[] = reactive([]);
const isDescending = ref(false);

const onSetDescending = (value: boolean) => {
  isDescending.value = value;
  seasons.reverse();
};

onIonViewWillEnter(() => {
  loadingStore.loading = true;
  gameStore.loadSeasonData(Number(route.params.season)).then(() => {
    seasons.push(
      ...Object.keys(gameStore.seasonData as Season).map(
        (episodeDate, index) =>
          [index + 1, new Date(episodeDate)] as IndexAndEpisode
      )
    );
    loadingStore.loading = false;
  });
});
</script>

<template>
  <ion-page class="ion-page" id="main-content">
    <heading>Season {{ route.params.season }}</heading>
    <ion-content class="ion-padding">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-breadcrumbs>
            <ion-breadcrumb @click="router.back()" router-direction="back">
              Seasons
            </ion-breadcrumb>
            <ion-breadcrumb active>Episodes</ion-breadcrumb>
          </ion-breadcrumbs>
        </ion-buttons>
        <sort-button
          :is-descending="isDescending"
          @set-descending="onSetDescending"
        ></sort-button>
      </ion-toolbar>
      <ion-grid>
        <ion-row>
          <ion-col
            v-for="episode in seasons"
            :key="episode[0]"
            size="12"
            size-sm
          >
            <ion-card>
              <ion-card-header>
                <ion-card-title> Episode {{ episode[0] }} </ion-card-title>
                <ion-card-subtitle>
                  {{
                    episode[1].toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }}
                </ion-card-subtitle>
              </ion-card-header>
            </ion-card>
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

  // ion-col {
  //   flex-grow: 0 !important;
  // }
}
</style>
