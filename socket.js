const axios = require("axios");
let rooms = [];
module.exports = function handleSocket(server) {
  const io = require("socket.io")(server);
  io.on("connection", (socket) => {
    let getTaget = (x) => x.roomId === socket.id; // 查找目标房间
    let roomId = socket.handshake.query.cameraId || socket.id; // 确定需要进入或者创建的房间
    let isNewRoom = !rooms.find((x) => x.roomId === roomId); // 是否需要创建新房间
    if (isNewRoom) {
      let room = {
        roomId,
        base64: "",
        timer: setInterval(() => {
          let msg = room.base64 || "";
          if (msg.length) {
            axios
              .post("https://shelf-product-recognize.jd.com", {
                img_base64: room.base64,
                user_id: room.roomId,
              })
              .then((res) => {
                console.log("res", room.roomId, res.data);
              });
          }
        }, 200),
      };
      rooms.push(room);
    }

    console.log("room:", roomId);
    // 创建或者进入房间
    socket.join(roomId);
    socket.on("fps", (base64) => {
      let currentRoom = rooms.find(getTaget) || {};
      currentRoom.base64 = base64.substr(23);
      // 继续轮询
      io.in(roomId).emit("received");
      // 广播
      socket.to(roomId).broadcast.emit("transfer", base64);
    });
    socket.on("disconnect", () => {
      console.log("disconnect:", socket.id);
      let currentRoom = rooms.find(getTaget) || {};
      clearInterval(currentRoom.timer);
      rooms = rooms.filter(getTaget);
    });
  });
};
