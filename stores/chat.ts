import { defineStore } from "pinia";

export const useChatStore = defineStore({
  id: "myChatStoreStore",
  state: () => ({
    messages: [],
  }),
  actions: {
    setMessage(message: string) {
      this.messages.push(message);
    },
  },
});
