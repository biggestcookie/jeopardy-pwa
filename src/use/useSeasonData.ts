import { onIonViewWillEnter } from "@ionic/vue";
import { Ref, ref } from "vue";
import { useRoute } from "vue-router";
import { Season } from "../types/season.model";

export function useSeasonData() {
  const episodes: Ref<Season | null> = ref(null);

  onIonViewWillEnter(async () => {
    const route = useRoute();
    const data = (
      await import(`../assets/json/season${route.params.season}.json`)
    ).default;

    episodes.value = data;
  });

  return { episodes };
}
