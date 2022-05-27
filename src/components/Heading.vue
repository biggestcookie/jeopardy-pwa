<script lang="ts" setup>
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title router-link="/">
        <slot></slot>
      </ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<style lang="scss" scoped>
ion-title {
  cursor: pointer;
}
</style>
