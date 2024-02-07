const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected with id: " + socket.id);

  socket.on("message", (data) => {
    let emitter = socket.broadcast;
    if (data.room) emitter = emitter.to(data.room);
    emitter.emit("message", {
      id: socket.id.slice(0, 2),
      content: data.content,
    });
  });

  socket.on("join-room", (data) => {
    socket.join(data.room);
    socket.broadcast.to(data.room).emit("user-joined", {
      id: socket.id.slice(0, 2),
      //username: data.username,
    });
  });
});

io.listen(3000);
