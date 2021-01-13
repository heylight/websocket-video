module.exports = function handleSocket(socket) {
  console.log("connected!!!");
  socket.on("fps", (res) => {
    socket.broadcast.emit("transfer", { type: "base64", data: res.data });
    this.emit("received");
  });
  socket.on("disconnect", () => {
    console.log("hello");
  });
};
