<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { useLoadingStore } from "./store/loading";
import Loading from "./views/Loading.vue";

const loadingStore = useLoadingStore();
</script>

<template>
  <ion-app>
    <loading v-show="loadingStore.loading" />
    <ion-router-outlet v-show="!loadingStore.loading" />
  </ion-app>
</template>
