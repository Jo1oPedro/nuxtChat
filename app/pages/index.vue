<template>
  <div class="flex w-full flex-col p-1 sm:p-3 py-4 gap-8 items-center">
    <div
      class="flex flex-col w-full sm:flex-row items-center justify-between gap-3 p-3"
    >
      <p>
        Bem vindo de volta
        {{ firstLetterUpperCase(user?.username) }}!
      </p>
      <PetsRegisterPet></PetsRegisterPet>
    </div>
    <div class="flex flex-col w-full p-3">
      <p class="mb-3">Pets desaparecidos</p>
      <div class="flex w-full flex-col sm:flex-row gap-3 justify-between">
        <div
          v-for="item in 3"
          :key="item"
          class="bg-gray-200 grow flex items-center justify-center"
        >
          a
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from "@/stores/myStore";
import { useAuthStore } from "@/stores/auth";

const store = useCounterStore();

const { user } = useAuthStore();

function firstLetterUpperCase(string: String) {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
}
</script>

<style></style>
