<template>
  <div class="w-[220px] h-full border-r-2 flex flex-col gap-2">
    <header
      class="flex items-center gap-2 hover:scale-[101%] transition cursor-pointer p-3"
    >
      <LayoutLogo />
      <p class="font-bold text-sm md:text-base">Missing Pets</p>
    </header>
    <div class="flex gap-2 flex-col px-2">
      <NuxtLink
        v-for="item in items"
        :key="item.title"
        :to="item.path"
        class="flex items-center gap-2 px-2 py-1 rounded transition cursor-pointer hover:bg-neutral-100"
      >
        <Icon :name="item.icon" />
        <span>{{ item.title }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const items = ref([
  {
    title: "Home",
    path: "/",
    icon: "material-symbols:home",
  },
  {
    title: "Events",
    path: "/events",
    icon: "mdi:events",
  },
]);
</script>

<style></style>
