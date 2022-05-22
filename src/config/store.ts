import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    username: null as string | null,
  }),
});
