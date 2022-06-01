import { defineStore } from "pinia";
import { Season } from "../models/season.model";

// interface Selection {
//   season?: number;
//   episodeDate?: string;
//   category?: string;
//   round?: string;
//   questionNumber?: number;
// }

const jsonModules = import.meta.glob(`/public/json/*.json`);

export const useGameStore = defineStore("game", {
  state: () => ({
    seasonData: {} as Season,
    // selection: {} as Selection,
  }),
  actions: {
    async loadSeasonData(season: number) {
      this.seasonData = (
        await jsonModules[`/public/json/season${season}.json`]()
      ).default;
    },
  },
});
