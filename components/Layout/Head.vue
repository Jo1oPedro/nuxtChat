<template>
  <div class="bg-gray-500 flex justify-end items-center gap-3 px-2">
    <Button @click="toggleSidebar()">
      <Icon :name="eyeIcon" size="20"></Icon>
    </Button>
    <Button @click="toggleChat()">
      <Icon name="bi:chat-fill" size="20"></Icon>
    </Button>
    <ColorModeToogle></ColorModeToogle>
  </div>
</template>

<script lang="ts" setup>
defineProps(["eyeIcon"]);
const emit = defineEmits(["toggleSidebar", "toggleChat"]);

function toggleSidebar() {
  emit("toggleSidebar");
}

function toggleChat() {
  emit("toggleChat");
}
</script>

<style></style>
