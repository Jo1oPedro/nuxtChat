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
    lastUserIdRecieved: null,
  }),
  actions: {
    setMessage(
      content: string,
      messageFrom: number,
      messageOwner: boolean,
      to: number
    ) {
      this.lastUserIdRecieved = messageFrom;
      if (!messageOwner) {
        this.setSpecificMessage(messageFrom, content, messageOwner);
        return;
      }
      this.setSpecificMessage(to, content, messageOwner);
    },
    setSpecificMessage(userId, content, messageOwner) {
      if (!this.messages[userId]) {
        this.messages[userId] = [];
      }
      this.messages[userId].push({
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
