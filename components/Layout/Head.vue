<template>
  <div class="flex justify-end items-center gap-3 border-b-2">
    <Button @click="toggleSidebar()" class="bg-transparent hover:bg-gray-400">
      <Icon :name="eyeIcon" size="20" :color="iconColor"></Icon>
    </Button>
    <Button @click="logout()" class="bg-transparent hover:bg-gray-400">
      <Icon name="majesticons:logout" size="20" :color="iconColor"></Icon>
    </Button>
    <Button @click="toggleChat()" class="bg-transparent hover:bg-gray-400">
      <Icon name="bi:chat-fill" size="20" :color="iconColor"></Icon>
    </Button>
    <ColorModeToogle></ColorModeToogle>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";

defineProps(["eyeIcon"]);
const emit = defineEmits(["toggleSidebar", "toggleChat"]);

const { logUserOut } = useAuthStore();

const colorMode = useColorMode();

const iconColor = ref(colorMode.value === "dark" ? "white" : "black");
watch(colorMode, function () {
  iconColor.value = colorMode.value === "dark" ? "white" : "black";
});

function toggleSidebar() {
  emit("toggleSidebar");
}

function toggleChat() {
  emit("toggleChat");
}

function logout() {
  logUserOut();
}
</script>

<style></style>
