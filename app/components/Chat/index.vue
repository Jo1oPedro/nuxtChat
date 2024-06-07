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
import { toast, ToastAction } from "@/components/ui/toast";
import { storeToRefs } from "pinia";

const props = defineProps({
  chatOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["toggleChat"]);
function toggleChat() {
  emit("toggleChat");
}

const { messages } = storeToRefs(useChatStore());

watch(messages.value, function () {
  if (!props.chatOpen) {
    toast({
      title: "Nova mensagem",
      description: messages.value[messages.value.length - 1].content,
      //duration: null,
      action: h(
        ToastAction,
        {
          altText: "Visualizar mensagem",
          onClick: toggleChat,
        },
        {
          default: () => "Visualizar mensagem",
        }
      ),
    });
  }
});

function getMessageClass(messageOwner: boolean) {
  if (messageOwner) {
    return "bg-red-500";
  }
  return "bg-blue-500";
}

const userMessage = ref("");
const { $sendMessageToServer } = useNuxtApp();
function sendMessage() {
  if (userMessage.value.trim() !== "") {
    const message = {
      type: "new_message",
      message: userMessage.value,
    };
    userMessage.value = "";
    $sendMessageToServer(message);
  }
}
</script>

<style></style>
