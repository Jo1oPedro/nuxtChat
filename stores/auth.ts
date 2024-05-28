import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "myAuthStore",
  state: () => ({
    id: Math.floor(Math.random() * 1001),
  }),
  actions: {
    getId() {
      return this.id;
    },
  },
});
