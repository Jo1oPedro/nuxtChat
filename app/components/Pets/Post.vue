<template>
  <div>
    <div class="flex flex-col w-full items-center gap-3 pb-4">
      <span>Nome do pet desparecido: {{ petPost.name }}</span>
      <div class="w-full p-2 flex items-center justify-center">
        <img :src="url" class="md:w-[50%] h-[100px] md:h-[200px]" />
      </div>
      <Button @click="toggleChat()">Contatar o dono</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from "@/stores/chat";

const props = defineProps({
  petPost: {
    type: Object,
    required: true,
  },
});

console.log(props.petPost);

function toggleChat() {
  useChatStore().openUserChat(props.petPost.user);
}
const url =
  "http://localhost:7070/" + props.petPost.pet_post_images[0]?.image_path;
</script>

<style></style>
