<script lang="ts" setup>
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonSkeletonText,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <ion-skeleton-text animated />
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid fixed>
        <ion-row class="ion-align-items-center">
          <ion-col class="ion-text-center">
            <ion-spinner></ion-spinner>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
ion-grid,
ion-row {
  height: 100%;
}
</style>
