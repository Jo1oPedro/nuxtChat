import { useChatStore } from "@/stores/chat";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) return;

  const socket = new WebSocket("ws://localhost:8080");

  socket.onopen = () => {
    console.log("conectado ao servidor");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(event.data);
    if (data.type === "new_user" || data.type === "new_message") {
      //nuxtApp.$emit("updateUserCount", data.count);
      const store = useChatStore();
      store.setMessage(data.message);
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
});
