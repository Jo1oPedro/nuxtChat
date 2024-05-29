<template>
  <!--<div class="flex bg-red-200">
    <div class="flex flex-col">
      <div class="flex justify-between">
        <p>Bem vindo de volta cascata.</p>
        <NuxtLink to="/events">
          <Button>Cadastrar Pet Desaparecido</Button>
        </NuxtLink>
      </div>
      <div class="flex justify-between">
        <div v-for="item in 3" :key="item" class="bg-gray-200 w-[200px]">a</div>
      </div>
    </div>
  </div>-->
  <div class="flex w-full flex-col p-1 sm:p-3 py-4 gap-8 items-center">
    <div
      class="flex flex-col w-full sm:flex-row items-center justify-between gap-3 p-3"
    >
      <p>Bem vindo de volta Cascata!</p>
      <NuxtLink to="/events">
        <Button class="">
          <span class="">Cadastrar Pet Desaparecido </span>
        </Button>
      </NuxtLink>
    </div>
    <div class="flex flex-col w-full items-center p-3">
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

const store = useCounterStore();
</script>

<style></style>
