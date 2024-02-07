const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected with id: " + socket.id);

  socket.on("message", (data) => {
    socket.broadcast.emit("message", {
      id: socket.id.slice(0, 2),
      content: data.content,
    });
  });
});

io.listen(3000);
