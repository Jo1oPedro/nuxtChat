<template>
  <div class="flex w-full h-full absolute">
    <transition name="sidebar">
      <LayoutSidebar
        v-if="sidebarOpen"
        @toggle-sidebar="toggleSidebar()"
      ></LayoutSidebar>
    </transition>

    <div class="w-full flex flex-col h-full relative">
      <LayoutHead
        :eyeIcon="eyeIcon"
        @toggle-sidebar="toggleSidebar()"
      ></LayoutHead>

      <!-- Spacer to account for the fixed header height -->
      <div class="pt-6">
        <div class="relative">
          <div class="absolute top-0 right-0">cascata</div>
        </div>

        <div class="grow flex">
          <slot />
        </div>

        <Chat></Chat>
        <ChatSpecific v-if="specificChatOpen"></ChatSpecific>
      </div>
    </div>
    <div class="absolute top-0 right-0">
      <Toaster />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast, ToastAction } from "@/components/ui/toast";
import { useChatStore } from "@/stores/chat";
import { storeToRefs } from "pinia";

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

const { chatOpen, specificChatOpen, messages } = storeToRefs(useChatStore());
function toggleChat() {
  chatOpen.value = !chatOpen.value;
}

watch(messages.value, function () {
  if (!specificChatOpen.value) {
    toast({
      title: `Nova mensagem de ${
        useChatStore().lastUserMessageRecievedInfo.name
      }`,
      //description: "cascata",
      //duration: null,
      action: h(
        ToastAction,
        {
          altText: "Visualizar mensagem",
          onClick: () => {
            useChatStore().openUserChat({
              id: useChatStore().lastUserMessageRecievedInfo.id,
              name: useChatStore().lastUserMessageRecievedInfo.name,
            });
          },
        },
        {
          default: () => "Visualizar mensagem",
        }
      ),
    });
  }
});
</script>

<style>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.4s;
}
.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
