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
import Toaster from "@/components/ui/toast/Toaster.vue";
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

const { chatOpen, specificChatOpen } = storeToRefs(useChatStore());
function toggleChat() {
  chatOpen.value = !chatOpen.value;
}
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
