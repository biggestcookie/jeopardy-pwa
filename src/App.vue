<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { onMounted, ref } from "vue";
import { useLoadingStore } from "./store/loading";
import { useUserStore } from "./store/user";
import Loading from "./views/Loading.vue";

const loadingStore = useLoadingStore();
const userStore = useUserStore();
const loadedPrefs = ref(false);

onMounted(() => {
  userStore.initializeFromStorage().then(() => {
    loadedPrefs.value = true;
  });
});
</script>

<template>
  <ion-app>
    <template v-if="loadedPrefs">
      <loading v-show="loadingStore.loading" />
      <ion-router-outlet v-show="!loadingStore.loading"
    /></template>
  </ion-app>
</template>
