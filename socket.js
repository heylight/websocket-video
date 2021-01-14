let rooms = [];
module.exports = function handleSocket(server) {
  const io = require("socket.io")(server);
  io.on("connection", (socket) => {
    let room = socket.handshake.query.cameraId || socket.id;
    console.log("room:", room);
    // 一个链接一个房间
    socket.join(room);
    socket.on("fps", (base64) => {
      // 继续轮询
      io.in(room).emit("received");
      // 广播
      socket.to(room).broadcast.emit("transfer", base64);
    });
    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  });
};
