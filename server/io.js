const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const jwt = require("jsonwebtoken");

module.exports = function (httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: true,
    },
  });

  // io.use((socket, next) => {
  //   if (socket.handshake.auth.token) {
  //     try {
  //       const payload = jwt.verify(
  //         socket.handshake.auth.token,
  //         process.env.JWT_SECRET
  //       );
  //       socket.username = payload.username;
  //       return next();
  //     } catch (e) {
  //       return next(new Error("Invalid token"));
  //     }
  //   }
  //   next(new Error("Token is not provied"));
  // });

  io.on("connection", (socket) => {
    console.log("A user connected with id: " + socket.id);

    socket.on("send-message", (data) => {
      if (!data.room) {
        socket.broadcast.emit("recieve-message", {
          id: socket.id.slice(0, 2),
          username: socket.username,
          content: data.content,
        });
      } else {
        socket.to(data.room).emit("recieve-message", {
          id: socket.id.slice(0, 2),
          username: socket.username,
          content: data.content,
        });
      }
    });

    socket.on("join-room", (room, cb) => {
      socket.join(room);
      cb(`Joined room: ${room}`);
      //socket.to(room).emit("user-joined", {
      //  id: socket.id.slice(0, 2),

      //});
    });
  });

  instrument(io, { auth: false });
};
