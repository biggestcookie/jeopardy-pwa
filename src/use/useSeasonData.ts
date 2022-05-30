import { onIonViewWillEnter } from "@ionic/vue";
import { useRoute } from "vue-router";
import { useGameStore } from "../store/game";
import { useLoadingStore } from "../store/loading";

export function useSeasonData() {
  const route = useRoute();
  const gameStore = useGameStore();
  const loadingStore = useLoadingStore();

  onIonViewWillEnter(async () => {
    if (route.params?.season) {
      loadingStore.loading = true;
      await gameStore.loadSeasonData(Number(route.params.season));
    }
  });
}
