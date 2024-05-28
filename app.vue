<template>
  <div class="flex w-full h-full absolute">
    <LayoutSidebar v-if="sidebarOpen"></LayoutSidebar>

    <div class="w-full bg-green-400 flex flex-col h-full relative">
      <LayoutHead
        :eyeIcon="eyeIcon"
        @toggle-sidebar="toggleSidebar()"
        @toggle-chat="toggleChat()"
      ></LayoutHead>

      <div class="bg-orange-500 grow p-2 flex">
        <NuxtLayout>
          <NuxtPage></NuxtPage>
        </NuxtLayout>
      </div>

      <LayoutChat :chatOpen="chatOpen" @toggle-chat="toggleChat()"></LayoutChat>
    </div>
  </div>
</template>

<script setup lang="ts">
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
.page-enter-active,
.page-leave-active {
  transition: all 1.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
