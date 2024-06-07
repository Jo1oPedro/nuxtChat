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
        @toggle-chat="toggleChat()"
      ></LayoutHead>

      <div class="grow flex">
        <slot />
      </div>

      <Chat :chatOpen="chatOpen" @toggle-chat="toggleChat()"></Chat>
    </div>
    <div class="absolute top-0 left-0 right-0">
      <Toaster />
    </div>
  </div>
</template>

<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";

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

const chatOpen = ref(false);
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
