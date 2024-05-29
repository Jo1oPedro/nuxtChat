<template>
  <div>
    <div :class="getMessageClass(messageOwner)" class="text-base break-word">
      {{ content }}
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  content: {
    type: String,
    required: true,
  },
  messageOwner: {
    type: Boolean,
    required: true,
  },
});
function getMessageClass(messageOwner: boolean) {
  if (messageOwner) {
    return "bg-red-500";
  }
  return "bg-blue-500";
}
</script>

<style></style>
