import { useEffect } from "react";

export default function useWebSocket(url, onMessage) {
  useEffect(() => {
    const socket = new WebSocket(url);

    socket.addEventListener("open", () => {
      console.log("Připojení k WebSocketu bylo úspěšné");
    });

    socket.addEventListener("message", (event) => {
      const message = event.data;
      onMessage(message);
    });

    socket.addEventListener("close", () => {
      console.log("Odpojení od WebSocketu");
    });

    return () => {
      socket.close();
    };
  }, [url, onMessage]);
}
