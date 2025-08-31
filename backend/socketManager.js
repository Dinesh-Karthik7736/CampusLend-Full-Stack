let io;
let onlineUsers = [];

const addUser = (userId, socketId) => {
  if (userId && !onlineUsers.some(user => user.userId === userId)) {
    onlineUsers.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find(user => user.userId === userId);
};

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "http://localhost:3000", // Allow your frontend to connect
        methods: ["GET", "POST"]
      }
    });

    io.on("connection", (socket) => {
      console.log(`A user connected: ${socket.id}`);

      // When a user logs in, they join the socket server
      socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", onlineUsers);
      });

      // When a user disconnects
      socket.on("disconnect", () => {
        console.log(`A user disconnected: ${socket.id}`);
        removeUser(socket.id);
        io.emit("getUsers", onlineUsers);
      });
    });

    return io;
  },
  getIo: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
  getUser: getUser,
};
