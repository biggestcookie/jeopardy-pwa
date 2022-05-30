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
import { Ref, ref } from "vue";
import { useRoute } from "vue-router";
import Heading from "../components/Heading.vue";
import SortButton from "../components/SortButton.vue";
import { useGameStore } from "../store/game";
import { useLoadingStore } from "../store/loading";
import { useUserStore } from "../store/user";
// import { useSeasonData } from "../use/useSeasonData";

// useSeasonData();
const loadingStore = useLoadingStore();
const gameStore = useGameStore();
const userStore = useUserStore();
const route = useRoute();

type IndexAndEpisode = [index: number, episodeDate: Date];
const seasons: Ref<IndexAndEpisode[]> = ref([]);

const onSetDescending = (value: boolean) => {
  userStore.setAndStore("episodesDesc", value);
  // userStore.episodesDesc = value;
};

onIonViewWillEnter(async () => {
  loadingStore.loading = true;
  gameStore.loadSeasonData(Number(route.params.season)).then(() => {
    loadSeasonList();
  });
});

function loadSeasonList() {
  const seasonKeys = Object.keys(gameStore.seasonData);
  if (seasonKeys?.length) {
    seasons.value = seasonKeys.map(
      (episodeDate, index) =>
        [index + 1, new Date(episodeDate)] as IndexAndEpisode
    );
    loadingStore.loading = false;
  }
}
</script>

<template>
  <ion-page class="ion-page" id="main-content">
    <heading>Season {{ route.params.season }}</heading>
    <ion-content class="ion-padding">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-breadcrumbs>
            <ion-breadcrumb router-link="/" router-direction="back">
              Seasons
            </ion-breadcrumb>
            <ion-breadcrumb active>Episodes</ion-breadcrumb>
          </ion-breadcrumbs>
        </ion-buttons>
        <sort-button
          :is-descending="userStore.episodesDesc"
          @set-descending="onSetDescending"
        ></sort-button>
      </ion-toolbar>
      <ion-grid fixed>
        <ion-row>
          <ion-col
            v-for="episode in !userStore.episodesDesc
              ? seasons
              : seasons.slice().reverse()"
            :key="`${userStore.episodesDesc}${episode[0]}`"
            size="12"
            size-sm
          >
            <ion-card
              button
              :router-link="`/season/${route.params.season}/episode/${episode[0]}`"
            >
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
