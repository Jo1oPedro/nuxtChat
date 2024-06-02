import { defineStore } from "pinia";

interface Message {
  content: string;
  messageOwner: boolean;
}

export const useChatStore = defineStore({
  id: "myChatStore",
  state: () => ({
    messages: [] as Message[],
  }),
  actions: {
    setMessage(content: string, messageOwner: boolean) {
      this.messages.push({
        content,
        messageOwner,
      });
    },
  },
});