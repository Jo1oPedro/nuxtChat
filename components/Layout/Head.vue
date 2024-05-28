<template>
  <div class="flex justify-end items-center gap-3 px-2">
    <Button @click="toggleSidebar()" class="bg-transparent">
      <Icon :name="eyeIcon" size="20" :color="iconColor"></Icon>
    </Button>
    <Button @click="toggleChat()" class="bg-transparent">
      <Icon name="bi:chat-fill" size="20" :color="iconColor"></Icon>
    </Button>
    <ColorModeToogle></ColorModeToogle>
  </div>
</template>

<script lang="ts" setup>
defineProps(["eyeIcon"]);
const emit = defineEmits(["toggleSidebar", "toggleChat"]);

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
</script>

<style></style>
