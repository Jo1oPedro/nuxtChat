import { defineStore } from "pinia";

interface UserPayloadInterface {
  username: String;
  password: String;
}

let logoutTimer: NodeJS.Timeout;

export const useAuthStore = defineStore({
  id: "myAuthStore",
  state: () => ({
    id: Math.floor(Math.random() * 1001),
    user: {},
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
        this.loading = true;

        const { data, pending, error }: any = await useFetch(
          "https://dummyjson.com/auth/login",
          {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: {
              username,
              password,
              expiresInMins: 60,
            },
          }
        );

        if (error.value) {
          this.error = error.value.data.message;
          this.loading = false;
          return;
        }

        //this.loading = pending;

        if (data.value) {
          const expiresInMins = 60 * 60 * 1000;
          logoutTimer = setTimeout(() => this.logUserOut(), expiresInMins);
          const token = useCookie("token", {
            expires: new Date(new Date().getTime() + expiresInMins), // 30 minutes
            secure: true,
            sameSite: "strict",
          });
          this.user = data.value;
          token.value = data?.value?.token;
          this.authenticated = true;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    logUserOut() {
      const token = useCookie("token");
      token.value = null;
      this.authenticated = false;
      this.user = {};
      clearTimeout(logoutTimer);
      useRouter().push("/login");
    },
    async getUser() {
      if (!this.user?.hasOwnProperty("email")) {
        const token = useCookie("token");
        const { data, pending, error }: any = await useFetch(
          "https://dummyjson.com/auth/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          }
        );

        this.user = data.value;
      }
    },
  },
});
