<template>
  <div>
    {{ store.count }}
  </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from "@/stores/myStore";

const store = useCounterStore();
</script>

<style></style>
