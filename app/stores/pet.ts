import { defineStore } from "pinia";
import { useAuthStore } from "~/stores/auth";
interface Message {
  content: string;
  messageOwner: boolean;
}

export const usePetStore = defineStore({
  id: "myPetStore",
  state: () => ({
    posts: [] as Message[],
    loading: false,
    error: "",
  }),
  actions: {
    async registerPet(content) {
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
  },
});
