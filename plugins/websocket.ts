import { useChatStore } from "@/stores/chat";
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) return;

  const authStore = useAuthStore();
  const { authenticated } = storeToRefs(useAuthStore());

  const setupWebSocket = (userId: string) => {
    const authStore = useAuthStore();
    const id = useAuthStore().getId();
    const socket = new WebSocket(`ws://localhost:8080?userId=${id}`);

    socket.onopen = () => {
      console.log("conectado ao servidor");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(event.data);
      if (data.type === "new_user" || data.type === "new_message") {
        const store = useChatStore();
        store.setMessage(
          data.message,
          +data.user_id === useAuthStore().getId()
        );
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket closed: ", event);
    };

    const sendMessageToServer = (message: object) => {
      if (socket.readyState === WebSocket.OPEN) {
        console.log(message);
        socket.send(JSON.stringify(message));
      } else {
        console.error("Websocket is not open");
      }
    };

    nuxtApp.provide("socket", socket);
    nuxtApp.provide("sendMessageToServer", sendMessageToServer);
  };

  watch(
    () => authenticated.value,
    (isLoggedIn) => {
      if (isLoggedIn) {
        const userId = authStore.user.id;
        setupWebSocket(userId);
      }
    },
    { immediate: true }
  );
});
