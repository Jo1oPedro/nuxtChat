import { defineStore } from "pinia";
import { number } from "zod";
import { useAuthStore } from "~/stores/auth";

export const usePetStore = defineStore({
  id: "myPetStore",
  state: () => ({
    //posts: [] as Message[],
    loading: false,
    error: "",
    cacheDuration: 300000,
    cachedPosts: reactive({
      data: [],
      lastFetched: null,
    }),
  }),
  actions: {
    async registerPet(content: FormData) {
      try {
        this.error = "";
        this.loading = true;

        content.append("user_id", useAuthStore().getAuthenticatedUser().id);
        const token = useCookie("token");
        const { data, error }: any = await useFetch(
          "http://localhost:7070/api/pet/posts",
          {
            method: "post",
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
            body: content,
          }
        );

        if (error.value) {
          this.error = error.value.data.message;
          this.loading = false;
          return;
        }

        if (data.value) {
          console.log(data.value);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getPetPosts(numberOfPosts = 3, page = 1) {
      const now = new Date().getTime();
      if (
        !this.cachedPosts.lastFetched ||
        now - this.cachedPosts.lastFetched > this.cacheDuration ||
        this.cachedPosts.data.length !== numberOfPosts
      ) {
        const token = useCookie("token");
        const response = await fetch(
          `http://localhost:7070/api/pet/posts?paginate=${numberOfPosts}&page=${page}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token.value}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        this.cachedPosts.data = data;
        this.cachedPosts.lastFetched = now;
      }
      return this.cachedPosts;
    },
  },
});
