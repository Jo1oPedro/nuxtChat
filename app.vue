<template>
  <div class="flex w-full h-full absolute">
    <div
      class="w-[100px] h-full bg-red-500 flex flex-col justify-between p-2"
      v-if="sidebarOpen"
    >
      <div class="flex gap-2 flex-col">
        <NuxtLink to="/">
          <Button>Home</Button>
        </NuxtLink>
        <NuxtLink to="/">
          <Button>Events</Button>
        </NuxtLink>
      </div>
    </div>
    <div class="w-full bg-green-400 flex flex-col h-full relative">
      <div class="bg-gray-500 flex justify-end items-center gap-3 px-2">
        <Button @click="toggleSidebar()">
          <Icon :name="eyeIcon" size="20"></Icon>
        </Button>
        <ColorModeToogle></ColorModeToogle>
      </div>
      <div class="bg-orange-500 grow p-2 flex">
        <NuxtLayout>
          <NuxtPage></NuxtPage>
        </NuxtLayout>
      </div>
      <div>
        <Icon
          name="bi:chat-text-fill"
          size="40"
          class="absolute bottom-0 right-0 mb-5 mr-5"
          @click="toggleChat"
        ></Icon>
        <div
          class="absolute bottom-0 right-0 bg-red-500 w-[200px] h-[200px] md:w-[400px] md:h-[400px] flex flex-col"
          v-if="chatOpen"
        >
          <div class="bg-green-500 flex justify-end">
            <Icon
              name="material-symbols:close"
              size="30"
              @click="toggleChat"
            ></Icon>
          </div>
          <div class="w-full grow bg-orange-200">
            <div
              class="bg-purple-200"
              v-for="message in userMessages"
              :key="message"
            >
              {{ message }}
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { useChatStore } from "./stores/chat";
const store = useChatStore();

const userMessages = computed(() => store.messages);
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

const sidebarOpen = ref(true);
const eyeIcon = ref("mdi:hide");
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
  if (sidebarOpen.value) {
    eyeIcon.value = "mdi:hide";
    return;
  }
  eyeIcon.value = "mdi:show";
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
