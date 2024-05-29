<template>
  <div>
    <Icon
      name="bi:chat-text-fill"
      size="40"
      class="absolute bottom-0 right-0 mb-5 mr-5"
      @click="toggleChat"
    ></Icon>
    <div
      class="absolute bottom-0 right-1 md:right-2 bg-neutral-100 w-[150px] h-[350px] md:w-[300px] md:h-[500px] flex flex-col"
      v-if="chatOpen"
    >
      <div class="flex justify-between p-1 items-center border-b-2">
        <UsersChatProfile name="Vitoria" image="img/vitoria.jpg" />
        <Icon
          name="material-symbols:close"
          size="30"
          @click="toggleChat"
          color="black"
        ></Icon>
      </div>
      <div class="overflow-y-scroll h-full flex">
        <div class="w-full grow flex flex-col justify-end">
          <div
            :class="getMessageClass(message.messageOwner)"
            v-for="message in userMessages"
            :key="message.content"
          >
            <LayoutChatMessageItem
              :content="message.content"
              :messageOwner="message.messageOwner"
            ></LayoutChatMessageItem>
          </div>
        </div>
      </div>
      <div class="p-1">
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

const chatStore = useChatStore();

const userMessages = computed(() => chatStore.messages);
function getMessageClass(messageOwner: boolean) {
  if (messageOwner) {
    return "bg-red-500";
  }
  return "bg-blue-500";
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
