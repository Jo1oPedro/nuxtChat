<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
    <!--<Toaster />-->
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

useAuthStore().setAuthenticatedUser();
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
