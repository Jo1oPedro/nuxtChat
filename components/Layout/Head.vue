<template>
  <div class="bg-gray-500 flex justify-end items-center gap-3 px-2">
    <Button @click="toggleSidebar()">
      <Icon :name="eyeIcon" size="20"></Icon>
    </Button>
    <ColorModeToogle></ColorModeToogle>
  </div>
</template>

<script lang="ts" setup>
defineProps(["eyeIcon"]);
const emit = defineEmits(["toggleSidebar"]);

function toggleSidebar() {
  console.log("porra");
  emit("toggleSidebar");
}
</script>

<style></style>
