import {
  onIonViewDidEnter,
  onIonViewWillEnter,
  onIonViewWillLeave,
} from "@ionic/vue";
import { useLoadingStore } from "../store/loading";
export function useLoading() {
  const loadingStore = useLoadingStore();

  onIonViewWillEnter(() => {
    loadingStore.loading = true;
  });
  onIonViewDidEnter(() => {
    loadingStore.loading = false;
  });
  onIonViewWillLeave(() => {
    loadingStore.loading = true;
  });
}
