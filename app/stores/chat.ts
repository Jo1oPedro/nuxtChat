import { defineStore } from "pinia";

interface Message {
  content: string;
  messageOwner: boolean;
}

export const useChatStore = defineStore({
  id: "myChatStore",
  state: () => ({
    messages: {}, //[] as Message[],
    chatOpen: false,
    specificChatOpen: false,
    specificChatInfo: {},
    chatsHistory: {},
  }),
  actions: {
    setMessage(content: string, messageOwner: boolean, to: number) {
      this.messages[to].push({
        content,
        messageOwner,
      });
    },
    toggleChat() {
      this.chatOpen = !this.chatOpen;
    },
    openUserChat(userInfo: object) {
      this.specificChatOpen = true;
      this.specificChatInfo = {
        user_id: userInfo.id,
        user_name: userInfo.name,
      };
      if (!this.messages[userInfo.id]) {
        this.messages[userInfo.id] = [];
      }
    },
    closeUserChat() {
      this.specificChatOpen = false;
    },
  },
});
