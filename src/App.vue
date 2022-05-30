<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGameStore } from "./store/game";
import { useLoadingStore } from "./store/loading";
import { useUserStore } from "./store/user";
import Loading from "./views/Loading.vue";

const loadingStore = useLoadingStore();
const userStore = useUserStore();
// const loadedPrefs = ref(false);

const route = useRoute();
const gameStore = useGameStore();

onMounted(async () => {
  // userStore.initializeFromStorage().then(() => {
  //   loadedPrefs.value = true;
  // });

  await userStore.initializeFromStorage();

  if (route.params?.season) {
    loadingStore.loading = true;
    await gameStore.loadSeasonData(Number(route.params.season));
  }
});
</script>

<template>
  <ion-app>
    <!-- <template v-if="loadedPrefs"> -->
    <loading v-show="loadingStore.loading" />
    <ion-router-outlet v-show="!loadingStore.loading" />
    <!-- </template> -->
  </ion-app>
</template>
