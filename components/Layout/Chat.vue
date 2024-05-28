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
      <div class="flex justify-between px-1 items-center">
        <UsersChatProfile name="Vitoria" image="img/vitoria.jpg" />
        <Icon
          name="material-symbols:close"
          size="30"
          @click="toggleChat"
        ></Icon>
      </div>
      <div class="overflow-y-scroll">
        <div class="w-full grow bg-orange-200">
          <LayoutChatMessageItem></LayoutChatMessageItem>
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

defineProps({
  chatOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["toggleChat"]);
function toggleChat() {
  emit("toggleChat");
}

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
</script>

<style></style>
