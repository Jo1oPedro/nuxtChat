<template>
  <div class="flex w-full flex-col p-1 sm:p-3 py-4 gap-8 items-center">
    <div
      class="flex flex-col w-full sm:flex-row items-center justify-between gap-3 p-3"
    >
      <p>
        Bem vindo de volta
        {{ firstLetterUpperCase(user?.username) }}!
      </p>
      <PetsRegisterPet @petRegistered="refreshPetPosts"></PetsRegisterPet>
    </div>
    <div class="flex flex-col w-full p-3">
      <p class="mb-3">Pets desaparecidos</p>
      <div class="grid w-full grid-cols-1 sm:grid-cols-3 gap-3">
        <PetsPost
          v-for="petPost in petPosts?.data?.data"
          :key="petPost.id"
          class="bg-gray-200 grow flex items-center justify-center w-full"
          :petPost="petPost"
        >
        </PetsPost>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { usePetStore } from "@/stores/pet";

const { user } = useAuthStore();
function firstLetterUpperCase(string: String) {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
}

const { getPetPosts } = usePetStore();
const petPosts = ref([]);

async function refreshPetPosts() {
  petPosts.value = await getPetPosts(6);
}

onMounted(async () => {
  refreshPetPosts();
});
</script>

<style></style>
