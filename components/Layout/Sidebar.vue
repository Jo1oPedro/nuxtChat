<template>
  <div
    class="m-0 p-0 fixed md:relative z-50 md:z-0 w-full md:w-[220px] bg-white h-full flex flex-col gap-2 md:border-r-2"
  >
    <header
      class="flex items-center gap-2 hover:scale-[101%] transition cursor-pointer"
    >
      <div class="flex items-center gap-2">
        <LayoutLogo />
        <p class="font-bold text-sm md:text-base">Missing Pets</p>
      </div>
      <Icon name="mdi:hide" size="20" @click="toggleSidebar()"></Icon>
    </header>
    <div class="flex gap-2 flex-col p-2">
      <NuxtLink
        v-for="item in items"
        :key="item.title"
        :to="item.path"
        class="flex items-center gap-2 px-2 py-1 rounded transition cursor-pointer hover:bg-neutral-100 border-b-2"
      >
        <Icon :name="item.icon" />
        <span>{{ item.title }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["toggleSidebar"]);

function toggleSidebar() {
  emit("toggleSidebar");
}

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
