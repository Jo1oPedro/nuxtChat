import { useChatStore } from "@/stores/chat";
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) return;

  const authStore = useAuthStore();
  const { authenticated } = storeToRefs(useAuthStore());
  let socket: WebSocket | null;
  const setupWebSocket = (userId: string) => {
    socket = new WebSocket(`ws://localhost:8080?userId=${userId}`);

    socket.onopen = () => {
      console.log("conectado ao servidor");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(event.data);
      if (data.type === "new_user" || data.type === "new_message") {
        const store = useChatStore();
        store.setMessage(data.message, +data.user_id === +userId, data.to);
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

    if (!nuxtApp.$socket) {
      nuxtApp.provide("socket", socket);
      nuxtApp.provide("sendMessageToServer", sendMessageToServer);
    }
  };

  const closeWebSocket = () => {
    if (socket) {
      socket.close();
      socket = null;
      console.log("WebSocket connection closed due to logout");
    }
  };

  watch(
    () => authenticated.value,
    (isLoggedIn) => {
      if (isLoggedIn) {
        const userId = authStore.getAuthenticatedUser().id;
        setupWebSocket(userId);
      } else {
        closeWebSocket();
      }
    },
    { immediate: true }
  );
});
