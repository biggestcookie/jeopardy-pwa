import { defineStore } from "pinia";
import { Season } from "../types/season.model";

export const useGameStore = defineStore("game", {
  state: () => ({
    seasonData: null as Season | null,
  }),
  actions: {
    async loadSeasonData(season: number) {
      this.seasonData = (
        await import(`../assets/json/season${season}.json`)
      ).default;
    },
  },
});
