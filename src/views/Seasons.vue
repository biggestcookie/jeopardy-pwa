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
} from "@ionic/vue";
import { ref } from "vue";
import Heading from "../components/Heading.vue";
import SortButton from "../components/SortButton.vue";
import { useUserStore } from "../store/user";
import { useLoading } from "../use/useLoading";

useLoading();
const userStore = useUserStore();

const totalSeasons = 37;
const seasonIndices = ref(
  Array.from({ length: totalSeasons }, (_, i) =>
    userStore.seasonsDesc ? totalSeasons - i : i + 1
  )
);
const onSetDescending = (value: boolean) => {
  userStore.setAndStore("seasonsDesc", value);
  seasonIndices.value = seasonIndices.value.reverse();
};
</script>

<template>
  <ion-page class="ion-page" id="main-content">
    <heading>Jeopardy</heading>
    <ion-content class="ion-padding">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-breadcrumbs>
            <ion-breadcrumb active>Seasons</ion-breadcrumb>
          </ion-breadcrumbs>
        </ion-buttons>
        <sort-button
          :is-descending="userStore.seasonsDesc"
          @set-descending="onSetDescending"
        ></sort-button>
      </ion-toolbar>
      <ion-grid fixed>
        <ion-row>
          <ion-col v-for="index in seasonIndices" :key="index">
            <ion-card button :router-link="`/season/${index}/episode`">
              <ion-card-header>
                <ion-card-title>Season {{ index }}</ion-card-title>
                <ion-card-subtitle>
                  {{ index + 1983 }} - {{ index + 1984 }}
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
  // width: 100%;

  > * {
    white-space: nowrap;
  }

  // ion-col {
  //   flex-grow: 0 !important;
  // }
}
</style>
