const WebSocket = require("ws");

const wss = new WebSocket.Server({ noServer: true });

// Handle WebSocket connection
wss.on("connection", (ws) => {
  // Handle incoming WebSocket messages
  ws.on("message", (message) => {
    console.log("Received message:", message);
  });
});

// Function to send a message to connected clients
function sendWebSocketMessage(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

module.exports = { sendWebSocketMessage, wss };
