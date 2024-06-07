<template>
  <div class="px-2 flex break-words" :class="{ 'justify-end': messageOwner }">
    <div
      :class="[getMessageClass(messageOwner)]"
      class="text-base break-all inline-flex items-center p-2 rounded-l-lg rounded-r-lg"
    >
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
