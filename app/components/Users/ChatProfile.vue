<template>
  <div class="flex gap-2 items-center">
    <NuxtImg
      :src="image"
      class="h-[30px] w-[30px] md:h-[40px] md:w-[40px] rounded-full"
    ></NuxtImg>
    <p class="text-lg">{{ name }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
</script>

<style></style>
