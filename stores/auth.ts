import { defineStore } from "pinia";

interface UserPayloadInterface {
  username: String;
  password: String;
}

export const useAuthStore = defineStore({
  id: "myAuthStore",
  state: () => ({
    id: Math.floor(Math.random() * 1001),
    authenticated: false,
    loading: false,
    error: "",
  }),
  actions: {
    getId() {
      return this.id;
    },
    async authenticateUser({ username, password }: UserPayloadInterface) {
      try {
        const { data, pending, error }: any = await useFetch(
          "https://dummyjson.com/auth/login",
          {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: {
              username,
              password,
            },
          }
        );

        if (error.value) {
          this.error = error.value.data.message;
          this.loading = false;
          return;
        }

        this.loading = pending;

        if (data.value) {
          const token = useCookie("token");
          token.value = data?.value?.token;
          this.authenticated = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    logUserOut() {
      const token = useCookie("token");
      this.authenticated = false;
      token.value = null;
      useRouter().push("/login");
    },
  },
});
