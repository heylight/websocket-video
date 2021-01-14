module.exports = function handleSocket(socket) {
  console.log("connected!!!");
  socket.on("create-camera", (cameraId) => {
    socket.to(cameraId).broadcast.emit("transfer", {
      cameraId: res.cameraId,
      data: res.data,
    });
    this.to(cameraId).emit("received", { cameraId: res.cameraId });
  });
  socket.on("fps", (res) => {
    socket.to(cameraId).broadcast.emit("transfer", {
      cameraId: res.cameraId,
      data: res.data,
    });
    this.to(cameraId).emit("received", { cameraId: res.cameraId });
  });
  socket.on("disconnect", () => {
    console.log("hello");
  });
};
