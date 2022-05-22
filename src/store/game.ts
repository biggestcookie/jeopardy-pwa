import { defineStore } from "pinia";

export const useStore = defineStore("game", {
  state: () => ({
    username: null as string | null,
  }),
});
