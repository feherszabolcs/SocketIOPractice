const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected with id: " + socket.id);

  socket.on("message", (data) => {
    io.emit("message", { content: data.content });
  });

  
});

io.listen(3000);
