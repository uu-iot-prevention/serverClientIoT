import { useEffect, useState } from "react";

export default function useWebSocket(url) {
  const [message, setMessage] = useState();
  useEffect(() => {
    const socket = new WebSocket(url);

    socket.addEventListener("open", () => {
      console.log("Připojení k WebSocketu bylo úspěšné");
    });

    socket.addEventListener("message", (event) => {
      const message = event.data;
      setMessage(message);
    });

    socket.addEventListener("close", () => {
      console.log("Odpojení od WebSocketu");
    });

    return () => {
      socket.close();
    };
  }, [url]);
  return message;
}
