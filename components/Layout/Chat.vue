<template>
  <div>
    <Icon
      name="bi:chat-text-fill"
      size="40"
      class="absolute bottom-0 right-0 mb-5 mr-5"
      @click="toggleChat"
    ></Icon>
    <div
      class="absolute bottom-0 right-0 bg-red-500 w-[200px] h-[400px] md:w-[400px] md:h-[600px] flex flex-col"
      v-if="chatOpen"
    >
      <div class="bg-green-500 flex justify-between px-1 items-center">
        <UsersChatProfile name="Vitoria" image="img/vitoria.jpg" />
        <Icon
          name="material-symbols:close"
          size="30"
          @click="toggleChat"
        ></Icon>
      </div>
      <div class="overflow-y-scroll">
        <div class="w-full grow bg-orange-200">
          <!--<div
            :class="getMessageClass(message.messageOwner)"
            v-for="message in userMessages"
            :key="message.content"
          >
            {{ message.content }}
          </div>-->
          <div v-for="item in 100" :key="item">oi</div>
        </div>
      </div>
      <div class="bg-red-500 p-1">
        <Input
          class="w-full"
          type="text"
          placeholder="Digite sua mensagem"
          v-model="userMessage"
          @keydown.enter="sendMessage"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/chat";
const chatStore = useChatStore();

const userMessages = computed(() => chatStore.messages);
const userMessage = ref("");
const { $sendMessageToServer } = useNuxtApp();
function sendMessage() {
  const message = {
    type: "new_message",
    message: userMessage.value,
  };
  userMessage.value = "";
  $sendMessageToServer(message);
}

const chatOpen = ref(false);
function toggleChat() {
  chatOpen.value = !chatOpen.value;
}
function getMessageClass(messageOwner: boolean) {
  if (messageOwner) {
    return "bg-red-500";
  }
  return "bg-blue-500";
}
</script>

<style></style>
