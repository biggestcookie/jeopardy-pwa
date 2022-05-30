import { defineStore } from "pinia";
import { Season } from "../models/season.model";

// interface Selection {
//   season?: number;
//   episodeDate?: string;
//   category?: string;
//   round?: string;
//   questionNumber?: number;
// }

export const useGameStore = defineStore("game", {
  state: () => ({
    seasonData: {} as Season,
    // selection: {} as Selection,
  }),
  actions: {
    async loadSeasonData(season: number) {
      this.seasonData = (
        await import(`../assets/json/season${season}.json`)
      ).default;
    },
  },
});
