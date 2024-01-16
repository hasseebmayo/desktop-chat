import http from "http";
import { Server } from "socket.io";
const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
// Store active users
const activeUsers = new Set();
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("chat_message", (data: any) => {
    activeUsers.add(data);
  });
  socket.emit("user_connected", () => {});

  // Handle chat messages
  socket.on("chat message", (message: string) => {
    io.emit("chat message", message); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

httpServer.listen(3001, () => {
  console.log("Server listening on port 3001");
});
