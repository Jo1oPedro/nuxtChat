import { defineStore } from "pinia";

interface Message {
  content: string;
  messageOwner: boolean;
}

export const useChatStore = defineStore({
  id: "myChatStore",
  state: () => ({
    messages: {},
    chatOpen: false,
    specificChatOpen: false,
    specificChatInfo: {},
    chatsHistory: {},
    lastUserMessageRecievedInfo: {},
  }),
  actions: {
    setMessage(messageInfo, messageOwner) {
      this.lastUserMessageRecievedInfo = {
        id: messageInfo.user_id,
        name: messageInfo.user_from_name,
      };
      if (!messageOwner) {
        this.setSpecificMessage(
          messageInfo.user_id,
          messageInfo.message,
          messageOwner
        );
        return;
      }
      this.setSpecificMessage(
        messageInfo.to,
        messageInfo.message,
        messageOwner
      );
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
