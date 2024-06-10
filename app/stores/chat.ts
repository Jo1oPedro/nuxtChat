import { defineStore } from "pinia";

interface Message {
  content: string;
  messageOwner: boolean;
}

export const useChatStore = defineStore({
  id: "myChatStore",
  state: () => ({
    messages: [] as Message[],
    chatOpen: false,
    chats: [],
  }),
  actions: {
    setMessage(content: string, messageOwner: boolean) {
      this.messages.push({
        content,
        messageOwner,
      });
    },
    toggleChat() {
      this.chatOpen = !this.chatOpen;
    },
    toggleUserChat(userId: string) {},
  },
});
