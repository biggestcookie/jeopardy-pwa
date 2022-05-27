import { Storage } from "@capacitor/storage";
import { defineStore } from "pinia";
import { getOrInitFromStorage } from "../utils/userStorage";

export const useUserStore = defineStore("user", {
  state: () => ({
    seasonsDesc: true,
    episodesDesc: false,
  }),
  actions: {
    async initializeFromStorage() {
      this.seasonsDesc = await getOrInitFromStorage(
        "seasonsDesc",
        this.seasonsDesc
      );

      this.episodesDesc = await getOrInitFromStorage(
        "episodesDesc",
        this.episodesDesc
      );
    },
    async setAndStore<T>(key: string, value: T) {
      (this as any)[key] = value;
      Storage.set({
        key,
        value: typeof value === "string" ? value : JSON.stringify(value),
      });
    },
  },
});
