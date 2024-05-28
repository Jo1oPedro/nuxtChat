<template>
  <!--<div
    :class="getMessageClass(message.messageOwner)"
    v-for="message in userMessages"
    :key="message.content"
  >
    {{ message.content }}
  </div>-->
  <div>
    <div v-for="item in 100" :key="item">oiilll</div>
  </div>
</template>

<script lang="ts" setup>
import { useChatStore } from "@/stores/chat";
const chatStore = useChatStore();

const userMessages = computed(() => chatStore.messages);
function getMessageClass(messageOwner: boolean) {
  if (messageOwner) {
    return "bg-red-500";
  }
  return "bg-blue-500";
}
</script>

<style></style>
