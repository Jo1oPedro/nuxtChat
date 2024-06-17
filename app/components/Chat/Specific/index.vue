<template>
  <div>
    <div
      class="fixed z-[40] bottom-0 right-1 md:right-2 bg-neutral-100 w-[150px] h-[350px] md:w-[300px] md:h-[500px] flex flex-col"
    >
      <div class="flex justify-between p-1 items-center border-b-2">
        <UsersChatProfile
          :name="specificChatInfo.user_name"
          image="~/public/img/vitoria.jpg"
        />
        <Icon
          name="material-symbols:close"
          size="20"
          @click="toggleChat"
          color="black"
        ></Icon>
      </div>
      <div class="overflow-y-scroll h-full flex">
        <div class="w-full grow flex flex-col justify-end">
          <div v-for="message in messages" :key="message.content">
            <ChatMessageItem
              class="break-words mb-2"
              :content="message.content"
              :messageOwner="message.messageOwner"
            ></ChatMessageItem>
          </div>
        </div>
      </div>
      <div class="p-1">
        <Textarea
          class="w-full resize-none focus:outline-none"
          placeholder="Digite sua mensagem"
          v-model="userMessage"
          @keydown.enter.prevent="sendMessage"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Textarea } from "@/components/ui/textarea";
import { useChatStore } from "@/stores/chat";
import { storeToRefs } from "pinia";

//const chatOpen = storeToRefs(useChatStore()).chatOpen;
//const specificChatInfo = storeToRefs(useChatStore()).specificChatInfo;
function toggleChat() {
  useChatStore().closeUserChat();
}

const { messages, chatOpen, specificChatInfo } = storeToRefs(useChatStore());

const userMessage = ref("");
const { $sendMessageToServer } = useNuxtApp();
function sendMessage() {
  if (userMessage.value.trim() !== "") {
    const message = {
      type: "new_message",
      message: userMessage.value,
      to: specificChatInfo.user_id,
    };
    userMessage.value = "";
    $sendMessageToServer(message);
  }
}

function getMessageClass(messageOwner: boolean) {
  if (messageOwner) {
    return "bg-red-500";
  }
  return "bg-blue-500";
}
</script>

<style></style>
